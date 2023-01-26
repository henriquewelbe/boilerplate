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
  // automatizar pra pegar todas as páginas do /pages
  const pageData = {
    '/index.html': {
      name: 'homepage'
    },
    '/about.html': {
      name: 'about'
    }
  }

  return defineConfig({
    root: './views/pages',
    publicDir: '../public',

    server: {
      port: 3000,
      open: true
    },

    build: {
      outDir: '../dist'
    },

    plugins: [
      handlebars({
        partialDirectory: path.resolve(__dirname, 'views/partials'),

        helpers: {
          ifCond
        },

        // implementar DynamicRouter
        context (pagePath) {
          return pageData[pagePath]
        }
      })
    ]
  })
}
