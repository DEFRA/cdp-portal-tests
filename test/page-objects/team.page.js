import { Page } from 'page-objects/page'
import SplitPaneComponent from 'components/split-pane.component'
import { $ } from '@wdio/globals'

class TeamPage extends Page {
  /**
   * Check if the user sub nav link is active
   * @returns {Promise<boolean>}
   */
  async subNavIsActive() {
    return await SplitPaneComponent.subNavIsActive('teams')
  }

  memberItem(content) {
    return $('[data-testid="app-member-item"]*=' + content)
  }

  open(value) {
    return super.open('/teams/' + value)
  }
}

export default new TeamPage()
