import { browser } from '@wdio/globals'

import AdminPage from 'page-objects/admin.page'
import FormComponent from 'components/form.component'
import LinkComponent from 'components/link.component'
import LoginStubPage from 'page-objects/login-stub.page'

async function createUser(searchTerm) {
  await LoginStubPage.loginAsAdmin()

  await AdminPage.open('/users/create')

  // AAD user
  await FormComponent.inputLabel('AAD users name or email').click()
  await browser.keys(searchTerm)
  await FormComponent.inputLabel(searchTerm).click()

  // GitHub user
  await FormComponent.inputLabel('GitHub username').click()
  await browser.keys(searchTerm)
  await FormComponent.inputLabel(searchTerm).click()
  await FormComponent.submitButton('Next').click()

  // Skip user details
  await FormComponent.submitButton('Skip').click()

  // Create
  await FormComponent.submitButton('Create').click()

  await LoginStubPage.logOut()
}

async function deleteUser(username) {
  await LoginStubPage.loginAsAdmin()

  await AdminPage.open('/users')

  // Go to users page, then delete confirm page, then press delete
  await LinkComponent.link('app-entity-link', username).click()
  await LinkComponent.link('admin-delete-user', 'Delete user').click()
  await FormComponent.submitButton('Delete user').click()

  await LoginStubPage.logOut()
}

export { createUser, deleteUser }
