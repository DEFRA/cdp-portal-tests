import { Page } from 'page-objects/page'

class DeploymentsPage extends Page {
  /**
   * Check if the deployments nav link is active
   * @returns {Promise<boolean>}
   */
  navIsActive() {
    return super.navIsActive('deployments')
  }

  open() {
    return super.open('/deployments')
  }
}

export default new DeploymentsPage()
