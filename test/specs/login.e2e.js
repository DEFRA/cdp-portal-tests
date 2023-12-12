import { expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page'

describe('Login', () => {
  beforeEach(async () => {
    await HomePage.open()
  })

  it('Should be able to sign in as "Admin" user', async () => {
    await expect(HomePage.loginLink).toHaveText('Sign in')

    await HomePage.loginLink.click()

    await expect(HomePage.userName).toHaveText('admin')
    await expect(HomePage.loginLink).toHaveText('Sign out')
  })

  it('Should be able to sign out', async () => {
    await expect(HomePage.loginLink).toHaveText('Sign out')

    await HomePage.loginLink.click()

    await expect(HomePage.userName).not.toExist()
    await expect(HomePage.loginLink).toHaveText('Sign in')
  })
})
