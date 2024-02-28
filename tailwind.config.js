/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    fontSize:{
      'main-title': '2.2rem'
    },
    extend: {
      maxWidth:{
        'logoW': '6.8rem'
      },
      width:{
        'mainW': 'calc(100%-24rem)',
        'w-objectEditElem': '30rem',
      },
      colors:{
        'header-bg': '#F4F6FB',
        'placesBorder': '#d8d8d8',
      },
      flex:{
        'sidebarFlex': '0 0 24rem',
        'flexCard': '0 0 39rem'
      },
      boxShadow:{
        'sidebarBS': '1px 0 0 #e3e3e3'
      },
      gridTemplateColumns:{
        'gridObjectInfo': 'repeat(auto-fill,18.5%)'
      },
      margin:{
        'm-base': '3.2rem',
        'm-base/2': '1.6rem',
        'm-base/4': '0.8rem'
      },
      height:{
        'main-wrap': 'calc(100% - 197px)'
      }
    },
  },
  plugins: [],
}

