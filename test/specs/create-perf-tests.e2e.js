import { browser, expect } from '@wdio/globals'

import CreatePage from 'page-objects/create.page'
import FormComponent from 'components/form.component'
import HeadingComponent from 'components/heading.component'
import BannerComponent from 'components/banner.component'
import ErrorPage from 'page-objects/error.page'
import LoginStubPage from 'page-objects/login-stub.page'
import TestSuitesPage from 'page-objects/test-suites.page'

describe('Create perf tests', () => {
  describe('When logged out', () => {
    before(async () => {
      await CreatePage.open()
    })

    it('Should show the "401" error page', async () => {
      await expect(browser).toHaveTitle(
        'Unauthorized | Core Delivery Platform - Portal'
      )
      await expect(ErrorPage.title('401')).toExist()
      await expect(ErrorPage.message()).toHaveText('Unauthorized')
    })
  })

  describe('When logged in as admin user', () => {
    const testRepositoryName = `perf-test-suite-${new Date().getTime()}`

    before(async () => {
      await LoginStubPage.loginAsAdmin()
      await CreatePage.open()
    })

    it('Should be on the "Create" page', async () => {
      await expect(browser).toHaveTitle(
        'Create | Core Delivery Platform - Portal'
      )
      await expect(await CreatePage.navIsActive()).toBe(true)
      await expect(HeadingComponent.title('Create')).toExist()
    })

    it('Should be able to choose perf tests', async () => {
      await expect(
        HeadingComponent.caption('What would you like to create?')
      ).toExist()

      await FormComponent.inputLabel('Performance Test Suite').click()
      await FormComponent.submitButton('Next').click()
    })

    it('Should be able to enter perf test details', async () => {
      await expect(browser).toHaveTitle(
        'Create performance test suite | Core Delivery Platform - Portal'
      )
      await expect(await CreatePage.navIsActive()).toBe(true)
      await expect(
        HeadingComponent.title('Create performance test suite')
      ).toExist()
      await expect(HeadingComponent.caption()).toHaveText(
        'Built using Apache JMeter. Capable of running against a live environment.'
      )

      await FormComponent.inputLabel('Name').click()
      await browser.keys(testRepositoryName)

      await FormComponent.inputLabel('Owning Team').click()
      await browser.keys('Platform')

      await FormComponent.submitButton('Next').click()
    })

    it('Should be able to view perf test summary', async () => {
      await expect(browser).toHaveTitle(
        'Summary performance test suite | Core Delivery Platform - Portal'
      )
      await expect(
        HeadingComponent.title('Summary performance test suite')
      ).toExist()
      await expect(
        HeadingComponent.caption(
          'Information about the new performance test suite you are going to create.'
        )
      ).toExist()

      await FormComponent.submitButton('Create').click()
    })

    it('Should be redirected to create perf test suite status page', async () => {
      await expect(browser).toHaveTitle(
        `Creating ${testRepositoryName} test suite | Core Delivery Platform - Portal`
      )
      await expect(
        await BannerComponent.content('Perf test suite creation has started')
      ).toExist()
      await expect(await TestSuitesPage.navIsActive()).toBe(true)
      await expect(HeadingComponent.title(testRepositoryName)).toExist()
      await expect(
        HeadingComponent.caption(
          `Creating the ${testRepositoryName} test suite.`
        )
      ).toExist()
      await expect(TestSuitesPage.overallProgress()).toHaveText('In-progress')
    })

    it('Should be redirected to "success" create pref test suite page', async () => {
      await expect(browser).toHaveTitle(
        `Created ${testRepositoryName} test suite | Core Delivery Platform - Portal`
      )
      await expect(await TestSuitesPage.navIsActive()).toBe(true)
      await expect(HeadingComponent.title(testRepositoryName)).toExist()
      await expect(
        HeadingComponent.caption(
          `Created the ${testRepositoryName} test suite.`
        )
      ).toExist()

      await TestSuitesPage.link('new test suite page').click()
    })
  })
})
