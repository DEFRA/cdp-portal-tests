import { expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page'
import LoginStubPage from 'page-objects/login-stub.page'
import LinkComponent from 'components/link.component'

describe('Log in and log out', () => {
  before(async () => {
    await HomePage.open()
  })

  it('Should be able to sign in as "Admin" user', async () => {
    await expect(HomePage.logInLink()).toHaveText('Sign in')

    await LoginStubPage.loginAsAdmin()

    await expect(HomePage.userName()).toHaveText('Admin User')
    await expect(HomePage.logOutLink()).toHaveText('Sign out')

    await expect(
      LinkComponent.link('nav-deploy-service', 'Deploy Service')
    ).toExist()
    await expect(LinkComponent.link('nav-create', 'Create')).toExist()
    await expect(LinkComponent.link('nav-admin', 'Admin')).toExist()
  })

  it('Should be able to sign out', async () => {
    await expect(HomePage.logOutLink()).toHaveText('Sign out')

    await HomePage.logOut()

    await expect(HomePage.userName()).not.toExist()
    await expect(HomePage.logInLink()).toHaveText('Sign in')
  })

  it('Should be able to sign in as non-admin user', async () => {
    await expect(HomePage.logInLink()).toHaveText('Sign in')

    await LoginStubPage.loginAsNonAdmin()

    await expect(HomePage.userName()).toHaveText('Non-Admin User')
    await expect(HomePage.logOutLink()).toHaveText('Sign out')

    await expect(
      LinkComponent.link('nav-deploy-service', 'Deploy Service')
    ).toExist()
    await expect(LinkComponent.link('nav-create', 'Create')).toExist()
    await expect(LinkComponent.link('nav-admin', 'Admin')).not.toExist()

    await HomePage.logOut()
  })
})
