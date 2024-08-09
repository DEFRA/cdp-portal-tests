import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class ServicesPage extends Page {
  navIsActive() {
    return super.navIsActive('services')
  }

  overallProgress() {
    return $('[data-testid="app-overall-progress"]')
  }

  open(value) {
    return super.open(`/services${value ?? ''}`)
  }
}

export default new ServicesPage()
