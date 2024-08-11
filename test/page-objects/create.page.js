import { Page } from 'page-objects/page'

class CreatePage extends Page {
  /**
   * Check if the create nav link is active
   * @returns {Promise<boolean>}
   */
  navIsActive() {
    return super.navIsActive('create')
  }

  open() {
    return super.open('/create')
  }
}

export default new CreatePage()
