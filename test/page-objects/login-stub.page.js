import { Page } from 'page-objects/page'
import { $, browser, expect } from '@wdio/globals'

class LoginStubPage extends Page {
  adminUserLink() {
    return $('a[id="admin"]*=' + 'Admin User')
  }

  nonAdminUserLink() {
    return $('a[id="nonAdmin"]*=' + 'Non-Admin User')
  }

  async loginAsAdmin() {
    await super.login()
    await this.onLoginStubsPage()
    return await this.adminUserLink().click()
  }

  async loginAsNonAdmin() {
    await super.login()
    await this.onLoginStubsPage()
    return await this.nonAdminUserLink().click()
  }

  onLoginStubsPage() {
    return expect(browser).toHaveTitle('CDP-Portal-Stubs - Login Stub')
  }
}

export default new LoginStubPage()
