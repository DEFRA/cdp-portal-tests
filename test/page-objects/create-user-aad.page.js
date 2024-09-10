import { Page } from 'page-objects/page'
import { $ } from '@wdio/globals'

class CreateUserAAD extends Page {
  /**
   * Check if the admin nav link is active
   * @returns {Promise<boolean>}
   */
  navIsActive() {
    return super.navIsActive('admin')
  }

  searchByAADName() {
    return $('#aadQuery')
  }

  searchResult(email) {
    return $('#email')
  }

  nextButton() {
    return $('button=Next')
  }
}

export default new CreateUserAAD()
