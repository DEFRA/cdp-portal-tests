import { $ } from '@wdio/globals'

class FormComponent {
  get form() {
    return $('form')
  }

  legend(value) {
    return $(`legend*=${value}`)
  }

  inputLabel(value) {
    return $(`label*=${value}`)
  }

  submitButton(value) {
    return $(`button*=${value}`)
  }
}

export default new FormComponent()
