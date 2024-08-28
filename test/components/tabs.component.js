import { $ } from '@wdio/globals'

/** appTabs component */
class TabsComponent {
  activeTab() {
    return $('[data-testid*="app-tabs-list-item--selected"]')
  }
}

export default new TabsComponent()
