/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "hsl(258, 100%, 66%)", // Electric violet #8A63FF
          50: "hsl(258, 100%, 95%)",
          100: "hsl(258, 100%, 90%)",
          200: "hsl(258, 100%, 80%)",
          300: "hsl(258, 100%, 70%)",
          400: "hsl(258, 100%, 68%)",
          500: "hsl(258, 100%, 66%)",
          600: "hsl(258, 100%, 60%)",
          700: "hsl(258, 100%, 50%)",
          800: "hsl(258, 100%, 40%)",
          900: "hsl(258, 100%, 30%)",
        },
        secondary: {
          DEFAULT: "hsl(170, 100%, 50%)", // Teal cyan #00FFC6
          50: "hsl(170, 100%, 95%)",
          100: "hsl(170, 100%, 90%)",
          200: "hsl(170, 100%, 80%)",
          300: "hsl(170, 100%, 70%)",
          400: "hsl(170, 100%, 60%)",
          500: "hsl(170, 100%, 50%)",
          600: "hsl(170, 100%, 40%)",
          700: "hsl(170, 100%, 30%)",
          800: "hsl(170, 100%, 20%)",
          900: "hsl(170, 100%, 10%)",
        },
        accent: {
          DEFAULT: "hsl(35, 100%, 64%)", // Warm orange #FFB547
          50: "hsl(35, 100%, 95%)",
          100: "hsl(35, 100%, 90%)",
          200: "hsl(35, 100%, 80%)",
          300: "hsl(35, 100%, 70%)",
          400: "hsl(35, 100%, 67%)",
          500: "hsl(35, 100%, 64%)",
          600: "hsl(35, 100%, 55%)",
          700: "hsl(35, 100%, 45%)",
          800: "hsl(35, 100%, 35%)",
          900: "hsl(35, 100%, 25%)",
        },
        background: {
          DEFAULT: "hsl(0, 0%, 4%)", // Near black #0A0A0A
          secondary: "hsl(0, 0%, 8%)",
          tertiary: "hsl(0, 0%, 12%)",
        },
        foreground: {
          DEFAULT: "hsl(0, 0%, 93%)", // Soft white #EDEDED
          secondary: "hsl(0, 0%, 70%)",
          muted: "hsl(0, 0%, 50%)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      fontSize: {
        "display-2xl": ["6rem", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-xl": [
          "4.5rem",
          { lineHeight: "1.1", letterSpacing: "-0.02em" },
        ],
        "display-lg": [
          "3.5rem",
          { lineHeight: "1.2", letterSpacing: "-0.02em" },
        ],
        "display-md": [
          "2.5rem",
          { lineHeight: "1.3", letterSpacing: "-0.01em" },
        ],
        "display-sm": ["2rem", { lineHeight: "1.4", letterSpacing: "-0.01em" }],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
        ripple: "ripple 0.6s ease-out",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.9)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        ripple: {
          "0%": { transform: "scale(0)", opacity: "1" },
          "100%": { transform: "scale(4)", opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 20px rgba(138, 99, 255, 0.3)" },
          "100%": { boxShadow: "0 0 40px rgba(138, 99, 255, 0.6)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
