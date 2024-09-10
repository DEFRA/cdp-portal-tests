import { $, browser, expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import AdminPage from 'page-objects/admin.page'
import CreateUserAadPage from 'page-objects/create-user-aad.page'
import CreateUserGithubPage from 'page-objects/create-user-github.page'
import CreateUserSummaryPage from 'page-objects/create-user-summary.page'

describe('When logged in', () => {
  before(async () => {
    await AdminPage.logIn()
    await AdminPage.open()
  })

  it('Create a new user', async () => {
    // Check we're on the right page
    await expect(browser).toHaveTitle('Users | Core Delivery Platform - Portal')
    await expect(await AdminPage.navIsActive()).toBe(true)
    await expect(HeadingComponent.title('Users')).toExist()
    await expect(
      HeadingComponent.caption('Core Delivery Platform users.')
    ).toExist()

    // Click the Create button
    await AdminPage.createUserButton().click()
    await expect(HeadingComponent.title('Find AAD user')).toExist()

    // Link the AAD account
    await expect(browser).toHaveTitle(
      'Find AAD user | Core Delivery Platform - Portal'
    )
    const addInput = await CreateUserAadPage.searchByAADName()
    await addInput.click()
    await browser.keys('test')

    await expect(CreateUserAadPage.searchResult('a.stub@test.co')).toExist()
    await CreateUserAadPage.searchResult('a.stub@test.co').click()
    await CreateUserAadPage.nextButton().click()

    await expect(browser).toHaveTitle(
      'Find Defra GitHub User | Core Delivery Platform - Portal'
    )

    // Link the GitHub account
    const githubInput = await CreateUserGithubPage.searchByGitHubName()
    await githubInput.click()
    await browser.keys('test')

    await expect(await CreateUserGithubPage.searchResult()).toExist()
    await expect(await CreateUserGithubPage.searchResult()).toHaveValue(
      'cdp-test-441241'
    )
    await CreateUserGithubPage.searchResult().click()
    await CreateUserGithubPage.nextButton().click()

    // Skip the VPN page
    await expect(browser).toHaveTitle(
      'Add CDP user details | Core Delivery Platform - Portal'
    )
    await $('button=Skip').click()

    // Check the summary has what we want
    await expect(
      await CreateUserSummaryPage.aadEmail('a.stub@test.co')
    ).toExist()
    await expect(await CreateUserSummaryPage.aadUserName('A Stub')).toExist()
    await expect(
      await CreateUserSummaryPage.githubLink('@cdp-test-441241')
    ).toExist()
    await expect(await CreateUserSummaryPage.createButton()).toExist()

    // Create the user and check it shows up in the list
    await CreateUserSummaryPage.createButton().click()
    await expect(browser).toHaveTitle('Users | Core Delivery Platform - Portal')

    await $('=A Stub').click()
  })
})
