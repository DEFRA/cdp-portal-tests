import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page'
import CreatePage from 'page-objects/create.page'
import StatusPage from 'page-objects/status.page'
import FormComponent from 'components/form.component'

describe('Create environment tests', () => {
  const testRepositoryName = `env-test-suite-${new Date().getTime()}`

  it('Login', async () => {
    await HomePage.open()

    await expect(HomePage.loginLink).toHaveText('Sign in')

    await HomePage.loginLink.click()

    await expect(HomePage.userName).toHaveText('admin')
    await expect(HomePage.loginLink).toHaveText('Sign out')
  })

  it('Should be on the "Create" page', async () => {
    await CreatePage.open()

    await expect(browser).toHaveTitle(
      'Create | Core Delivery Platform - Portal'
    )
    await expect(await CreatePage.navIsActive()).toBe(true)
    await expect(CreatePage.appHeadingTitle('Create')).toExist()
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
      CreatePage.appHeadingTitle('Create environment test suite')
    ).toExist()

    await FormComponent.inputLabel('Test suite name').click()
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
      CreatePage.appHeadingTitle('Summary environment test suite')
    ).toExist()
    await expect(
      CreatePage.appHeadingCaption(
        'Information about the new environment test suite you are going to create.'
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
