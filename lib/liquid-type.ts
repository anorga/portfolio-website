// Advect a small velocity field, then use it to bend a high-resolution text texture.
// DOM text remains the accessible, no-WebGL and reduced-motion fallback.
export function createLiquidType(
  stage: HTMLElement,
  canvas: HTMLCanvasElement,
) {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
  });
  if (!gl) return;
  const vertex = `attribute vec2 position; varying vec2 uv;
    void main(){ uv = position * .5 + .5; gl_Position=vec4(position,0.,1.); }`;
  const fragment = `precision highp float;
    varying vec2 uv; uniform sampler2D ink; uniform sampler2D flow;
    uniform vec3 face; uniform vec3 ember; uniform vec2 reach;
    float maskAt(vec2 point) { return texture2D(ink, point).a; }
    void main(){
      vec2 velocity=(texture2D(flow,uv).rg-vec2(128./255.))*2.;
      float energy=length(velocity);
      vec2 bend=reach*velocity/(.48+energy);
      float front=maskAt(uv-bend);
      float wake=max(maskAt(uv-bend*.76)*.78,
                 max(maskAt(uv-bend*.50)*.49, maskAt(uv-bend*.23)*.24));
      float trail=wake*smoothstep(.025,.35,energy)*(1.-front);
      vec3 colour=mix(face,ember,smoothstep(.06,.68,energy));
      gl_FragColor=vec4(colour*front+ember*trail,front+trail);
    }`;
  function compile(type: number, source: string) {
    const shader = gl!.createShader(type)!;
    gl!.shaderSource(shader, source);
    gl!.compileShader(shader);
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      gl!.deleteShader(shader);
      return null;
    }
    return shader;
  }
  const vs = compile(gl.VERTEX_SHADER, vertex),
    fs = compile(gl.FRAGMENT_SHADER, fragment);
  if (!vs || !fs) {
    if (vs) gl.deleteShader(vs);
    if (fs) gl.deleteShader(fs);
    return;
  }
  const program = gl.createProgram()!;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    return;
  }
  gl.useProgram(program);
  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
    gl.STATIC_DRAW,
  );
  const position = gl.getAttribLocation(program, "position");
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);
  const textures = [gl.createTexture(), gl.createTexture()];
  textures.forEach((texture, index) => {
    gl.activeTexture(gl.TEXTURE0 + index);
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  });
  gl.uniform1i(gl.getUniformLocation(program, "ink"), 0);
  gl.uniform1i(gl.getUniformLocation(program, "flow"), 1);
  const sheet = document.createElement("canvas"),
    ctx = sheet.getContext("2d")!;
  const columns = 72,
    rows = 36,
    size = columns * rows;
  let vx = new Float32Array(size),
    vy = new Float32Array(size);
  let nextX = new Float32Array(size),
    nextY = new Float32Array(size);
  const pixels = new Uint8Array(size * 4);
  gl.activeTexture(gl.TEXTURE1);
  gl.bindTexture(gl.TEXTURE_2D, textures[1]);
  gl.texImage2D(
    gl.TEXTURE_2D,
    0,
    gl.RGBA,
    columns,
    rows,
    0,
    gl.RGBA,
    gl.UNSIGNED_BYTE,
    null,
  );
  let bounds = canvas.getBoundingClientRect(),
    frame = 0,
    active = true,
    disposed = false,
    ready = false;
  let lastX = -1,
    lastY = -1,
    lastTime = 0,
    previousFrame = 0;
  let pendingX = 0,
    pendingY = 0,
    pointerX = 0,
    pointerY = 0;
  let strokeStartX = 0,
    strokeStartY = 0,
    brushRadius = 48;
  let energy = 0;
  let touchPointer: number | null = null;
  function colours() {
    const styles = getComputedStyle(stage);
    const face = styles
      .getPropertyValue("--ink-color")
      .trim()
      .split(",")
      .map((value) => Number(value) / 255);
    const trail = styles
      .getPropertyValue("--ink-trail")
      .trim()
      .split(",")
      .map((value) => Number(value) / 255);
    gl!.uniform3f(
      gl!.getUniformLocation(program, "face"),
      ...(face as [number, number, number]),
    );
    gl!.uniform3f(
      gl!.getUniformLocation(program, "ember"),
      ...(trail as [number, number, number]),
    );
  }
  function render() {
    for (let i = 0; i < size; i++) {
      pixels[i * 4] = Math.round(
        128 + Math.max(-0.98, Math.min(0.98, vx[i])) * 127,
      );
      pixels[i * 4 + 1] = Math.round(
        128 + Math.max(-0.98, Math.min(0.98, vy[i])) * 127,
      );
      pixels[i * 4 + 2] = 0;
      pixels[i * 4 + 3] = 255;
    }
    gl!.activeTexture(gl!.TEXTURE1);
    gl!.bindTexture(gl!.TEXTURE_2D, textures[1]);
    gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, false);
    gl!.texSubImage2D(
      gl!.TEXTURE_2D,
      0,
      0,
      0,
      columns,
      rows,
      gl!.RGBA,
      gl!.UNSIGNED_BYTE,
      pixels,
    );
    gl!.drawArrays(gl!.TRIANGLES, 0, 6);
  }
  function resize() {
    if (disposed || gl!.isContextLost()) return;
    rest();
    bounds = canvas.getBoundingClientRect();
    const dpr = Math.min(devicePixelRatio, 1.5),
      width = Math.round(bounds.width * dpr),
      height = Math.round(bounds.height * dpr);
    if (!width || !height) return;
    const word = stage.querySelector<HTMLElement>(".liquid-word")!;
    const em = parseFloat(getComputedStyle(word).fontSize);
    brushRadius = Math.max(32, Math.min(146, em * 0.83));
    // All ink samples stay inside the transparent gutter, even on a diagonal flick.
    const gutter =
      Math.min(
        bounds.width - stage.offsetWidth,
        bounds.height - stage.offsetHeight,
      ) / 2;
    const reach = Math.max(1, Math.min(gutter - 3, em * 0.78));
    gl!.uniform2f(
      gl!.getUniformLocation(program, "reach"),
      reach / bounds.width,
      reach / bounds.height,
    );
    canvas.width = sheet.width = width;
    canvas.height = sheet.height = height;
    gl!.viewport(0, 0, width, height);
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "alphabetic";
    stage.querySelectorAll<HTMLElement>(".liquid-glyph").forEach((glyph) => {
      const box = glyph.getBoundingClientRect(),
        style = getComputedStyle(glyph);
      ctx.font = `${style.fontWeight} ${parseFloat(style.fontSize) * dpr}px ${style.fontFamily}`;
      const metrics = ctx.measureText(glyph.textContent || "");
      const ascent = metrics.fontBoundingBoxAscent,
        descent = metrics.fontBoundingBoxDescent;
      const baseline =
        (box.top - bounds.top) * dpr +
        (box.height * dpr - ascent - descent) / 2 +
        ascent;
      ctx.fillText(
        glyph.textContent || "",
        (box.left - bounds.left) * dpr,
        baseline,
      );
    });
    gl!.activeTexture(gl!.TEXTURE0);
    gl!.bindTexture(gl!.TEXTURE_2D, textures[0]);
    gl!.pixelStorei(gl!.UNPACK_FLIP_Y_WEBGL, true);
    gl!.texImage2D(
      gl!.TEXTURE_2D,
      0,
      gl!.RGBA,
      gl!.RGBA,
      gl!.UNSIGNED_BYTE,
      sheet,
    );
    colours();
    ready = true;
    stage.dataset.inkReady = "";
  }
  function rest() {
    cancelAnimationFrame(frame);
    frame = 0;
    stage.removeAttribute("data-liquid");
    vx.fill(0);
    vy.fill(0);
    pendingX = pendingY = 0;
    lastX = -1;
  }
  const clamp = (n: number, max: number) => Math.max(0, Math.min(max, n));
  function tick(now: number) {
    frame = 0;
    if (!active || disposed || !ready) return;
    const dt = Math.max(0, Math.min((now - previousFrame) / 16.667, 3));
    previousFrame = now;
    const damping = Math.pow(0.94, dt);
    const inject = pendingX !== 0 || pendingY !== 0;
    // Measure the whole stroke in brush radii. A fast swipe can cross several
    // letters between frames, and horizontal and vertical motion should feel alike.
    const unitsX = bounds.width / brushRadius,
      unitsY = bounds.height / brushRadius;
    const strokeX = (pointerX - strokeStartX) * unitsX,
      strokeY = (pointerY - strokeStartY) * unitsY;
    const lengthSquared = strokeX * strokeX + strokeY * strokeY;
    const pressure = Math.min(1.2, Math.hypot(pendingX, pendingY)) * 0.55;
    const travelX = ((0.14 * columns) / unitsX) * dt,
      travelY = ((0.14 * rows) / unitsY) * dt;
    energy = 0;
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < columns; x++) {
        const i = y * columns + x;
        const sx = clamp(x - vx[i] * travelX, columns - 1),
          sy = clamp(y - vy[i] * travelY, rows - 1);
        const x0 = Math.floor(sx),
          y0 = Math.floor(sy),
          x1 = Math.min(x0 + 1, columns - 1),
          y1 = Math.min(y0 + 1, rows - 1),
          fx = sx - x0,
          fy = sy - y0;
        const a = y0 * columns + x0,
          b = y0 * columns + x1,
          c = y1 * columns + x0,
          d = y1 * columns + x1;
        const wa = (1 - fx) * (1 - fy),
          wb = fx * (1 - fy),
          wc = (1 - fx) * fy,
          wd = fx * fy;
        let flowX =
          (vx[a] * wa + vx[b] * wb + vx[c] * wc + vx[d] * wd) * damping;
        let flowY =
          (vy[a] * wa + vy[b] * wb + vy[c] * wc + vy[d] * wd) * damping;
        if (inject) {
          const px = ((x + 0.5) / columns - strokeStartX) * unitsX;
          const py = ((y + 0.5) / rows - strokeStartY) * unitsY;
          const along = lengthSquared
            ? clamp((px * strokeX + py * strokeY) / lengthSquared, 1)
            : 0;
          const dx = px - along * strokeX,
            dy = py - along * strokeY;
          const weight = Math.exp(-1.6 * (dx * dx + dy * dy));
          flowX += (pendingX + dx * pressure) * weight;
          flowY += (pendingY + dy * pressure) * weight;
        }
        nextX[i] = Math.max(-1.35, Math.min(1.35, flowX));
        nextY[i] = Math.max(-1.35, Math.min(1.35, flowY));
        energy = Math.max(energy, Math.abs(nextX[i]), Math.abs(nextY[i]));
      }
    [vx, nextX] = [nextX, vx];
    [vy, nextY] = [nextY, vy];
    pendingX = pendingY = 0;
    if (energy <= 0.004) {
      rest();
      return;
    }
    render();
    stage.dataset.liquid = "moving";
    frame = requestAnimationFrame(tick);
  }
  function wake() {
    if (!frame && ready && active && (pendingX || pendingY)) {
      previousFrame = performance.now();
      frame = requestAnimationFrame(tick);
    }
  }
  function pointer(event: PointerEvent) {
    if (
      !active ||
      (event.pointerType === "touch" && event.pointerId !== touchPointer)
    )
      return;
    bounds = canvas.getBoundingClientRect();
    const x = (event.clientX - bounds.left) / bounds.width,
      y = 1 - (event.clientY - bounds.top) / bounds.height;
    const now = performance.now();
    if (x < 0 || x > 1 || y < 0 || y > 1) {
      lastX = -1;
      return;
    }
    if (lastX >= 0 && now - lastTime < 180) {
      if (!pendingX && !pendingY) {
        strokeStartX = lastX;
        strokeStartY = lastY;
      }
      pendingX = Math.max(
        -1.25,
        Math.min(
          1.25,
          pendingX + ((x - lastX) * bounds.width * 2.4) / brushRadius,
        ),
      );
      pendingY = Math.max(
        -1.25,
        Math.min(
          1.25,
          pendingY + ((y - lastY) * bounds.height * 2.4) / brushRadius,
        ),
      );
    }
    pointerX = x;
    pointerY = y;
    lastX = x;
    lastY = y;
    lastTime = now;
    wake();
  }
  function touchStart(event: PointerEvent) {
    if (event.pointerType !== "touch" || !event.isPrimary) return;
    bounds = canvas.getBoundingClientRect();
    touchPointer = event.pointerId;
    pointerX = (event.clientX - bounds.left) / bounds.width;
    pointerY = 1 - (event.clientY - bounds.top) / bounds.height;
    strokeStartX = lastX = pointerX;
    strokeStartY = lastY = pointerY;
    lastTime = performance.now();
    pendingX = 0.12;
    pendingY = 0.06;
    wake();
  }
  function touchEnd(event: PointerEvent) {
    if (event.pointerId === touchPointer) {
      touchPointer = null;
      lastX = -1;
    }
  }
  function leave() {
    lastX = -1;
  }
  function theme() {
    if (ready) {
      colours();
    }
  }
  function contextLost() {
    rest();
    ready = false;
    delete stage.dataset.inkReady;
  }
  const resizeObserver = new ResizeObserver(resize);
  resizeObserver.observe(stage);
  const visible = new IntersectionObserver(([entry]) => {
    active = entry.isIntersecting;
    if (!active) rest();
  });
  visible.observe(stage);
  const themeObserver = new MutationObserver(theme);
  themeObserver.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  document.fonts.ready.then(() => {
    if (!disposed) resize();
  });
  stage.addEventListener("pointermove", pointer, { passive: true });
  stage.addEventListener("pointerleave", leave);
  stage.addEventListener("pointerdown", touchStart, { passive: true });
  window.addEventListener("pointerup", touchEnd, { passive: true });
  window.addEventListener("pointercancel", touchEnd, { passive: true });
  canvas.addEventListener("webglcontextlost", contextLost);
  return () => {
    disposed = true;
    cancelAnimationFrame(frame);
    resizeObserver.disconnect();
    visible.disconnect();
    themeObserver.disconnect();
    stage.removeEventListener("pointermove", pointer);
    stage.removeEventListener("pointerleave", leave);
    stage.removeEventListener("pointerdown", touchStart);
    window.removeEventListener("pointerup", touchEnd);
    window.removeEventListener("pointercancel", touchEnd);
    canvas.removeEventListener("webglcontextlost", contextLost);
    stage.removeAttribute("data-liquid");
    delete stage.dataset.inkReady;
    textures.forEach((t) => gl.deleteTexture(t));
    gl.deleteBuffer(buffer);
    gl.deleteProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
  };
}
