import { $ } from '@wdio/globals'
import { Page } from 'page-objects/page'

class CreateUserSummaryPage extends Page {
  aadEmail() {
    return $(
      '//dt[normalize-space(text())="AAD user email"]/following-sibling::dd'
    )
  }

  aadUserName() {
    return $(
      '//dt[normalize-space(text())="AAD user name"]/following-sibling::dd'
    )
  }

  githubLink() {
    return $(
      '//dt[normalize-space(text())="GitHub user"]/following-sibling::dd'
    )
  }

  createButton() {
    return $('button=Create')
  }
}

export default new CreateUserSummaryPage()
