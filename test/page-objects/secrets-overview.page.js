import { Page } from 'page-objects/page'

class SecretsOverviewPage extends Page {
  /**
   * Check if the services nav link is active
   * @returns {Promise<boolean>}
   */
  navIsActive() {
    return super.navIsActive('services')
  }

  open(serviceName) {
    return super.open(`services/${serviceName}/secrets`)
  }
}

export default new SecretsOverviewPage()
