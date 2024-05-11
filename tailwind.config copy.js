/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["inter", "sans-serif"],
      },
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
    },
  },
  plugins: [
    require('@tailwindcss/forms')
  ],
};
