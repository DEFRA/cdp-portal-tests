import { Page } from 'page-objects/page'
import SplitPaneComponent from 'components/split-pane.component'
import { $ } from '@wdio/globals'

class AdminTeamPage extends Page {
  /**
   * Check if the user sub nav link is active
   * @returns {Promise<boolean>}
   */
  async subNavIsActive() {
    return await SplitPaneComponent.subNavIsActive('teams')
  }

  memberLink(content) {
    return $('[data-testid="app-member-link"]*=' + content)
  }

  open(value) {
    return super.open('/admin/teams/' + value)
  }
}

export default new AdminTeamPage()
