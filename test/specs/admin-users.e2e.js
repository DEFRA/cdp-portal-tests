import { browser, expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import PageHeadingComponent from 'components/page-heading.component'
import AdminPage from 'page-objects/admin.page'
import UsersPage from 'page-objects/users.page'
import FormComponent from 'components/form.component'
import LinkComponent from 'components/link.component'
import EntityListComponent from 'components/entity-list.component'
import GovukSummaryListComponent from 'components/govuk-summary-list.component'
import LoginStubPage from 'page-objects/login-stub.page'
import AdminTeamPage from 'page-objects/admin-team.page'

const mockUserName = 'A Stub'

async function onTheAdminUsersPage() {
  await expect(browser).toHaveTitle('Users | Core Delivery Platform - Portal')
  await expect(await AdminPage.navIsActive()).toBe(true)
  await expect(await UsersPage.subNavIsActive()).toBe(true)
  await expect(PageHeadingComponent.title('Users')).toExist()
}

async function onTheAdminPlatformTeamPage() {
  await expect(browser).toHaveTitle(
    'Platform Team | Core Delivery Platform - Portal'
  )
  await expect(await AdminPage.navIsActive()).toBe(true)
  await expect(await AdminTeamPage.subNavIsActive()).toBe(true)
  await expect(PageHeadingComponent.title('Platform')).toExist()
  await expect(PageHeadingComponent.caption('Team')).toExist()
}

async function onTheTestUsersPage() {
  await expect(browser).toHaveTitle('A Stub | Core Delivery Platform - Portal')
  await expect(await AdminPage.navIsActive()).toBe(true)
  await expect(await UsersPage.subNavIsActive()).toBe(true)
  await expect(PageHeadingComponent.caption('User')).toExist()
  await expect(PageHeadingComponent.title(mockUserName)).toExist()
}

async function searchAndSelectACdpUser() {
  await FormComponent.inputLabel('CDP users name or email').click()
  await browser.keys('test')

  const aadUserSearchResult = FormComponent.inputLabel(
    'A Stub - a.stub@test.co'
  )
  await expect(aadUserSearchResult).toExist()
  await aadUserSearchResult.click()

  await FormComponent.submitButton('Add').click()
}

describe('Users', () => {
  describe('When logged in as admin', () => {
    before(async () => {
      await LoginStubPage.loginAsAdmin()
      await AdminPage.open()
    })

    after(async () => {
      await LoginStubPage.logOut()
    })

    describe('When creating a new user', () => {
      it('Should be on the "Admin Users" list page', async () => {
        await onTheAdminUsersPage()
      })

      it('Should be able to go to the Create user flow', async () => {
        await PageHeadingComponent.cta('Create new user').click()

        await expect(browser).toHaveTitle(
          'Find DEFRA user | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UsersPage.subNavIsActive()).toBe(true)
        await expect(PageHeadingComponent.title('DEFRA user')).toExist()
        await expect(PageHeadingComponent.caption('Find')).toExist()
      })

      it('Should be able to find DEFRA AAD user', async () => {
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
        await expect(await UsersPage.subNavIsActive()).toBe(true)
        await expect(PageHeadingComponent.title('DEFRA GitHub User')).toExist()
        await expect(PageHeadingComponent.caption('Find')).toExist()
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
          'Add User Details | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UsersPage.subNavIsActive()).toBe(true)
        await expect(PageHeadingComponent.title('User Details')).toExist()
        await expect(PageHeadingComponent.caption('Add')).toExist()
      })

      it('Should be able to Skip to summary', async () => {
        await FormComponent.submitButton('Skip').click()
      })

      it('Should be on the User Summary page', async () => {
        await expect(browser).toHaveTitle(
          'Create User Summary | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UsersPage.subNavIsActive()).toBe(true)
        await expect(
          PageHeadingComponent.caption('Create User Summary')
        ).toExist()
        await expect(PageHeadingComponent.title(mockUserName)).toExist()
      })

      it('User Summary page Should contain expected details', async () => {
        await expect(
          await GovukSummaryListComponent.row('aad-user-email')
        ).toHaveText('a.stub@test.co')
        await expect(
          await GovukSummaryListComponent.row('aad-user-name')
        ).toHaveText(mockUserName)
        await expect(
          await GovukSummaryListComponent.row('github-user')
        ).toHaveText('@cdp-test-441241')

        await FormComponent.submitButton('Create').click()
      })

      it('Should be redirected to the "Admin Users" page', async () => {
        await onTheAdminUsersPage()

        await expect(EntityListComponent.content('A Stub')).toExist()
        await expect(EntityListComponent.content('a.stub@test.co')).toExist()
        await expect(EntityListComponent.content('@cdp-test-441241')).toExist()
      })
    })

    describe('When adding and removing a user from the Platform team', () => {
      it('Should be able to navigate to the "Admin Teams" page', async () => {
        await expect(await AdminPage.navIsActive()).toBe(true)
        await LinkComponent.link('app-subnav-link-teams', 'Teams').click()
      })

      it('Should be on the "Admin Teams" list page', async () => {
        await expect(browser).toHaveTitle(
          'Teams | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await AdminTeamPage.subNavIsActive()).toBe(true)
        await expect(PageHeadingComponent.title('Teams')).toExist()

        await expect(EntityListComponent.content('Platform')).toExist()
        await expect(EntityListComponent.content('@cdp-platform')).toExist()
      })

      it("Should be able to go to the Platform Team's page", async () => {
        await LinkComponent.link('app-entity-link', 'Platform').click()
        await onTheAdminPlatformTeamPage()
      })

      it('Should be able to add a user to the team', async () => {
        await LinkComponent.link(
          'admin-add-team-member',
          'Add member to team'
        ).click()

        await expect(browser).toHaveTitle(
          'Add Team Member | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await AdminTeamPage.subNavIsActive()).toBe(true)
        await expect(PageHeadingComponent.title('Platform')).toExist()
        await expect(
          PageHeadingComponent.caption('Add Member to Team')
        ).toExist()
      })

      it('Should be able to find CDP user', async () => {
        await searchAndSelectACdpUser()
      })

      it('Should be able to see the added user', async () => {
        await onTheAdminPlatformTeamPage()

        await expect(AdminTeamPage.teamMembers()).toHaveText(
          new RegExp(mockUserName, 'g')
        )
      })

      it('Clicking on the added user takes should go to user details page, showing the team', async () => {
        await LinkComponent.link('app-link', mockUserName).click()
        await onTheTestUsersPage()
        await expect(LinkComponent.link('app-link', 'Platform')).toExist()
      })

      it('Clicking on the team should take you to the Team page', async () => {
        await LinkComponent.link('app-link', 'Platform').click()
        await onTheAdminPlatformTeamPage()
      })

      it('Should be able to remove the user from the team', async () => {
        await expect(AdminTeamPage.teamMembers()).toHaveText(
          new RegExp(mockUserName, 'g')
        )
        await AdminTeamPage.removeButton(mockUserName).click()
      })

      it('Should be on the confirm remove member page', async () => {
        await expect(browser).toHaveTitle(
          'Remove Team Member | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await AdminTeamPage.subNavIsActive()).toBe(true)
        await expect(
          PageHeadingComponent.caption('Remove Member from Team')
        ).toExist()
        await expect(PageHeadingComponent.title('Platform')).toExist()

        await FormComponent.submitButton('Remove team member').click()
      })

      it('Member should have been removed', async () => {
        await onTheAdminPlatformTeamPage()

        await expect(
          HeadingComponent.banner('Member removed from team')
        ).toExist()

        await expect(AdminTeamPage.teamMembers()).not.toHaveText(
          new RegExp(mockUserName, 'g')
        )
      })
    })

    describe('When deleting a user', () => {
      it('Should be able to go to the Admin Users page', async () => {
        await LinkComponent.link('app-subnav-link-users', 'Users').click()
        await onTheAdminUsersPage()
      })

      it('Should be able to go to the User page', async () => {
        await LinkComponent.link('app-entity-link', mockUserName).click()
        await onTheTestUsersPage()
      })

      it('Should be able to go to the Delete user flow', async () => {
        await LinkComponent.link('admin-delete-user', 'Delete user').click()

        await expect(browser).toHaveTitle(
          'Confirm User Deletion | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UsersPage.subNavIsActive()).toBe(true)
        await expect(PageHeadingComponent.caption('Delete User')).toExist()
        await expect(PageHeadingComponent.title(mockUserName)).toExist()
      })

      it('Should be able to Delete the user', async () => {
        await FormComponent.submitButton('Delete user').click()
      })

      it('Should be on the "Admin Users" list page', async () => {
        await onTheAdminUsersPage()
      })

      it('Should not have deleted the user', async () => {
        await expect(EntityListComponent.content('A Stub')).not.toExist()
        await expect(
          EntityListComponent.content('a.stub@test.co')
        ).not.toExist()
        await expect(
          EntityListComponent.content('@cdp-test-441241')
        ).not.toExist()
      })
    })
  })
})
