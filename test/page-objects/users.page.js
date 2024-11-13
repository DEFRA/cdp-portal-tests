import { Page } from 'page-objects/page'
import SplitPaneComponent from 'components/split-pane.component'

class UsersPage extends Page {
  async subNavIsActive() {
    return await SplitPaneComponent.subNavIsActive('users')
  }

  open() {
    return super.open('/admin/users')
  }
}

export default new UsersPage()
