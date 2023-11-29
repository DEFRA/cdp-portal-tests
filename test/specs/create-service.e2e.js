import { expect, browser, $ } from '@wdio/globals'
import MainPage from "../pageobjects/main.page.js";
import OidcLoginPage from "../pageobjects/oidc-login.js";
import CreateServicePage from "../pageobjects/create-service.page.js"
import CreateProgressPage from "../pageobjects/create-progress.page.js"

describe('Main page', () => {
  const testRepoName = "test-repo-" + Math.floor(Math.random() * 9999999) // randomize name

  it('should be able to log in', async() => {
    await MainPage.open()

    await expect(MainPage.loginButton).toHaveText('Sign in')
    await MainPage.loginButton.click()
    await expect(MainPage.loginText).toHaveText('admin')
    await expect(MainPage.loginButton).toHaveText('Sign out')
  })


  it('should be able to create a service', async () => {

    // navigate to the create a service page
    await CreateServicePage.open()
    await expect(CreateServicePage.pageTitle).toHaveText('Create a new microservice')

    await CreateServicePage.inputRepositoryName.addValue(testRepoName)
    await CreateServicePage.inputServiceType.selectByVisibleText('Node.js Frontend')
    await CreateServicePage.inputOwningTeam.selectByIndex(1) // TODO: should this be value? how deterministic is this
    await CreateServicePage.createButton.click()

    // expect a the page to be redirected to the status page
    await expect(CreateProgressPage.isOpen(testRepoName))
    await expect(CreateProgressPage.pageTitle).toHaveText(testRepoName)

    // wait for it to complete
    await expect(CreateProgressPage.overallProgress).toHaveText('IN PROGRESS')

    await CreateProgressPage.overallProgress.waitUntil(async function () {
            return (await this.getText()) === 'SUCCESS'
        }, {
            timeout: 20000,
            timeoutMsg: 'expected overall status to be successful after 20s'
        })

    await expect(CreateProgressPage.overallProgress).toHaveText('SUCCESS')
  })

  it('should display the new service in the service page', async () => {
      await browser.url('/services')
      const serviceLink = $(`a[href="/services/${testRepoName}"]`)
      await expect(serviceLink).toHaveText(testRepoName)
  })



})

