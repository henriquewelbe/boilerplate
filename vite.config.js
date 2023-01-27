import handlebars from 'vite-plugin-handlebars'
import path from 'path'
import { defineConfig } from 'vite'
import { ifCond } from './src/handlebars/helpers'
import { fileURLToPath, URL } from 'url'

// const pageData = {
//   '/index.html': {
//     title: 'Main Page'
//   },
//   '/nested/subpage.html': {
//     title: 'Sub Page'
//   }
// }

// const teste = path.resolve(__dirname, 'src/js/app.js')
// console.log('o path é : ', teste)

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
    publicDir: '../../public',

    server: {
      port: 3000,
      open: true
    },

    build: {
      outDir: '../../dist',
      assetsDir: './',
      copyPublicDir: true
    },

    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src/jsapp', import.meta.url))
      }
    },

    rollupInputOptions: {
      input: path.resolve(__dirname, 'src/js/app.js')
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
    ],

    appType: 'mpa'
  })
}
