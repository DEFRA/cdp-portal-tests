import { browser, expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import AdminPage from 'page-objects/admin.page'
import ErrorPage from 'page-objects/error.page'

describe('Admin', () => {
  describe('When logged out', () => {
    before(async () => {
      await AdminPage.open()
    })

    it('Should show the "401" error page', async () => {
      await expect(browser).toHaveTitle(
        'Unauthorized | Core Delivery Platform - Portal'
      )
      await expect(ErrorPage.title('401')).toExist()
      await expect(ErrorPage.message()).toHaveText('Unauthorized')
    })
  })

  describe('When logged in', () => {
    before(async () => {
      await AdminPage.logIn()
      await AdminPage.open()
    })

    it('Should be on the create user page', async () => {
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
