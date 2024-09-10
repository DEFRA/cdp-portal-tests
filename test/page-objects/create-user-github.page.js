import { Page } from 'page-objects/page'

class CreateUserGitHub extends Page {
  /**
   * Check if the admin nav link is active
   * @returns {Promise<boolean>}
   */
  navIsActive() {
    return super.navIsActive('admin')
  }

  searchByGitHubName() {
    return $('#githubSearch')
  }

  searchResult() {
    return $('#github')
  }

  nextButton() {
    return $('button=Next')
  }
}

export default new CreateUserGitHub()
