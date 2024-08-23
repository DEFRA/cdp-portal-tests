import { Page } from 'page-objects/page'

class DeployPage extends Page {
  /**
   * Check if the deploy service nav link is active
   * @returns {Promise<boolean>}
   */
  navIsActive() {
    return super.navIsActive('deploy-service')
  }

  open() {
    return super.open('/deploy-service')
  }
}

export default new DeployPage()
