import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";

const shaders = [
  {
    id: "rainbow",
    title: "Rainbow Wave",
    description: "Animated rainbow wave pattern",
    fragmentShader: `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      
      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        float wave = sin(uv.x * 10.0 + time) * 0.1;
        float color = sin((uv.y + wave) * 10.0 + time * 2.0);
        gl_FragColor = vec4(color, color * 0.8, color * 0.6, 1.0);
      }
    `,
  },
  {
    id: "plasma",
    title: "Plasma Effect",
    description: "Classic plasma shader effect",
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
        v = v * 0.5;
        gl_FragColor = vec4(v, v * 0.8, v * 0.6, 1.0);
      }
    `,
  },
  {
    id: "mandelbrot",
    title: "Mandelbrot Set",
    description: "Fractal mandelbrot set visualization",
    fragmentShader: `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      
      void main() {
        vec2 uv = (gl_FragCoord.xy * 2.0 - resolution.xy) / min(resolution.x, resolution.y);
        vec2 c = uv * 2.0 - 1.0;
        vec2 z = vec2(0.0);
        float iterations = 0.0;
        
        for(int i = 0; i < 100; i++) {
          if(dot(z, z) > 4.0) break;
          z = vec2(z.x * z.x - z.y * z.y, 2.0 * z.x * z.y) + c;
          iterations += 1.0;
        }
        
        float color = iterations / 100.0;
        gl_FragColor = vec4(color, color * 0.8, color * 0.6, 1.0);
      }
    `,
  },
  {
    id: "voronoi",
    title: "Voronoi Cells",
    description: "Voronoi diagram with animated cells",
    fragmentShader: `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;
      
      vec2 random2(vec2 st) {
        st = vec2(dot(st, vec2(127.1, 311.7)),
                  dot(st, vec2(269.5, 183.3)));
        return -1.0 + 2.0 * fract(sin(st) * 43758.5453123);
      }
      
      void main() {
        vec2 st = gl_FragCoord.xy / resolution.xy;
        st.x *= resolution.x / resolution.y;
        
        vec2 i_st = floor(st);
        vec2 f_st = fract(st);
        
        float m_dist = 1.0;
        vec2 m_point;
        
        for(int y = -1; y <= 1; y++) {
          for(int x = -1; x <= 1; x++) {
            vec2 neighbor = vec2(float(x), float(y));
            vec2 point = random2(i_st + neighbor);
            point = 0.5 + 0.5 * sin(time + point * 6.2831);
            vec2 diff = neighbor + point - f_st;
            float dist = length(diff);
            if(dist < m_dist) {
              m_dist = dist;
              m_point = point;
            }
          }
        }
        
        float color = m_dist;
        color = 1.0 - smoothstep(0.0, 0.1, color);
        gl_FragColor = vec4(color, color * 0.8, color * 0.6, 1.0);
      }
    `,
  },
];

export default function ShaderDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const glRef = useRef<WebGLRenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const [selectedShader, setSelectedShader] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  const createShader = useCallback((gl: WebGLRenderingContext, type: number, source: string) => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.error('Shader compilation error:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    
    return shader;
  }, []);

  const createProgram = useCallback((gl: WebGLRenderingContext, vertexShader: WebGLShader, fragmentShader: WebGLShader) => {
    const program = gl.createProgram();
    if (!program) return null;
    
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program linking error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      return null;
    }
    
    return program;
  }, []);

  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    glRef.current = gl;

    // Vertex shader source
    const vertexShaderSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    // Create shaders
    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, shaders[selectedShader].fragmentShader);
    
    if (!vertexShader || !fragmentShader) return;

    // Create program
    const program = createProgram(gl, vertexShader, fragmentShader);
    if (!program) return;

    programRef.current = program;

    // Create a full-screen quad
    const positions = new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
       1,  1,
    ]);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Clean up
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
  }, [selectedShader, createShader, createProgram]);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const gl = glRef.current;
    const program = programRef.current;
    
    if (!canvas || !gl || !program) return;

    gl.useProgram(program);

    // Set uniforms
    const timeLocation = gl.getUniformLocation(program, 'time');
    const resolutionLocation = gl.getUniformLocation(program, 'resolution');
    
    if (timeLocation) {
      gl.uniform1f(timeLocation, performance.now() * 0.001);
    }
    if (resolutionLocation) {
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
    }

    // Draw
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }, []);

  const animate = useCallback(() => {
    render();
    if (isRunning) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [render, isRunning]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    initWebGL();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [initWebGL]);

  useEffect(() => {
    if (isRunning) {
      animate();
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, isRunning]);

  const handleShaderChange = (index: number) => {
    setSelectedShader(index);
    // Reinitialize WebGL with new shader
    setTimeout(() => {
      initWebGL();
    }, 100);
  };

  return (
    <div className="w-full h-full bg-gray-900 rounded-lg overflow-hidden">
      <div className="h-3/4 relative">
        <canvas
          ref={canvasRef}
          className="w-full h-full"
        />
      </div>
      
      <div className="h-1/4 p-4 bg-gray-800">
        <h3 className="text-lg font-semibold text-white mb-2">
          {shaders[selectedShader].title}
        </h3>
        <p className="text-sm text-gray-300 mb-4">
          {shaders[selectedShader].description}
        </p>
        
        <div className="flex gap-2 mb-4">
          {shaders.map((shader, index) => (
            <button
              key={shader.id}
              onClick={() => handleShaderChange(index)}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                selectedShader === index
                  ? "bg-purple-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
            >
              {shader.title}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setIsRunning(!isRunning)}
          className="px-4 py-2 bg-purple-600 text-white rounded-lg text-sm hover:bg-purple-700 transition-colors"
        >
          {isRunning ? "Pause" : "Resume"}
        </button>
      </div>
    </div>
  );
}
