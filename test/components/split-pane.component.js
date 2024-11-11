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
    const subNavItem = await this.subNavItemLink(navItemName)
    const className = await subNavItem.getAttribute('class')

    return className.includes('app-subnav__section-item--current')
  }
}

export default new SplitPaneComponent()
