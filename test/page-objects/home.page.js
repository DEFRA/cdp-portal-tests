import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'

class HomePage extends Page {
  serviceName() {
    return $('[data-testid="app-header-service-name"]')
  }

  userName() {
    return $('[data-testid="app-login-username"]')
  }

  navItem() {
    return super.navItem('home')
  }

  navIsActive() {
    return super.navIsActive('home')
  }

  open() {
    return super.open('/')
  }
}

export default new HomePage()
