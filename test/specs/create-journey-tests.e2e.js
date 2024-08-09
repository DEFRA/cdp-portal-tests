import { browser, expect } from '@wdio/globals'

import CreatePage from 'page-objects/create.page'
import FormComponent from 'components/form.component'
import HeadingComponent from 'components/heading.component'
import BannerComponent from 'components/banner.component'
import ErrorPage from 'page-objects/error.page'

describe('Create journey tests', () => {
  describe('When logged out', () => {
    before(async () => {
      await CreatePage.open()
    })

    it('Should show a "401" page', async () => {
      await expect(browser).toHaveTitle(
        'Unauthorized | Core Delivery Platform - Portal'
      )
      await expect(ErrorPage.title('401')).toExist()
      await expect(ErrorPage.message()).toHaveText('Unauthorized')
    })
  })

  describe('When logged in', () => {
    const testRepositoryName = `jrny-test-suite-${new Date().getTime()}`

    before(async () => {
      await CreatePage.login()
      await CreatePage.open()
    })

    it('Should be on the "Create" page', async () => {
      await expect(browser).toHaveTitle(
        'Create | Core Delivery Platform - Portal'
      )
      await expect(await CreatePage.navIsActive()).toBe(true)
      await expect(HeadingComponent.title('Create')).toExist()
    })

    it('Should be able to choose journey tests', async () => {
      await expect(
        FormComponent.legend('What would you like to create?')
      ).toExist()

      await FormComponent.inputLabel('Journey Tests').click()
      await FormComponent.submitButton('Next').click()
    })

    it('Should be able to enter journey test details', async () => {
      await expect(browser).toHaveTitle(
        'Create journey test suite | Core Delivery Platform - Portal'
      )
      await expect(await CreatePage.navIsActive()).toBe(true)
      await expect(
        HeadingComponent.title('Create journey test suite')
      ).toExist()

      await FormComponent.inputLabel('Name').click()
      await browser.keys(testRepositoryName)

      await FormComponent.inputLabel('Owning Team').click()
      await browser.keys('Platform')

      await FormComponent.submitButton('Next').click()
    })

    it('Should be able to view journey test summary', async () => {
      await expect(browser).toHaveTitle(
        'Summary journey test suite | Core Delivery Platform - Portal'
      )
      await expect(
        HeadingComponent.title('Summary journey test suite')
      ).toExist()
      await expect(
        HeadingComponent.caption(
          'Information about the new journey test suite you are going to create.'
        )
      ).toExist()

      await FormComponent.submitButton('Create').click()
    })

    it('Should show the status page', async () => {
      await expect(browser).toHaveTitle(
        'Status | Core Delivery Platform - Portal'
      )
      await expect(
        await BannerComponent.content('Test suite creation has started')
      ).toExist()
    })
  })
})
