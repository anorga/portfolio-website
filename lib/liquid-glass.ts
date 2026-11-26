export interface GlassRenderParams {
  width: number;
  height: number;
  dpr: number;
  radius: number;
  rim: number;
  pointerX: number;
  pointerY: number;
  velX: number;
  velY: number;
  light: number;
  highlight: Float32Array;
  waveX: number;
  waveY: number;
  waveAge: number;
  coverScaleX: number;
  coverScaleY: number;
  coverOffsetX: number;
  coverOffsetY: number;
}

export interface GlassSurface {
  upload: (img: HTMLImageElement) => boolean;
  render: (target: HTMLCanvasElement, params: GlassRenderParams) => boolean;
  destroy: () => void;
}

const VERTEX_SHADER = `#version 300 es
in vec2 a_pos;
out vec2 v_uv;
void main() {
  v_uv = vec2(a_pos.x * 0.5 + 0.5, 0.5 - a_pos.y * 0.5);
  gl_Position = vec4(a_pos, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;
in vec2 v_uv;
out vec4 fragColor;

uniform sampler2D u_tex;
uniform vec2 u_size;
uniform float u_radius;
uniform float u_rim;
uniform vec2 u_pointer;
uniform vec2 u_vel;
uniform float u_light;
uniform vec3 u_highlight;
uniform vec3 u_wave; // press position in CSS pixels, age from zero to one
uniform vec4 u_cover;

vec2 coverUv(vec2 boxUv) {
  return clamp(boxUv * u_cover.xy + u_cover.zw, vec2(0.001), vec2(0.999));
}

vec3 sampleBlurred(vec2 boxUv, float blurPx) {
  if (blurPx <= 0.15) return texture(u_tex, coverUv(boxUv)).rgb;
  vec2 texel = blurPx / u_size;
  vec3 c = texture(u_tex, coverUv(boxUv)).rgb * 0.36;
  c += texture(u_tex, coverUv(boxUv + vec2(texel.x, texel.y))).rgb * 0.16;
  c += texture(u_tex, coverUv(boxUv + vec2(-texel.x, texel.y))).rgb * 0.16;
  c += texture(u_tex, coverUv(boxUv + vec2(texel.x, -texel.y))).rgb * 0.16;
  c += texture(u_tex, coverUv(boxUv + vec2(-texel.x, -texel.y))).rgb * 0.16;
  return c;
}

void main() {
  vec2 p = (v_uv - 0.5) * u_size;
  vec2 halfBox = u_size * 0.5;
  vec2 q = abs(p) - (halfBox - u_radius);
  vec2 qp = max(q, 0.0);
  float distOut = length(qp) + min(max(q.x, q.y), 0.0) - u_radius;
  float depth = max(0.0, -distOut);

  float edgeClip = 1.0 - smoothstep(-0.6, 0.8, distOut);
  if (edgeClip <= 0.001) {
    fragColor = vec4(0.0);
    return;
  }

  // Smooth rounded-rectangle outward normal
  vec2 dirSign = vec2(p.x < 0.0 ? -1.0 : 1.0, p.y < 0.0 ? -1.0 : 1.0);
  vec2 n;
  if (q.x > 0.0 || q.y > 0.0) {
    n = dirSign * normalize(qp + vec2(1e-5));
  } else {
    float band = max(1e-3, min(u_rim, -max(q.x, q.y)));
    float blend = clamp(0.5 + (q.x - q.y) / (2.0 * band), 0.0, 1.0);
    n = dirSign * normalize(vec2(blend, 1.0 - blend));
  }

  // A curved shoulder around a flat pane. Distances and thickness are in CSS pixels.
  float t = clamp(1.0 - depth / u_rim, 0.0, 1.0);
  float angle = 1.35 * t;
  vec3 normal = vec3(n * sin(angle), cos(angle));
  vec3 ray = refract(vec3(0.0, 0.0, -1.0), normal, 1.0 / 1.48);
  vec2 bend = ray.xy / max(0.01, -ray.z) * (0.48 * u_rim);
  float fresnel = 0.035 + 0.965 * pow(1.0 - normal.z, 5.0);

  // A shallow lens follows the pointer. Each press sends out one fading wave.
  vec2 pixel = v_uv * u_size;
  float span = min(u_size.x, u_size.y);
  float lensRadius = clamp(span * 0.22, 20.0, 120.0);
  vec2 lensPos = (pixel - u_pointer) / lensRadius;
  vec2 flow = u_vel / (1.0 + length(u_vel));
  lensPos -= 0.22 * flow * dot(lensPos, flow);
  float dome = exp(-3.5 * dot(lensPos, lensPos)) * u_light;
  vec2 wavePos = pixel - u_wave.xy;
  float waveDistance = length(wavePos);
  float waveWidth = clamp(span * 0.025, 3.0, 12.0);
  float phase = (waveDistance - u_wave.z * span * 0.85) / waveWidth;
  float wave = exp(-phase * phase) * (1.0 - u_wave.z);
  bend -= lensPos * dome * min(12.0, span * 0.05);
  bend += wavePos / max(waveDistance, 1.0) * wave * waveWidth * 0.45;

  float coverage = max(smoothstep(0.0, 1.0, u_rim - depth),
                       max(smoothstep(0.01, 0.25, dome), wave)) * edgeClip;
  if (coverage < 0.002) {
    fragColor = vec4(0.0);
    return;
  }

  // All wavelengths follow one ray. Only the reflected light carries the accent.
  vec3 substrate = sampleBlurred(v_uv + bend / u_size, 1.6 * t * t);
  float tracking = smoothstep(0.0, 0.85, u_light);
  vec2 source = mix(u_size * vec2(0.27, -0.07), u_pointer, tracking);
  vec2 toLight = (source - pixel) / span;
  vec3 light = normalize(vec3(toLight, 0.38));
  vec3 halfway = normalize(light + vec3(0.0, 0.0, 1.0));
  float specular = pow(max(dot(normal, halfway), 0.0), 24.0);
  float falloff = exp(-1.8 * dot(toLight, toLight));
  float lip = exp(-depth / max(1.0, u_rim * 0.12));

  // Curved bands concentrate the same light into a soft caustic inside the rim.
  vec2 pos = (pixel - source) / max(28.0, u_rim * 4.0);
  float folds = sin(pos.x * 1.7 + sin(pos.y)) + 0.55 * sin(pos.y * 2.9 + pos.x);
  float ridge = (depth / u_rim - (0.25 + 0.09 * folds)) * 5.0;
  // The brightest spot travels along the edge as the light moves across the pane.
  float alongEdge = dot(toLight, vec2(-n.y, n.x));
  float focus = exp(-90.0 * alongEdge * alongEdge);
  float acrossEdge = dot(toLight, n);
  float edgeSpot = exp(-40.0 * alongEdge * alongEdge - 5.0 * acrossEdge * acrossEdge);
  float rimLight = mix(0.64, 0.28 + 1.35 * edgeSpot, tracking);
  float caustic = exp(-ridge * ridge) * falloff * (0.35 + 1.25 * focus);
  float shoulder = 4.0 * t * (1.0 - t);
  vec3 glass = substrate * (1.0 - shoulder * (0.14 - 0.06 * falloff));
  float rimReflection = t * (0.09 + 0.55 * specular + fresnel)
                      + lip * (0.18 + 0.70 * falloff) + 0.35 * caustic;
  // A soft glint on one side of the moving lens also follows contact across the flat face.
  vec2 glintPos = lensPos + vec2(0.24, 0.18);
  float glint = dome * exp(-10.0 * dot(glintPos, glintPos));
  float reflection = rimLight * rimReflection + 0.16 * glint + 0.22 * wave;
  glass = mix(glass, u_highlight, clamp(reflection, 0.0, 0.86));
  glass += u_highlight * (rimLight * (0.32 * caustic + 0.42 * specular * t) + 0.1 * wave);
  fragColor = vec4(clamp(glass, 0.0, 1.0) * coverage, coverage);
}
`;

class SharedGlassRenderer {
  private canvas: HTMLCanvasElement;
  private gl: WebGL2RenderingContext;
  private program: WebGLProgram | null = null;
  private buffer: WebGLBuffer | null = null;
  private uniforms: Record<string, WebGLUniformLocation | null> = {};
  private listeners = new Set<() => void>();
  private lost = false;

  constructor() {
    this.canvas = document.createElement("canvas");
    const gl = this.canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      stencil: false,
    });
    if (!gl) throw new Error("WebGL2 unavailable");
    this.gl = gl;
    this.init();

    this.canvas.addEventListener("webglcontextlost", (e) => {
      e.preventDefault();
      this.lost = true;
    });
    this.canvas.addEventListener("webglcontextrestored", () => {
      this.lost = false;
      this.init();
      for (const notify of this.listeners) notify();
    });
  }

  private compile(type: number, source: string) {
    const gl = this.gl;
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  }

  private init() {
    const gl = this.gl;
    const vs = this.compile(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = this.compile(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) {
      if (vs) gl.deleteShader(vs);
      if (fs) gl.deleteShader(fs);
      return;
    }
    const program = gl.createProgram();
    if (!program) {
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      return;
    }
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      gl.deleteProgram(program);
      return;
    }

    this.program = program;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    this.buffer = buffer;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const pos = gl.getAttribLocation(program, "a_pos");
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    for (const name of [
      "u_tex",
      "u_size",
      "u_radius",
      "u_rim",
      "u_pointer",
      "u_vel",
      "u_light",
      "u_highlight",
      "u_wave",
      "u_cover",
    ]) {
      this.uniforms[name] = gl.getUniformLocation(program, name);
    }
    gl.uniform1i(this.uniforms.u_tex, 0);
  }

  createSurface(onRestore: () => void): GlassSurface {
    const gl = this.gl;
    let texture: WebGLTexture | null = gl.createTexture();
    let hasTexture = false;

    const configureTexture = (tex: WebGLTexture) => {
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    };

    if (texture) configureTexture(texture);

    const handleRestore = () => {
      texture = gl.createTexture();
      hasTexture = false;
      if (texture) configureTexture(texture);
      onRestore();
    };
    this.listeners.add(handleRestore);

    return {
      upload: (img: HTMLImageElement) => {
        if (this.lost || gl.isContextLost()) return false;
        if (!texture) {
          texture = gl.createTexture();
          if (!texture) return false;
          configureTexture(texture);
        }
        try {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, texture);
          gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
          gl.texImage2D(
            gl.TEXTURE_2D,
            0,
            gl.RGBA,
            gl.RGBA,
            gl.UNSIGNED_BYTE,
            img,
          );
          hasTexture = true;
          return true;
        } catch {
          hasTexture = false;
          return false;
        }
      },
      render: (target: HTMLCanvasElement, params: GlassRenderParams) => {
        if (
          this.lost ||
          !this.program ||
          !hasTexture ||
          !texture ||
          gl.isContextLost()
        )
          return false;

        const pixelW = Math.max(1, Math.round(params.width * params.dpr));
        const pixelH = Math.max(1, Math.round(params.height * params.dpr));

        if (this.canvas.width !== pixelW || this.canvas.height !== pixelH) {
          this.canvas.width = pixelW;
          this.canvas.height = pixelH;
        }
        if (target.width !== pixelW || target.height !== pixelH) {
          target.width = pixelW;
          target.height = pixelH;
        }

        const ctx2d = target.getContext("2d");
        if (!ctx2d) return false;

        gl.useProgram(this.program);
        gl.viewport(0, 0, pixelW, pixelH);
        gl.clearColor(0, 0, 0, 0);
        gl.clear(gl.COLOR_BUFFER_BIT);

        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, texture);

        gl.uniform2f(this.uniforms.u_size, params.width, params.height);
        gl.uniform1f(this.uniforms.u_radius, params.radius);
        gl.uniform1f(this.uniforms.u_rim, params.rim);
        gl.uniform2f(this.uniforms.u_pointer, params.pointerX, params.pointerY);
        gl.uniform2f(this.uniforms.u_vel, params.velX, params.velY);
        gl.uniform1f(this.uniforms.u_light, params.light);
        gl.uniform3fv(this.uniforms.u_highlight, params.highlight);
        gl.uniform3f(this.uniforms.u_wave, params.waveX, params.waveY, params.waveAge);
        gl.uniform4f(
          this.uniforms.u_cover,
          params.coverScaleX,
          params.coverScaleY,
          params.coverOffsetX,
          params.coverOffsetY,
        );

        gl.drawArrays(gl.TRIANGLES, 0, 6);

        ctx2d.clearRect(0, 0, pixelW, pixelH);
        ctx2d.drawImage(this.canvas, 0, 0, pixelW, pixelH);
        return true;
      },
      destroy: () => {
        this.listeners.delete(handleRestore);
        if (texture && !gl.isContextLost()) gl.deleteTexture(texture);
        texture = null;
        hasTexture = false;
      },
    };
  }
}

let sharedRenderer: SharedGlassRenderer | null | undefined;

export function getSharedGlassRenderer(): SharedGlassRenderer | null {
  if (sharedRenderer !== undefined) return sharedRenderer;
  try {
    sharedRenderer = new SharedGlassRenderer();
  } catch {
    sharedRenderer = null;
  }
  return sharedRenderer;
}
