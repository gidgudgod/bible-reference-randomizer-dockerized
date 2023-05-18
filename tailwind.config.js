/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  daisyui:{
    themes: ["night",{
      mytheme: {     
        "primary": "#f2a39b",     
        "secondary": "#dd7268",     
        "accent": "#ca9ce5",     
        "neutral": "#1E282E",     
        "base-100": "#233452",      
        "info": "#46A1E7",     
        "success": "#43EACE",     
        "warning": "#DF9707",     
        "error": "#ED7882",
      },
    }, ],
    darkTheme: "night"
  },
  plugins: [require('daisyui'),],
}
