import { expect, browser, $ } from '@wdio/globals'

describe('Main page', () => {
    it('should display title', async() => {
        await browser.url('/')
        const welcome = $('.app-header__service-name')
        await expect(welcome).toHaveText('Core Delivery Platform - Portal')
        const login = $('a[data-testid="app-login-link"]')
        await expect(login).toHaveText('Sign in')
    })

    it('should be able to log in', async() => {
        await browser.url('/')
        const login = $('a[data-testid="app-login-link"]')
        await login.click()
        await expect(login).toHaveText('Sign out')
        const userName = $('.app-header__actions > span')
        await expect(userName).toHaveText('Test User')
    })
})

describe('create a service', () => {

    const testRepoName = "test-repo-" + Math.floor(Math.random() * 9999999) // randomize name

    it('should be able to create a service', async () => {

        // navigate to the create a service page
        await browser.url('/create-service')

        const pageTitle =$('h1[data-testid="app-heading-title"]')
        await expect(pageTitle).toHaveText('Create a new microservice')

        const inputRepoName = $('#repository-name')
        const inputServiceType = $('#service-type')
        const inputOwningTeam = $('#team-id')
        const inputButton = $('button[data-testid="app-button"]')

        await inputRepoName.addValue(testRepoName)
        await inputServiceType.selectByVisibleText('Node.js Frontend')
        await inputOwningTeam.selectByIndex(1)
        await inputButton.click()

        await expect(pageTitle).toHaveText(testRepoName)

        // wait for it to complete
        const overallProgress = $('.app-status-info__primary')
        await expect(overallProgress).toHaveText('SUCCESS')
    })

    it('should display the new service in the service page', async () => {
        await browser.url('/services')

        const serviceLink = $(`a[href="/services/${testRepoName}"]`)
        await expect(serviceLink).toHaveText(testRepoName)
    })
})