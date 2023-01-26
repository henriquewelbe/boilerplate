const { getPreloader, getHomepage } = require('./graphql/index')
const express = require('express')
const path = require('path')
const port = 3000
const { ifCond } = require('./handlebars/helpers')

const app = express()

const handlebars = require('express-handlebars').create({
  layoutsDir: path.join(__dirname, 'views'),
  partialsDir: path.join(__dirname, 'views/partials'),
  extname: 'hbs',
  defaultLayout: 'base',
  helpers: {
    ifCond
  }
})

app.engine('hbs', handlebars.engine)
app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.get('/', async (req, res) => {
  const { preloader } = await getPreloader()
  const { homepage } = await getHomepage()
  res.render('pages/homepage', {
    name: 'homepage',
    preloader: preloader.data.attributes,
    homepage: homepage.data.attributes
  })
})

app.get('/about', async (req, res) => {
  const { preloader } = await getPreloader()
  res.render('pages/about', {
    name: 'about',
    preloader: preloader.data.attributes
  })
})

// app.get('/detail/:uid', (req, res) => {
//   res.render('pages/detail')
// })

// app.get('/collections', (req, res) => {
//   res.render('pages/collections')
// })

app.listen(port, () => {
  console.log(`App is listening on port ${port}`)
})
