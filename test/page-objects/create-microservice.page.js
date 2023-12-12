import { Page } from 'page-objects/page'

class CreateMicroservicePage extends Page {
  navItem() {
    return super.navItem('create')
  }

  navIsActive() {
    return super.navIsActive('create')
  }

  open() {
    return super.open('/create')
  }
}

export default new CreateMicroservicePage()
