/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')

export const content = ['./index.html', './src/**/*.{ts,tsx}']
export const corePlugins = {
  container: false
}
export const theme = {
  extend: {
    colors: {
      orange: '#ee4d2d'
    }
  }
}
export const plugins = [
  plugin(function ({ addComponents, theme }) {
    addComponents({
      '.container': {
        maxWidth: theme('columns.7xl'),
        marginLeft: 'auto',
        marginRight: 'auto',
        paddingLeft: theme('spacing.4')
      }
    })
  })
]
