import { browser, expect } from '@wdio/globals'

import CreatePage from 'page-objects/create.page'
import ErrorPage from 'page-objects/error.page'
import FormComponent from 'components/form.component'
import HeadingComponent from 'components/heading.component'
import TestSuitesPage from 'page-objects/test-suites.page'

describe('Create environment tests', () => {
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

  describe('When logged in', () => {
    const testRepositoryName = `env-test-suite-${new Date().getTime()}`

    before(async () => {
      await CreatePage.logIn()
      await CreatePage.open()
    })

    it('Should be on the "Create" page', async () => {
      await expect(browser).toHaveTitle(
        'Create | Core Delivery Platform - Portal'
      )
      await expect(await CreatePage.navIsActive()).toBe(true)
      await expect(HeadingComponent.title('Create')).toExist()
    })

    it('Should be able to choose environment tests', async () => {
      await expect(
        FormComponent.legend('What would you like to create?')
      ).toExist()

      await FormComponent.inputLabel('Environment Test Suite').click()
      await FormComponent.submitButton('Next').click()
    })

    it('Should be able to enter environment test details', async () => {
      await expect(browser).toHaveTitle(
        'Create environment test suite | Core Delivery Platform - Portal'
      )
      await expect(await CreatePage.navIsActive()).toBe(true)
      await expect(
        HeadingComponent.title('Create environment test suite')
      ).toExist()

      await FormComponent.inputLabel('Name').click()
      await browser.keys(testRepositoryName)

      await FormComponent.inputLabel('Owning Team').click()
      await browser.keys('Platform')

      await FormComponent.submitButton('Next').click()
    })

    it('Should be able to view environment test summary', async () => {
      await expect(browser).toHaveTitle(
        'Summary environment test suite | Core Delivery Platform - Portal'
      )
      await expect(
        HeadingComponent.title('Summary environment test suite')
      ).toExist()
      await expect(
        HeadingComponent.caption(
          'Information about the new environment test suite you are going to create.'
        )
      ).toExist()

      await FormComponent.submitButton('Create').click()
    })

    it('Should be redirected to create environment test suite status page', async () => {
      await expect(browser).toHaveTitle(
        `Creating ${testRepositoryName} test suite | Core Delivery Platform - Portal`
      )
      await expect(await TestSuitesPage.navIsActive()).toBe(true)
      await expect(HeadingComponent.title(testRepositoryName)).toExist()
      await expect(
        HeadingComponent.caption(
          `Creating the ${testRepositoryName} test suite.`
        )
      ).toExist()
      await expect(TestSuitesPage.overallProgress()).toHaveText('In-progress')
    })

    it('Should be redirected to "success" create environment test suite page', async () => {
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

      await TestSuitesPage.link('new environment test suite page').click()
    })

    // TODO - add /test-suites/${testRepositoryName} test once stubs have been updated
  })
})
