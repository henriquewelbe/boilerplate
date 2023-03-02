import '../scss/style.scss'

import each from 'lodash/each'

import Homepage from './pages/Homepage'
import About from './pages/About'

import Preloader from './components/Preloader'
import Scroll from './components/Scroll'
import Cursor from './components/Cursor'

class App {
  constructor () {
    this.createContent()
    this.createPages()
    this.addLinkListeners()
    this.createPreloader()
    this.createScroll()
    this.createCursor()
  }

  createContent () {
    this.content = document.querySelector('.content')
    this.template = this.content.getAttribute('data-template')
  }

  createCursor () {
    this.cursor = new Cursor()

    window.cursor = this.cursor
  }

  createPages () {
    this.pages = {
      homepage: new Homepage(),
      about: new About()
    }

    this.page = this.pages[this.template]

    this.page.create()
    this.page.show()
  }

  createPreloader () {
    this.preloader = new Preloader()
    this.preloader.once('completed', () => {
      this.preloader.destroy()
    })

    window.preloader = this.preloader
  }

  createScroll () {
    this.scroll = new Scroll()

    window.scroll = this.scroll
  }

  onPopState () {
    this.onChange({
      url: window.location.pathname,
      push: false
    })
  }

  async onChange ({ url, push = true }) {
    await this.page.hide()
    const request = await window.fetch(url)

    if (request.status === 200) {
      const nextPageHtml = await request.text()

      if (push) {
        window.history.pushState({}, '', url)
      }

      const fakeDiv = document.createElement('div')
      fakeDiv.innerHTML = nextPageHtml

      const content = fakeDiv.querySelector('.content')

      this.template = content.getAttribute('data-template')
      this.content.setAttribute('data-template', this.template)
      this.content.innerHTML = content.innerHTML

      this.page = this.pages[this.template]

      this.page.create()
      this.page.show()

      this.cursor.addEventListeners()

      this.addLinkListeners()
    }
  }

  addLinkListeners () {
    // colocar if pra não adicionar se o href for email, tel, etc
    const links = document.querySelectorAll('a')

    each(links, link => {
      link.onclick = event => {
        if (event.target.target !== '_blank') {
          event.preventDefault()

          const { href } = event.target

          this.onChange({ url: href })
        }
      }
    })
  }

  addEventListeners () {
    window.addEventListener('popstate', this.onPopState.bind(this))
  }
}

new App()
