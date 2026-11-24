export type Point3 = [number, number, number];
export type CodeFace = { vertices: [Point3, Point3, Point3]; accent?: boolean };
export type CodeModel = (time: number) => CodeFace[];

const code =
  "const idea = create({ curiosity: true }); function build(idea) { return imagination.map(makeItReal); } const craft = design + code; await ship(somethingGood); <> explore(); iterate(); </> ";
const clamp = (n: number, a: number, b: number) => Math.max(a, Math.min(b, n));

/** Rasterize a procedural 3D model into a field of source-code glyphs. */
export function createCodeSculpture(
  canvas: HTMLCanvasElement,
  model: CodeModel,
  reduced: boolean,
) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  let width = 1,
    height = 1,
    cols = 1,
    rows = 1,
    cellX = 7,
    cellY = 10;
  let depth = new Float32Array(1),
    shade = new Float32Array(1),
    accents = new Uint8Array(1);
  let frame = 0,
    time = 0,
    previous = 0,
    visible = true,
    paused = false,
    disposed = false;
  let yaw = -0.55,
    pitch = -0.25,
    targetX = 0,
    targetY = 0,
    burst = 0;
  let pointerX = -1000,
    pointerY = -1000;
  const readInk = () => {
    const style = getComputedStyle(canvas);
    return {
      face: style.getPropertyValue("--ink-color").trim(),
      fold: style.getPropertyValue("--ink-trail").trim(),
    };
  };
  let ink = readInk();
  const atlas = document.createElement("canvas");
  const glyphs = Array.from(new Set(code));
  const glyphIndex = Array.from(code, (letter) => glyphs.indexOf(letter));
  let tile = 1;
  let ratio = 1;
  const bounds = () => canvas.getBoundingClientRect();

  function cacheGlyphs() {
    tile = Math.ceil(cellY * 1.5 * ratio);
    atlas.width = tile * glyphs.length;
    atlas.height = tile * 2;
    const brush = atlas.getContext("2d")!;
    brush.font = `700 ${cellY * 0.95 * ratio}px ${getComputedStyle(canvas).fontFamily}`;
    brush.textAlign = "center";
    brush.textBaseline = "middle";
    for (const [row, color] of [ink.face, ink.fold].entries()) {
      brush.fillStyle = `rgb(${color})`;
      glyphs.forEach((letter, index) => {
        brush.fillText(letter, (index + 0.5) * tile, (row + 0.5) * tile);
      });
    }
  }
  function rotate([x, y, z]: Point3): Point3 {
    const xx = x * Math.cos(yaw) + z * Math.sin(yaw);
    const zz = -x * Math.sin(yaw) + z * Math.cos(yaw);
    return [
      xx,
      y * Math.cos(pitch) - zz * Math.sin(pitch),
      y * Math.sin(pitch) + zz * Math.cos(pitch),
    ];
  }
  function draw() {
    const context = ctx!;
    context.clearRect(0, 0, width, height);
    depth.fill(-Infinity);
    shade.fill(0);
    accents.fill(0);
    const scale = Math.min(width / 4.6, height / 2.8);
    const faces = model(reduced ? 0.4 : time);
    for (const face of faces) {
      const world = face.vertices.map(rotate);
      const [a, b, c] = world;
      const u = [b[0] - a[0], b[1] - a[1], b[2] - a[2]],
        v = [c[0] - a[0], c[1] - a[1], c[2] - a[2]];
      const normal = [
        u[1] * v[2] - u[2] * v[1],
        u[2] * v[0] - u[0] * v[2],
        u[0] * v[1] - u[1] * v[0],
      ];
      const length = Math.hypot(...normal) || 1;
      const light =
        0.36 +
        0.64 *
          Math.abs(
            (normal[0] * -0.35 + normal[1] * 0.55 + normal[2] * 0.75) / length,
          );
      const p = world.map(([x, y, z]) => [
        (width * 0.5 + x * scale) / cellX,
        (height * 0.64 - y * scale) / cellY,
        z,
      ]);
      const [p0, p1, p2] = p;
      const denom =
        (p1[1] - p2[1]) * (p0[0] - p2[0]) + (p2[0] - p1[0]) * (p0[1] - p2[1]);
      if (Math.abs(denom) < 0.0001) continue;
      const minX = clamp(
          Math.floor(Math.min(p0[0], p1[0], p2[0])),
          0,
          cols - 1,
        ),
        maxX = clamp(Math.ceil(Math.max(p0[0], p1[0], p2[0])), 0, cols - 1);
      const minY = clamp(
          Math.floor(Math.min(p0[1], p1[1], p2[1])),
          0,
          rows - 1,
        ),
        maxY = clamp(Math.ceil(Math.max(p0[1], p1[1], p2[1])), 0, rows - 1);
      for (let y = minY; y <= maxY; y++)
        for (let x = minX; x <= maxX; x++) {
          const w0 =
            ((p1[1] - p2[1]) * (x - p2[0]) + (p2[0] - p1[0]) * (y - p2[1])) /
            denom;
          const w1 =
            ((p2[1] - p0[1]) * (x - p2[0]) + (p0[0] - p2[0]) * (y - p2[1])) /
            denom;
          const w2 = 1 - w0 - w1;
          if (w0 < 0 || w1 < 0 || w2 < 0) continue;
          const z = w0 * p0[2] + w1 * p1[2] + w2 * p2[2],
            i = y * cols + x;
          if (z > depth[i]) {
            depth[i] = z;
            shade[i] = light;
            accents[i] = face.accent ? 1 : 0;
          }
        }
    }
    const side = tile / ratio;
    const drift = reduced || paused ? 0 : Math.floor(time * 6);
    for (let y = 0; y < rows; y++)
      for (let x = 0; x < cols; x++) {
        const i = y * cols + x;
        if (!shade[i]) continue;
        let px = x * cellX,
          py = y * cellY;
        const dx = px - pointerX,
          dy = py - pointerY,
          dist = Math.hypot(dx, dy);
        const influence = reduced ? 0 : Math.max(0, 1 - dist / 100);
        if (burst > 0.001) {
          const angle = i * 2.39996;
          px += Math.cos(angle) * burst * width * 0.27;
          py += Math.sin(angle) * burst * height * 0.35;
        }
        px += dx * influence * 0.38;
        py += dy * influence * 0.38;
        const brightness = shade[i];
        const fold = accents[i] || influence > 0.15;
        context.globalAlpha = fold
          ? 0.78 + brightness * 0.22
          : 0.55 + brightness * 0.45;
        const glyph = glyphIndex[(x + y * 37 + drift) % code.length];
        context.drawImage(
          atlas,
          glyph * tile,
          fold ? tile : 0,
          tile,
          tile,
          px - side / 2,
          py - side / 2,
          side,
          side,
        );
      }
  }
  function animate(now: number) {
    frame = 0;
    if (disposed || !visible || document.hidden) return;
    const dt = Math.min((now - previous) / 1000 || 0.016, 0.04);
    previous = now;
    if (!paused && !reduced) {
      time += dt;
      yaw += (-0.55 + targetX * 0.4 + Math.sin(time * 0.3) * 0.12 - yaw) * 0.07;
      pitch += (-0.25 + targetY * 0.15 - pitch) * 0.07;
      burst *= Math.exp(-dt * 2.8);
    }
    draw();
    if (!paused && !reduced) frame = requestAnimationFrame(animate);
  }
  function wake() {
    if (!frame && visible && !document.hidden && !disposed) {
      previous = performance.now();
      frame = requestAnimationFrame(animate);
    }
  }
  function resize() {
    const box = bounds();
    width = box.width;
    height = box.height;
    ratio = Math.min(devicePixelRatio, 2);
    canvas.width = Math.round(width * ratio);
    canvas.height = Math.round(height * ratio);
    ctx!.setTransform(ratio, 0, 0, ratio, 0, 0);
    cellX = width < 600 ? 3.8 : 4.3;
    cellY = cellX * 1.5;
    cacheGlyphs();
    cols = Math.ceil(width / cellX);
    rows = Math.ceil(height / cellY);
    depth = new Float32Array(cols * rows);
    shade = new Float32Array(cols * rows);
    accents = new Uint8Array(cols * rows);
    draw();
    wake();
  }
  function move(event: PointerEvent) {
    if (reduced || paused) return;
    const box = bounds();
    pointerX = event.clientX - box.left;
    pointerY = event.clientY - box.top;
    targetX = clamp((pointerX / width) * 2 - 1, -1, 1);
    targetY = clamp((pointerY / height) * 2 - 1, -1, 1);
  }
  function leave() {
    pointerX = pointerY = -1000;
    targetX = targetY = 0;
  }
  function touch(event: PointerEvent) {
    if (event.pointerType === "touch") {
      move(event);
      if (!reduced && !paused) burst = 0.15;
    }
  }
  function visibility() {
    if (document.hidden) {
      cancelAnimationFrame(frame);
      frame = 0;
    } else wake();
  }
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  const intersection = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible) wake();
    else {
      cancelAnimationFrame(frame);
      frame = 0;
    }
  });
  intersection.observe(canvas);
  const theme = new MutationObserver(() => {
    ink = readInk();
    cacheGlyphs();
    draw();
  });
  theme.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  canvas.addEventListener("pointermove", move, { passive: true });
  canvas.addEventListener("pointerleave", leave);
  canvas.addEventListener("pointercancel", leave);
  canvas.addEventListener("pointerdown", touch, { passive: true });
  document.addEventListener("visibilitychange", visibility);
  return {
    scatter() {
      if (!reduced && !paused) {
        burst = 1;
        wake();
      }
    },
    setPaused(value: boolean) {
      paused = value;
      if (paused) {
        cancelAnimationFrame(frame);
        frame = 0;
      } else wake();
    },
    destroy() {
      disposed = true;
      cancelAnimationFrame(frame);
      observer.disconnect();
      intersection.disconnect();
      theme.disconnect();
      canvas.removeEventListener("pointermove", move);
      canvas.removeEventListener("pointerleave", leave);
      canvas.removeEventListener("pointercancel", leave);
      canvas.removeEventListener("pointerdown", touch);
      document.removeEventListener("visibilitychange", visibility);
    },
  };
}
