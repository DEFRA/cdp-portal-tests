import { $ } from '@wdio/globals'

/**
 * Form helper component
 */
class FormComponent {
  form() {
    return $('form')
  }

  legend(content) {
    return $('legend*=' + content)
  }

  inputLabel(content) {
    return $('label*=' + content)
  }

  submitButton(content) {
    return $('button*=' + content)
  }
}

export default new FormComponent()
