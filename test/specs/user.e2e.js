import { browser, expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import AdminPage from 'page-objects/admin.page'
import UserPage from 'page-objects/user.page'
import FormComponent from 'components/form.component'
import LinkComponent from 'components/link.component'
import EntityListComponent from 'components/entity-list.component'
import GovukSummaryListComponent from 'components/govuk-summary-list.component'
import ErrorPage from 'page-objects/error.page'

describe('Aad User', () => {
  describe('When logged out', () => {
    before(async () => {
      await AdminPage.open()
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
      await AdminPage.logIn()
      await AdminPage.open()
    })

    describe('When creating a new user', () => {
      it('Should be on the "Admin Users" list page', async () => {
        await expect(browser).toHaveTitle(
          'Users | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UserPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Users')).toExist()
        await expect(
          HeadingComponent.caption('Core Delivery Platform users.')
        ).toExist()
      })

      it('Should be able to go to the Create user flow', async () => {
        await LinkComponent.link('create-user-button', 'Create').click()

        await expect(browser).toHaveTitle(
          'Find AAD user | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UserPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Find AAD user')).toExist()
        await expect(
          HeadingComponent.caption(
            'Search for the Defra Azure Active Directory (AAD) user.'
          )
        ).toExist()
      })

      it('Should be able to find AAD user', async () => {
        await FormComponent.inputLabel('AAD users name or email').click()
        await browser.keys('test')

        const aadUserSearchResult = FormComponent.inputLabel(
          'A Stub - a.stub@test.co'
        )
        await expect(aadUserSearchResult).toExist()
        await aadUserSearchResult.click()

        await FormComponent.submitButton('Next').click()
      })

      it('Should be on the Find GitHub user page', async () => {
        await expect(browser).toHaveTitle(
          'Find Defra GitHub User | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UserPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Find Defra GitHub User')).toExist()
        await expect(
          HeadingComponent.caption('Search for the Defra GitHub user.')
        ).toExist()
      })

      it('Should be able to find GitHub user', async () => {
        await FormComponent.inputLabel('GitHub username').click()
        await browser.keys('test')

        const githubSearchResult = await FormComponent.inputLabel(
          '@cdp-test-441241 - Test Testing'
        )
        await expect(githubSearchResult).toExist()
        await githubSearchResult.click()
        await FormComponent.submitButton('Next').click()
      })

      it('Should be on the User Details page', async () => {
        await expect(browser).toHaveTitle(
          'Add CDP user details | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UserPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Add CDP user details')).toExist()
        await expect(
          HeadingComponent.caption('Add Core Delivery Platform user details.')
        ).toExist()
      })

      it('Should be able to Skip to summary', async () => {
        await FormComponent.submitButton('Skip').click()
      })

      it('Should be on the User Summary page', async () => {
        await expect(browser).toHaveTitle(
          'Create user summary | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UserPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Create user summary')).toExist()
        await expect(
          HeadingComponent.caption(
            'Information about the user you are going to create.'
          )
        ).toExist()
      })

      it('User Summary page Should contain expected details', async () => {
        await expect(
          await GovukSummaryListComponent.row('aad-user-email')
        ).toHaveText('a.stub@test.co')
        await expect(
          await GovukSummaryListComponent.row('aad-user-name')
        ).toHaveText('A Stub')
        await expect(
          await GovukSummaryListComponent.row('github-user')
        ).toHaveText('@cdp-test-441241')

        await FormComponent.submitButton('Create').click()
      })

      it('Should be redirected to the "Admin Users" list page', async () => {
        await expect(browser).toHaveTitle(
          'Users | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UserPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Users')).toExist()
        await expect(
          HeadingComponent.caption('Core Delivery Platform users.')
        ).toExist()

        await expect(EntityListComponent.content('A Stub')).toExist()
        await expect(EntityListComponent.content('a.stub@test.co')).toExist()
        await expect(EntityListComponent.content('@cdp-test-441241')).toExist()
      })
    })

    describe('When deleting a user', () => {
      it('Should be on the "Admin Users" list page', async () => {
        await expect(browser).toHaveTitle(
          'Users | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UserPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Users')).toExist()
        await expect(
          HeadingComponent.caption('Core Delivery Platform users.')
        ).toExist()
      })

      it('Should be able to go to the Users page', async () => {
        await LinkComponent.link('app-entity-link', 'A Stub').click()

        await expect(browser).toHaveTitle(
          'A Stub | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UserPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('A Stub')).toExist()
        await expect(HeadingComponent.caption('User details.')).toExist()
      })

      it('Should be able to go to the Delete user flow', async () => {
        await LinkComponent.link('delete-user-button', 'Delete').click()

        await expect(browser).toHaveTitle(
          'Confirm user deletion | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UserPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Confirm user deletion')).toExist()
        await expect(
          HeadingComponent.caption(
            'Permanently delete user from the Core Delivery Platform.'
          )
        ).toExist()
      })

      it('Should be able to Delete the user', async () => {
        await FormComponent.submitButton('Delete').click()
      })

      it('Should be on the "Admin Users" list page', async () => {
        await expect(browser).toHaveTitle(
          'Users | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UserPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Users')).toExist()
        await expect(
          HeadingComponent.caption('Core Delivery Platform users.')
        ).toExist()
      })

      it('Should have deleted the user', async () => {
        await expect(HeadingComponent.title('A Stub')).not.toExist()
        await expect(HeadingComponent.caption('User details.')).not.toExist()
      })
    })
  })
})
