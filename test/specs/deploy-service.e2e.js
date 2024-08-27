import { browser, expect } from '@wdio/globals'

import DeployPage from 'page-objects/deploy.page'
import DeploymentsPage from 'page-objects/deployments.page'
import FormComponent from 'components/form.component'
import HeadingComponent from 'components/heading.component'
import ErrorPage from 'page-objects/error.page'

describe('Deploy service', () => {
  describe('When logged out', () => {
    before(async () => {
      await DeployPage.open()
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
    before(async () => {
      await DeployPage.logIn()
      await DeployPage.open()
    })

    it('Should be on the "Deploy details" page', async () => {
      await expect(browser).toHaveTitle(
        'Deploy Service details | Core Delivery Platform - Portal'
      )
      await expect(await DeployPage.navIsActive()).toBe(true)
      await expect(HeadingComponent.title('Details')).toExist()
      await expect(
        HeadingComponent.caption(
          'Provide the microservice image name, version and environment to deploy to.'
        )
      ).toExist()

      await FormComponent.inputLabel('Image Name').click()
      await browser.keys('cdp-portal-frontend')

      await FormComponent.inputLabel('Image Version').click()
      // TODO add a wait here for the ajax to load by waiting for the panel on the right to be populated
      await browser.keys('0.172.0')
      await browser.keys('Down arrow')
      await browser.keys('Enter')

      await FormComponent.inputLabel('Environment').click()
      await browser.keys('management')

      await FormComponent.submitButton('Next').click()
    })

    it('Should be on the "Deploy options" page', async () => {
      await expect(browser).toHaveTitle(
        'Deploy Service options | Core Delivery Platform - Portal'
      )
      await expect(await DeployPage.navIsActive()).toBe(true)
      await expect(HeadingComponent.title('Options')).toExist()
      await expect(
        HeadingComponent.caption(
          'Choose Microservice Instance count, CPU and Memory allocation.'
        )
      ).toExist()

      await FormComponent.inputLabel('Instance count').click()
      await browser.keys('2')

      await FormComponent.inputLabel('CPU size').click()
      await browser.keys('1024')

      await FormComponent.inputLabel('Memory allocation').click()
      await browser.keys('3 GB')

      await FormComponent.submitButton('Next').click()
    })

    it('Should be able to view deployment summary', async () => {
      await expect(browser).toHaveTitle(
        'Deploy Service summary | Core Delivery Platform - Portal'
      )
      await expect(await DeployPage.navIsActive()).toBe(true)
      await expect(HeadingComponent.title('Deployment summary')).toExist()
      await expect(
        HeadingComponent.caption(
          'Information about the Microservice you are going to deploy.'
        )
      ).toExist()

      // TODO check summary is correct

      await FormComponent.submitButton('Deploy').click()
    })

    it('Should be redirected to the deployment page', async () => {
      await expect(browser).toHaveTitle(
        'cdp-portal-frontend Service Deployment | Core Delivery Platform - Portal'
      )
      await expect(await DeploymentsPage.navIsActive()).toBe(true)
      await expect(HeadingComponent.title('Deployment')).toExist()
      await expect(
        HeadingComponent.caption('Microservice deployment information.')
      ).toExist()

      // TODO check env tab is correct
      // TODO check deployment details are correct
    })
  })
})
