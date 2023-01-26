import handlebars from 'vite-plugin-handlebars'
import path from 'path'
import { defineConfig } from 'vite'
import { ifCond } from './handlebars/helpers'

// const pageData = {
//   '/index.html': {
//     title: 'Main Page'
//   },
//   '/nested/subpage.html': {
//     title: 'Sub Page'
//   }
// }

export default () => {
  const input = {
    main: path.resolve('views/pages/homepage.html'),
    about: path.resolve('views/pages/about/index.html')
  }

  return defineConfig({
    root: './views',

    build: {
      outDir: '../dist',
      rollupOptions: {
        input
      }
    },

    plugins: [
      handlebars({
        layoutDirectory: path.resolve(__dirname, 'views'),
        partialDirectory: path.resolve(__dirname, 'views/partials'),
        helpers: {
          ifCond
        },
        context: {
          name: 'homepage'
        }
      })
    ]
  })
}
