import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
     colors:{
      "primary":"black",
      "secondary":"white",
      "card_background":"#F5F2E9",
     },
    keyframes:{
      "fade":{
"0%":{
  "opacity":"0%",
"display":"hidden"
},
"100%":{
  "opacity":"100%",
  "display":"block"

}
}
    },
    animation:{
      "fade-in":"fade 1s linear  ",
      "fade-out": "fade 1s linear reverse"
    },
    

  },
   
  },
  plugins: [],
}
export default config
