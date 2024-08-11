import { browser, $ } from '@wdio/globals'

class Page {
  pageHeading() {
    return $('h1')
  }

  navItem(navItemName) {
    return $(`[data-testid="nav-${navItemName}"]`)
  }

  /**
   * Check if a navigation item is active
   * @param navItemName
   * @returns {Promise<boolean>}
   */
  async navIsActive(navItemName) {
    const navItem = await this.navItem(navItemName)
    const className = await navItem.getAttribute('class')

    return className.includes('app-navigation__link--active')
  }

  logInLink(value = 'Sign in') {
    return $('[data-testid="app-login-link"]*=' + value)
  }

  logOutLink(value = 'Sign out') {
    return $('[data-testid="app-login-link"]*=' + value)
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
