import { $ } from '@wdio/globals'

/** appSplitPane component */
class SplitPaneComponent {
  content() {
    return $('[data-testid="app-split-pane"]')
  }

  subNavItem(navItemName) {
    return $(`[data-testid="app-subnav-link-${navItemName}"]`)
  }

  async subNavIsActive(navItemName) {
    const subNavItem = await this.subNavItem(navItemName)
    const className = await subNavItem.getAttribute('class')

    return className.includes('app-subnav__section-item--current')
  }
}

export default new SplitPaneComponent()
