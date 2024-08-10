import { expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page'

describe('Log in and log out', () => {
  before(async () => {
    await HomePage.open()
  })

  it('Should be able to sign in as "Admin" user', async () => {
    await expect(HomePage.logInLink()).toHaveText('Sign in')

    await HomePage.logIn()

    await expect(HomePage.userName()).toHaveText('admin')
    await expect(HomePage.logOutLink()).toHaveText('Sign out')
  })

  it('Should be able to sign out', async () => {
    await expect(HomePage.logOutLink()).toHaveText('Sign out')

    await HomePage.logOut()

    await expect(HomePage.userName()).not.toExist()
    await expect(HomePage.logInLink()).toHaveText('Sign in')
  })
})
