import { $ } from '@wdio/globals'

import { Page } from 'page-objects/page'
import HeadingComponent from 'components/heading.component'

class ErrorPage extends Page {
  title(content) {
    return HeadingComponent.title(content)
  }

  message() {
    return $('[data-testid="error-message"]')
  }
}

export default new ErrorPage()
