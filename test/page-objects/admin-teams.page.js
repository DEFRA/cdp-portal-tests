import { Page } from 'page-objects/page'
import SplitPaneComponent from 'components/split-pane.component'

class AdminTeamsPage extends Page {
  /**
   * Check if the user sub nav link is active
   * @returns {Promise<boolean>}
   */
  async subNavIsActive() {
    return await SplitPaneComponent.subNavIsActive('teams')
  }

  open() {
    return super.open('/admin/teams')
  }
}

export default new AdminTeamsPage()
