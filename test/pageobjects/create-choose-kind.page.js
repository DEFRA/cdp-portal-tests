// http://localhost:3000/create/choose-kind

import { $ } from '@wdio/globals'
import  { Page } from  './page.js'


class CreateChooseKind extends Page {

  get pageTitle () {
    return $('h1[data-testid="app-heading-title"]')
  }

  get inputRadioMicroservice () {
    return $('#kind')
  }

  get inputRadioRepository () {
    return $('#kind-2')
  }
  get nextButton () {
    return $('button=Next')
  }

  open () {
    return super.open('/create/choose-kind')
  }
}

export default new CreateChooseKind();

