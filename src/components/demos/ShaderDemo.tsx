import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const shaders = [
  {
    id: "rainbow",
    title: "Rainbow Wave",
    description: "Animated rainbow gradient",
    fragmentShader: `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float wave = sin(uv.x * 10.0 + time) * 0.1;
        uv.y += wave;
        
        vec3 color = vec3(
          sin(uv.x * 3.0 + time) * 0.5 + 0.5,
          sin(uv.x * 3.0 + time + 2.0) * 0.5 + 0.5,
          sin(uv.x * 3.0 + time + 4.0) * 0.5 + 0.5
        );
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  },
  {
    id: "plasma",
    title: "Plasma Effect",
    description: "Classic plasma shader",
    fragmentShader: `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      
      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        
        float v = 0.0;
        v += sin((uv.x + time));
        v += sin((uv.y + time));
        v += sin((uv.x + uv.y + time));
        v += sin(sqrt(uv.x * uv.x + uv.y * uv.y) + time);
        
        vec3 col = vec3(
          sin(v * 3.14159),
          sin(v * 3.14159 + 2.0),
          sin(v * 3.14159 + 4.0)
        );
        
        gl_FragColor = vec4(col * 0.5 + 0.5, 1.0);
      }
    `,
  },
  {
    id: "mandelbrot",
    title: "Mandelbrot Set",
    description: "Fractal visualization",
    fragmentShader: `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      
      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        uv *= 2.0;
        
        vec2 c = uv + vec2(sin(time * 0.1), cos(time * 0.1)) * 0.1;
        vec2 z = vec2(0.0);
        
        float iter = 0.0;
        for(int i = 0; i < 100; i++) {
          if(dot(z, z) > 4.0) break;
          z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
          iter += 1.0;
        }
        
        float color = iter / 100.0;
        vec3 col = vec3(
          sin(color * 3.14159),
          sin(color * 3.14159 + 2.0),
          sin(color * 3.14159 + 4.0)
        );
        
        gl_FragColor = vec4(col, 1.0);
      }
    `,
  },
  {
    id: "voronoi",
    title: "Voronoi Cells",
    description: "Procedural cellular pattern",
    fragmentShader: `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      
      vec2 random2(vec2 st) {
        st = vec2(
          dot(st, vec2(127.1, 311.7)),
          dot(st, vec2(269.5, 183.3))
        );
        return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
      }
      
      void main() {
        vec2 st = gl_FragCoord.xy / resolution.xy;
        st.x *= resolution.x / resolution.y;
        
        vec3 color = vec3(0.0);
        
        // Scale
        st *= 3.0;
        
        // Tile the space
        vec2 i_st = floor(st);
        vec2 f_st = fract(st);
        
        float m_dist = 1.0;
        
        for(int y = -1; y <= 1; y++) {
          for(int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5 * sin(time + 6.2831 * point);
            
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            
            m_dist = min(m_dist, dist);
          }
        }
        
        color += m_dist;
        color += 1.0 - step(0.02, m_dist);
        
        gl_FragColor = vec4(color, 1.0);
      }
    `,
  },
];

export default function ShaderDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedShader, setSelectedShader] = useState(0);
  const [isActive, setIsActive] = useState(true);
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const timeUniformRef = useRef<WebGLUniformLocation | null>(null);
  const resolutionUniformRef = useRef<WebGLUniformLocation | null>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl");
    if (!gl) {
      console.error("WebGL not supported");
      return;
    }

    glRef.current = gl;

    // Vertex shader
    const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertexShader) return;

    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    // Fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragmentShader) return;

    gl.shaderSource(fragmentShader, shaders[selectedShader].fragmentShader);
    gl.compileShader(fragmentShader);

    // Program
    const program = gl.createProgram();
    if (!program) return;

    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    programRef.current = program;

    // Get uniforms
    timeUniformRef.current = gl.getUniformLocation(program, "time");
    resolutionUniformRef.current = gl.getUniformLocation(program, "resolution");

    // Create quad
    const vertices = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    const positionLocation = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      gl.viewport(0, 0, canvas.width, canvas.height);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    return () => window.removeEventListener("resize", resizeCanvas);
  }, [selectedShader]);

  useEffect(() => {
    if (!isActive || !glRef.current || !programRef.current) return;

    const animate = (time: number) => {
      const gl = glRef.current;
      if (!gl || !programRef.current) return;

      gl.useProgram(programRef.current);

      if (timeUniformRef.current) {
        gl.uniform1f(timeUniformRef.current, time * 0.001);
      }

      if (resolutionUniformRef.current) {
        gl.uniform2f(
          resolutionUniformRef.current,
          gl.canvas.width,
          gl.canvas.height
        );
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, selectedShader]);

  return (
    <div className="w-full h-full flex flex-col">
      {/* Canvas */}
      <div className="flex-1 relative">
        <canvas ref={canvasRef} className="w-full h-full bg-black" />

        <div className="absolute top-4 left-4 space-y-2">
          <motion.button
            className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm font-medium"
            onClick={() => setIsActive(!isActive)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isActive ? "Pause" : "Play"} Shader
          </motion.button>
        </div>
      </div>

      {/* Controls */}
      <div className="p-4 space-y-4 bg-gray-800">
        <div className="flex gap-2 flex-wrap">
          {shaders.map((shader, index) => (
            <motion.button
              key={shader.id}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedShader === index
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setSelectedShader(index)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {shader.title}
            </motion.button>
          ))}
        </div>

        <div className="text-center">
          <h3 className="text-white font-semibold mb-1">
            {shaders[selectedShader].title}
          </h3>
          <p className="text-gray-400 text-sm">
            {shaders[selectedShader].description}
          </p>
        </div>
      </div>
    </div>
  );
}
