import { browser, expect } from '@wdio/globals'

import AdminPage from 'page-objects/admin.page'
import ErrorPage from 'page-objects/error.page'

describe('Error pages', () => {
  it('Should show the "404" error page', async () => {
    await ErrorPage.open('/random-url-that-does-not-exist')

    await expect(browser).toHaveTitle(
      'Page not found | Core Delivery Platform - Portal'
    )
    await expect(ErrorPage.title('404')).toExist()
    await expect(ErrorPage.message()).toHaveText('Page not found')
  })

  it('Should show the "401" error page', async () => {
    await AdminPage.open()

    await expect(browser).toHaveTitle(
      'Unauthorized | Core Delivery Platform - Portal'
    )
    await expect(ErrorPage.title('401')).toExist()
    await expect(ErrorPage.message()).toHaveText('Unauthorized')
  })
})
