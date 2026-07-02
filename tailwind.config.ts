import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}", "./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#111827",
          700: "#374151",
          500: "#6B7280",
          400: "#9CA3AF"
        },
        surface: {
          app: "#F7F8FA",
          card: "#FFFFFF",
          soft: "#FAFAFB"
        },
        brand: {
          blue: "#2563EB",
          purple: "#7C3AED",
          cyan: "#06B6D4",
          green: "#10B981",
          amber: "#F59E0B",
          red: "#EF4444"
        }
      },
      boxShadow: {
        card: "0 8px 24px rgba(16, 24, 40, 0.06)",
        lift: "0 18px 40px rgba(16, 24, 40, 0.10)",
        glass: "0 18px 50px rgba(37, 99, 235, 0.12)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      keyframes: {
        floatIn: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.55" },
          "50%": { opacity: "1" }
        }
      },
      animation: {
        floatIn: "floatIn 520ms cubic-bezier(0.2, 0.8, 0.2, 1) both",
        shimmer: "shimmer 2.2s linear infinite",
        pulseSoft: "pulseSoft 2.4s ease-in-out infinite"
      }
    }
  },
  plugins: []
};

export default config;
