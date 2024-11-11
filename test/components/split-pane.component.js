import { $ } from '@wdio/globals'

/** appSplitPane component */
class SplitPaneComponent {
  content() {
    return $('[data-testid="app-split-pane"]')
  }

  subNavItem(navItemName) {
    return $(`[data-testid="app-subnav-item-${navItemName}"]`)
  }

  subNavItemLink(navItemName) {
    return $(`[data-testid="app-subnav-link-${navItemName}"]`)
  }

  async subNavIsActive(navItemName) {
    const subNavItemElem = await this.subNavItem(navItemName)
    const className = await subNavItemElem.getAttribute('class')

    return className.includes('app-subnav__section-item--current')
  }
}

export default new SplitPaneComponent()
