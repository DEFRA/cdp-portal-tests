import { $ } from '@wdio/globals'
import  { Page } from  './page.js'

// The oidc stub login page
class OidcLoginPage extends Page {

  get adminLogin () {

    return $('=admin')
  }

  loginAsAdmin() {

    return $('=admin').click()
  }

}

export default new OidcLoginPage();

