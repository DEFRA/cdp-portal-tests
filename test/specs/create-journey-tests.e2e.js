import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page'
import CreateJourneyTestPage from 'page-objects/create-journey-test.page'
import StatusPage from 'page-objects/status.page'
import FormComponent from 'components/form.component'

describe('Create microservice', () => {
  const testRepositoryName = `test-suite-${new Date().getTime()}`

  it('Login', async () => {
    await HomePage.open()

    await expect(HomePage.loginLink).toHaveText('Sign in')

    await HomePage.loginLink.click()

    await expect(HomePage.userName).toHaveText('admin')
    await expect(HomePage.loginLink).toHaveText('Sign out')
  })

  it('Should be on the "Create" page', async () => {
    await CreateJourneyTestPage.open()

    await expect(browser).toHaveTitle(
      'Create | Core Delivery Platform - Portal'
    )
    await expect(await CreateJourneyTestPage.navIsActive()).toBe(true)
    await expect(CreateJourneyTestPage.appHeadingTitle('Create')).toExist()
  })

  it('Should be able to choose a Microservice', async () => {
    await expect(
      FormComponent.legend('What would you like to create?')
    ).toExist()

    await FormComponent.inputLabel('Journey Tests').click()
    await FormComponent.submitButton('Next').click()
  })

  it('Should be able to enter journey test details', async () => {
    await expect(browser).toHaveTitle(
      'Create a new journey test suite | Core Delivery Platform - Portal'
    )
    await expect(await CreateJourneyTestPage.navIsActive()).toBe(true)
    await expect(
      CreateJourneyTestPage.appHeadingTitle('Create a new journey test suite')
    ).toExist()

    await FormComponent.inputLabel('Repository name').click()
    await browser.keys(testRepositoryName)

    await FormComponent.inputLabel('Owning Team').click()
    await browser.keys('Platform')

    await FormComponent.submitButton('Next').click()
  })

  it('Should be able to view journey test summary', async () => {
    await expect(browser).toHaveTitle(
      'Create test suite summary | Core Delivery Platform - Portal'
    )
    await expect(
      CreateJourneyTestPage.appHeadingTitle('Create test suite summary')
    ).toExist()
    await expect(
      CreateJourneyTestPage.appHeadingCaption(
        'Information about the new test suite you are going to create.'
      )
    ).toExist()

    await FormComponent.submitButton('Create').click()
  })

  it('Should show the status page', async () => {
    await expect(browser).toHaveTitle(
      `Status | Core Delivery Platform - Portal`
    )
    await expect(await StatusPage.banner()).toExist()
  })
})
