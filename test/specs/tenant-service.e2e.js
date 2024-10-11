import { browser, expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import TenantServicePage from 'page-objects/tenant-service.page'

const tenantService = 'cdp-portal-frontend'

describe('Tenant service', () => {
  describe('When logged in', () => {
    before(async () => {
      await TenantServicePage.logIn()
      await TenantServicePage.open(tenantService)
      await expect(TenantServicePage.logOutLink()).toHaveText('Sign out')
    })

    it('Should be a "Service" page', async () => {
      await expect(browser).toHaveTitle(
        `${tenantService} microservice | Core Delivery Platform - Portal`
      )
      await expect(await TenantServicePage.navIsActive()).toBe(true)
      await expect(TenantServicePage.pageHeading()).toHaveText(tenantService)
      await expect(
        HeadingComponent.caption(
          `Information about the ${tenantService} microservice.`
        )
      ).toExist()
    })
  })
})
