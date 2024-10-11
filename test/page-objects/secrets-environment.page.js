import { Page } from 'page-objects/page'

class SecretsEnvironmentPage extends Page {
  /**
   * Check if the services nav link is active
   * @returns {Promise<boolean>}
   */
  navIsActive() {
    return super.navIsActive('services')
  }

  open(serviceName, environment) {
    return super.open(`services/${serviceName}/secrets/${environment}`)
  }

  secretsSelectedTab(value = 'Secrets') {
    return $('[data-testid="app-tabs-list-item--selected"]*=' + value)
  }

  environmentHeader() {
    return $('#main-content h2.govuk-heading-l')
  }

  createSecretButton() {
    return $('[data-testid="app-button"]')
  }

  createSecretName() {
    return $('#secret-key')
  }

  createSecretValue() {
    return $('#secret-value')
  }
}

export default new SecretsEnvironmentPage()
