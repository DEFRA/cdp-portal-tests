import { $ } from '@wdio/globals'
import  { Page } from  './page.js'


class CreateProgressPage extends Page {

  get pageTitle () {
    return $('h1[data-testid="app-heading-title"]')
  }

  get overallProgress () {
    return $('.app-status-info__primary')
  }

  open (service) {
    return super.open('/service/' + service)
  }
}

export default new CreateProgressPage();

