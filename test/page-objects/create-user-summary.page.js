import { $ } from '@wdio/globals'
import { Page } from 'page-objects/page'

class CreateUserSummaryPage extends Page {
  async aadEmail() {
    const table = await $('dl')
    return table.$('./div[1]/dd[1]')
  }

  aadUserName(value) {
    return $('dd=' + value)
  }

  githubLink(githubId) {
    return $('=' + githubId)
  }

  createButton() {
    return $('button=Create')
  }
}

export default new CreateUserSummaryPage()
