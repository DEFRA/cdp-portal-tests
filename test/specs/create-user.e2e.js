import { $, browser, expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import AdminPage from 'page-objects/admin.page'
import CreateUserAadPage from 'page-objects/create-user-aad.page'
import CreateUserSummaryPage from 'page-objects/create-user-summary.page'
import UserPage from 'page-objects/user.page'
import FormComponent from 'components/form.component'

describe('When logged in', () => {
  before(async () => {
    await AdminPage.logIn()
    await AdminPage.open()
  })

  it('Create a new user', async () => {
    await CreateUserAadPage.open()

    // Link the AAD account
    await expect(HeadingComponent.title('Find AAD user')).toExist()
    await expect(browser).toHaveTitle(
      'Find AAD user | Core Delivery Platform - Portal'
    )

    // search for our user and select the match
    await FormComponent.inputLabel('AAD users name or email').click()
    await browser.keys('test')

    const aadMatch = FormComponent.inputLabel('A Stub - a.stub@test.co')
    await expect(aadMatch).toExist()
    await aadMatch.click()

    // Submit the AAD form
    await FormComponent.submitButton('Next').click()

    // Check we're on the github linking page
    await expect(browser).toHaveTitle(
      'Find Defra GitHub User | Core Delivery Platform - Portal'
    )

    // Link the GitHub account
    await FormComponent.inputLabel('GitHub username').click()
    await browser.keys('test')

    const githubMatch = await FormComponent.inputLabel(
      '@cdp-test-441241 - Test Testing'
    )
    await expect(githubMatch).toExist()
    await githubMatch.click()
    await FormComponent.submitButton('Next').click()

    // Skip the VPN page
    await expect(browser).toHaveTitle(
      'Add CDP user details | Core Delivery Platform - Portal'
    )
    await FormComponent.submitButton('Skip').click()

    // Check the summary has what we want
    await expect(await CreateUserSummaryPage.aadEmail()).toHaveText(
      'a.stub@test.co'
    )
    await expect(await CreateUserSummaryPage.aadUserName()).toHaveText('A Stub')
    await expect(await CreateUserSummaryPage.githubLink()).toHaveText(
      '@cdp-test-441241'
    )

    // Create the user and check it shows up in the list
    await expect(FormComponent.submitButton('Create')).toExist()
    await FormComponent.submitButton('Create').click()
    await expect(browser).toHaveTitle('Users | Core Delivery Platform - Portal')

    await expect($('=A Stub')).toExist()
  })

  it('Should delete the user it just created', async () => {
    // From the admin page
    await AdminPage.open()
    await $('=A Stub').click()

    // Select the user
    await expect(browser).toHaveTitle(
      'A Stub | Core Delivery Platform - Portal'
    )

    // Check we're on the right page
    await expect(await UserPage.name()).toHaveText('A Stub')
    await expect(await UserPage.email()).toHaveText('a.stub@test.co')

    // Click delete
    await expect(await UserPage.deleteButton()).toExist()
    await (await UserPage.deleteButton()).click()

    // Click delete again on the confirm page
    await expect(browser).toHaveTitle(
      'Confirm user deletion | Core Delivery Platform - Portal'
    )
    await FormComponent.submitButton('Delete').click()

    // Check the banner says its deleted ok
    await expect(browser).toHaveTitle('Users | Core Delivery Platform - Portal')
    await expect(await $('=A Stub')).not.toExist()
  })
})
