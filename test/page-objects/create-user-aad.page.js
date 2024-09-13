import { Page } from 'page-objects/page'

class CreateUserAAD extends Page {
  /**
   * Check if the admin nav link is active
   * @returns {Promise<boolean>}
   */
  navIsActive() {
    return super.navIsActive('admin')
  }

  open() {
    return super.open('/admin/users/find-aad-user')
  }
}

export default new CreateUserAAD()
