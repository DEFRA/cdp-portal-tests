import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page'

describe('Home page', () => {
  it('Should be on the "Home" page', async () => {
    await HomePage.open()

    await expect(browser).toHaveTitle('Home | Core Delivery Platform - Portal')
    await expect(await HomePage.navIsActive()).toBe(true)
    await expect(HomePage.serviceName()).toHaveText(
      'Core Delivery Platform - Portal'
    )
    await expect(HomePage.pageHeading()).toHaveText(
      'Build your Defra applications on the Core Delivery Platform'
    )
  })
})
