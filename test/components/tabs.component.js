import { $ } from '@wdio/globals'

/** appTabs component */
class TabsComponent {
  activeTab() {
    return $('[data-testid*="app-tabs-list-item--selected"]')
  }

  secondTab() {
    return $('[data-testid="app-tabs-list-item-2"]')
  }
}

export default new TabsComponent()
