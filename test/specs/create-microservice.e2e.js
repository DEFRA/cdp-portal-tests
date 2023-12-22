import { browser, expect } from '@wdio/globals'

import HomePage from 'page-objects/home.page'
import CreateMicroservicePage from 'page-objects/create-microservice.page'
import ServicesPage from 'page-objects/services.page'
import FromComponent from 'components/form.component'
import EntityListComponent from 'components/entity-list.component'

describe('Create microservice', () => {
  const testRepositoryName = `test-repo-${new Date().getTime()}`
  const serviceTypes = ['DotNet Backend', 'Node.js Frontend', 'Node.js Backend']
  const randomServiceType = Math.floor(Math.random() * serviceTypes.length)
  const serviceType = serviceTypes[randomServiceType]

  it('Login', async () => {
    await HomePage.open()

    await expect(HomePage.loginLink).toHaveText('Sign in')

    await HomePage.loginLink.click()

    await expect(HomePage.userName).toHaveText('admin')
    await expect(HomePage.loginLink).toHaveText('Sign out')
  })

  it('Should be on the "Create" page', async () => {
    await CreateMicroservicePage.open()

    await expect(browser).toHaveTitle(
      'Create | Core Delivery Platform - Portal'
    )
    await expect(await CreateMicroservicePage.navIsActive()).toBe(true)
    await expect(CreateMicroservicePage.appHeadingTitle('Create')).toExist()
  })

  it('Should be able to choose a Microservice', async () => {
    await expect(
      FromComponent.legend('What would you like to create?')
    ).toExist()

    await FromComponent.inputLabel('Microservice').click()
    await FromComponent.submitButton('Next').click()
  })

  it('Should be able to enter microservice details', async () => {
    await expect(browser).toHaveTitle(
      'Create a new microservice | Core Delivery Platform - Portal'
    )
    await expect(await CreateMicroservicePage.navIsActive()).toBe(true)
    await expect(
      CreateMicroservicePage.appHeadingTitle('Create a new microservice')
    ).toExist()
    await expect(
      CreateMicroservicePage.appHeadingCaption(
        'Create a new microservice code repository and infrastructure.'
      )
    ).toExist()
    await expect(
      FromComponent.legend('Enter your new service details')
    ).toExist()

    await FromComponent.inputLabel('Repository Name').click()
    await browser.keys(testRepositoryName)

    await FromComponent.inputLabel('Service Type').click()
    await browser.keys(serviceType)

    await FromComponent.inputLabel('Owning Team').click()
    await browser.keys('Platform')

    await FromComponent.submitButton('Next').click()
  })

  it('Should be able to view microservice summary', async () => {
    await expect(browser).toHaveTitle(
      'Create microservice summary | Core Delivery Platform - Portal'
    )
    await expect(await CreateMicroservicePage.navIsActive()).toBe(true)
    await expect(
      CreateMicroservicePage.appHeadingTitle('Create microservice summary')
    ).toExist()
    await expect(
      CreateMicroservicePage.appHeadingCaption(
        'Information about the new microservice you are going to create.'
      )
    ).toExist()

    await FromComponent.submitButton('Create').click()
  })

  it('Should be redirected to create microservice status page', async () => {
    await expect(browser).toHaveTitle(
      `Creating ${testRepositoryName} microservice | Core Delivery Platform - Portal`
    )
    await expect(await ServicesPage.navIsActive()).toBe(true)
    await expect(ServicesPage.appHeadingTitle(testRepositoryName)).toExist()
    await expect(
      ServicesPage.appHeadingCaption(
        `Creating the ${testRepositoryName} microservice.`
      )
    ).toExist()
    await expect(ServicesPage.overallProgress()).toHaveText('IN PROGRESS')
  })

  it('Should be redirected to "success" create microservice page', async () => {
    await expect(browser).toHaveTitle(
      `Created ${testRepositoryName} microservice | Core Delivery Platform - Portal`
    )
    await expect(await ServicesPage.navIsActive()).toBe(true)
    await expect(ServicesPage.appHeadingTitle(testRepositoryName)).toExist()
    await expect(
      ServicesPage.appHeadingCaption(
        `Created the ${testRepositoryName} microservice.`
      )
    ).toExist()

    await FromComponent.submitButton('View microservice page').click()
  })

  it('Should be redirected to created microservice page', async () => {
    await expect(browser).toHaveTitle(
      `${testRepositoryName} microservice | Core Delivery Platform - Portal`
    )
    await expect(await ServicesPage.navIsActive()).toBe(true)
    await expect(ServicesPage.appHeadingTitle(testRepositoryName)).toExist()

    await ServicesPage.appHeadingCaption(
      `Information about the ${testRepositoryName} microservice.`
    ).waitForDisplayed({
      timeout: 60000,
      timeoutMsg:
        'Expected service page caption status to be appear after 60 seconds'
    })

    await expect(
      ServicesPage.appHeadingCaption(
        `Information about the ${testRepositoryName} microservice.`
      )
    ).toExist()
  })

  it('Should display new microservice on services list page', async () => {
    await ServicesPage.open()

    await expect(browser).toHaveTitle(
      'Services | Core Delivery Platform - Portal'
    )
    await expect(await ServicesPage.navIsActive()).toBe(true)
    await expect(ServicesPage.appHeadingTitle('Services')).toExist()
    await expect(
      ServicesPage.appHeadingCaption(
        'Frontend and Backend microservice information.'
      )
    ).toExist()

    await expect(EntityListComponent.entityLink(testRepositoryName)).toExist()
  })
})
