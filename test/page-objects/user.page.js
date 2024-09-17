import { Page } from 'page-objects/page'
import SplitPaneComponent from 'components/split-pane.component'

class UserPage extends Page {
  /**
   * Check if the user sub nav link is active
   * @returns {Promise<boolean>}
   */
  async subNavIsActive() {
    return await SplitPaneComponent.subNavIsActive('users')
  }

  open() {
    return super.open('/admin/users')
  }
}

export default new UserPage()
