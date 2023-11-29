import { $ } from '@wdio/globals'
import  { Page } from  './page.js'


class MainPage extends Page {

  get pageTitle () {
    return $('a[data-testid="app-header-link"]')
  }

  get loginButton () {
    return $('a[data-testid="app-login-link"]')
  }

  get loginText () {
    return $('.app-header__actions > span')
  }

  open () {
    return super.open('/')
  }

}

export default new MainPage();

