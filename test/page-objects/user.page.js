import { Page } from 'page-objects/page'
import { $ } from '@wdio/globals'

class UserPage extends Page {
  /**
   * Check if the admin nav link is active
   * @returns {Promise<boolean>}
   */
  navIsActive() {
    return super.navIsActive('admin')
  }

  name() {
    return $('[data-testid="app-data-list-item-1"]')
  }

  email() {
    return $('[data-testid="app-data-list-item-2"]')
  }

  github() {
    return $('[data-testid="app-data-list-item-3"]')
  }

  deleteButton() {
    return $('=Delete')
  }
}

export default new UserPage()
