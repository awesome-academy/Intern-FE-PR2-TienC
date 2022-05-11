module.exports = {
  content: [
    'src/pages/**/*.{js,jsx}',
    'src/components/**/*.{js,jsx}',
    'src/layouts/**/*.{js,jsx}',
    'src/page-components/**/*.{js,jsx}'
  ],
  theme: {
    screens: {
      xs: '536px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px'
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
