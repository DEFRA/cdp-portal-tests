import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class ServicesPage extends Page {
  navItem() {
    return super.navItem('services')
  }

  navIsActive() {
    return super.navIsActive('services')
  }

  overallProgress(value) {
    return $(`[data-testid="app-overall-progress"]${value ? `*=${value}` : ''}`)
  }

  open(value) {
    return super.open(`/services${value ?? ''}`)
  }
}

export default new ServicesPage()
