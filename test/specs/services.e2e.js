import { browser, expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import ServicesPage from 'page-objects/services.page'

describe('Services page', () => {
  describe('When logged in', () => {
    before(async () => {
      await ServicesPage.logIn()
      await ServicesPage.open()
    })

    it('Should be on the "Services" page', async () => {
      await ServicesPage.open()

      await expect(browser).toHaveTitle(
        'Services | Core Delivery Platform - Portal'
      )
      await expect(await ServicesPage.navIsActive()).toBe(true)
      await expect(ServicesPage.pageHeading()).toHaveText('Services')
      await expect(
        HeadingComponent.caption(
          'Frontend and Backend microservice information.'
        )
      ).toExist()
    })
  })
})
