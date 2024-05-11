/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
    "./index.html", 
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'primary': '#0035E9',
        'success': '#00B88C',
        'body': '#2E2E2E',
        'heading': '#33363F',
        'border-subtle':    '#CECCCC',  
        'background-alt': '#F3F4F6',
        'warning':'#F56060',
        'success-bg':'#DEFFEA',
        'success-text':'#107149',
        'warning-text':'#895710',
        'warning-bg':'#FFF1C8',
      },
      fontSize: {
        title: "14px",
        subtitle: "13px",
        base: "12px",
        small: "11px",
        
       
      },
      boxShadow: {
        sm: "0px 1px 3px 0px #CECCCC",
        'card' : '0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}