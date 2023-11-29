import { $ } from '@wdio/globals'
import  { Page } from  './page.js'


class CreateServicePage extends Page {

  get pageTitle () {
    return $('h1[data-testid="app-heading-title"]')
  }

  get inputRepositoryName () {
    return $('#repository-name')
  }

  get inputServiceType () {
    return $('#service-type')
  }

  get inputOwningTeam () {
    return $('#team-id')
  }

  get createButton () {
    return $('button[data-testid="app-button"]')
  }

  open () {
    return super.open('/create-service')
  }
}

export default new CreateServicePage();

