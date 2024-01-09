import { Page } from 'page-objects/page'
import { $ } from '@wdio/globals'

class StatusPage extends Page {
  banner() {
    return $(`[data-testid="app-banner-content"]`)
  }
}

export default new StatusPage()
