import { Page } from 'page-objects/page'

class AdminPage extends Page {
  /**
   * Check if the admin nav link is active
   * @returns {Promise<boolean>}
   */
  navIsActive() {
    return super.navIsActive('admin')
  }

  open(value = '') {
    return super.open('/admin' + value)
  }

  createUserButton() {
    return $("[href='/admin/users/create']")
  }
}

export default new AdminPage()
