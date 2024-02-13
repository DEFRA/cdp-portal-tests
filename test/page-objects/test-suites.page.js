import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class TestSuitesPage extends Page {
  navIsActive() {
    return super.navIsActive('nav-test-suites')
  }

  overallProgress(value) {
    return $(`[data-testid="app-overall-progress"]${value ? `*=${value}` : ''}`)
  }

  open(value) {
    return super.open(`/test-suites${value ?? ''}`)
  }
}

export default new TestSuitesPage()
