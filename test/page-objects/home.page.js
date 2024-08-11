import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class HomePage extends Page {
  serviceName() {
    return $('[data-testid="app-header-service-name"]')
  }

  userName() {
    return $('[data-testid="app-login-username"]')
  }

  /**
   * Check if the home nav link is active
   * @returns {Promise<boolean>}
   */
  navIsActive() {
    return super.navIsActive('home')
  }

  open() {
    return super.open('/')
  }
}

export default new HomePage()
