import { browser, $ } from '@wdio/globals'

class Page {
  get pageHeading() {
    return $('h1')
  }

  appHeadingTitle(value) {
    return $(`[data-testid="app-heading-title"]${value ? `*=${value}` : ''}`)
  }

  appHeadingCaption(value) {
    return $(`[data-testid="app-heading-caption"]${value ? `*=${value}` : ''}`)
  }

  navItem(itemName) {
    return $(`[data-testid="nav-${itemName}"]`)
  }

  async navIsActive(itemName) {
    const navItem = await this.navItem(itemName)
    const className = await navItem.getAttribute('class')

    return className.includes('app-navigation__link--active')
  }

  open(path) {
    return browser.url(path)
  }
}

export { Page }
