import { browser, $ } from '@wdio/globals'

class Page {
  pageHeading() {
    return $('h1')
  }

  navItem(navItemName) {
    return $(`[data-testid="nav-${navItemName}"]`)
  }

  async navIsActive(navItemName) {
    const navItem = await this.navItem(navItemName)
    const className = await navItem.getAttribute('class')

    return className.includes('app-navigation__link--active')
  }

  logInLink() {
    return $('[data-testid="app-login-link"]*=' + 'Sign in')
  }

  logOutLink() {
    return $('[data-testid="app-login-link"]*=' + 'Sign out')
  }

  async logIn() {
    await this.open('/')
    await this.logInLink().click()
  }

  async logOut() {
    await this.open('/')
    await this.logOutLink().click()
  }

  open(path) {
    return browser.url(path)
  }

  link(value) {
    return $('a*=' + value)
  }
}

export { Page }
