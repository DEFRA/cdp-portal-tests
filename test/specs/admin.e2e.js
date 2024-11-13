import { browser, expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import AdminPage from 'page-objects/admin.page'
import ErrorPage from 'page-objects/error.page'
import LoginStubPage from 'page-objects/login-stub.page'

describe('Admin', () => {
  describe('When logged in as a non-admin user', () => {
    before(async () => {
      await LoginStubPage.loginAsNonAdmin()
      await AdminPage.open()
    })

    it('Should show the "403" error page', async () => {
      await expect(browser).toHaveTitle(
        'Forbidden | Core Delivery Platform - Portal'
      )
      await expect(ErrorPage.title('403')).toExist()
      await expect(ErrorPage.message()).toHaveText('Forbidden')
    })

    after(async () => {
      await AdminPage.logOut()
    })
  })

  describe('When logged in as admin user', () => {
    before(async () => {
      await LoginStubPage.loginAsAdmin()
      await AdminPage.open()
    })

    it('Should be on the admin user page', async () => {
      await expect(browser).toHaveTitle(
        'Users | Core Delivery Platform - Portal'
      )
      await expect(await AdminPage.navIsActive()).toBe(true)
      await expect(HeadingComponent.title('Users')).toExist()
      await expect(
        HeadingComponent.caption('Core Delivery Platform users.')
      ).toExist()
    })
  })
})
