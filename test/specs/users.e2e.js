import { browser, expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import AdminPage from 'page-objects/admin.page'
import UsersPage from 'page-objects/users.page'
import FormComponent from 'components/form.component'
import LinkComponent from 'components/link.component'
import EntityListComponent from 'components/entity-list.component'
import GovukSummaryListComponent from 'components/govuk-summary-list.component'
import LoginStubPage from 'page-objects/login-stub.page'
import AdminTeamPage from 'page-objects/admin-team.page'
import TeamPage from 'page-objects/team.page'

async function onTheAdminUsersPage() {
  await expect(browser).toHaveTitle('Users | Core Delivery Platform - Portal')
  await expect(await AdminPage.navIsActive()).toBe(true)
  await expect(await UsersPage.subNavIsActive()).toBe(true)
  await expect(HeadingComponent.title('Users')).toExist()
  await expect(
    HeadingComponent.caption('Core Delivery Platform users.')
  ).toExist()
}

async function onThePlatformTeamPage() {
  await expect(browser).toHaveTitle(
    'Platform | Core Delivery Platform - Portal'
  )
  await expect(await AdminPage.navIsActive()).toBe(true)
  await expect(await AdminTeamPage.subNavIsActive()).toBe(true)
  await expect(HeadingComponent.title('Platform')).toExist()
  await expect(HeadingComponent.caption('Team details.')).toExist()
}

async function onTheTestUsersPage() {
  await expect(browser).toHaveTitle('A Stub | Core Delivery Platform - Portal')
  await expect(await AdminPage.navIsActive()).toBe(true)
  await expect(await UsersPage.subNavIsActive()).toBe(true)
  await expect(HeadingComponent.title('A Stub')).toExist()
  await expect(HeadingComponent.caption('User details.')).toExist()
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

    describe('When creating a new user', () => {
      it('Should be on the "Admin Users" list page', async () => {
        await onTheAdminUsersPage()
      })

      it('Should be able to go to the Create user flow', async () => {
        await LinkComponent.link('create-user-button', 'Create').click()

        await expect(browser).toHaveTitle(
          'Find AAD user | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UsersPage.subNavIsActive()).toBe(true)
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
        await expect(await UsersPage.subNavIsActive()).toBe(true)
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
        await expect(await UsersPage.subNavIsActive()).toBe(true)
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
        await expect(await UsersPage.subNavIsActive()).toBe(true)
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
        await expect(HeadingComponent.title('Teams')).toExist()

        await expect(EntityListComponent.content('Platform')).toExist()
        await expect(EntityListComponent.content('@cdp-platform')).toExist()
      })

      it("Should be able to go to the Platform Team's page", async () => {
        await LinkComponent.link('app-entity-link', 'Platform').click()
        await onThePlatformTeamPage()
      })

      it('Should be able to add a user to the team', async () => {
        await LinkComponent.link('add-button', 'Add').click()

        await expect(browser).toHaveTitle(
          'Add team members | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await AdminTeamPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Add team members')).toExist()
        await expect(
          HeadingComponent.caption('Search for Core Delivery Platform user.')
        ).toExist()
      })

      it('Should be able to find CDP user', async () => {
        await searchAndSelectACdpUser()
      })

      it('Should be able to see the added user', async () => {
        await onThePlatformTeamPage()

        await expect(AdminTeamPage.memberLink('A Stub')).toExist()
      })

      it('Clicking on the added user takes should go to user details page, showing the team', async () => {
        await LinkComponent.link('app-member-link', 'A Stub').click()
        await onTheTestUsersPage()
        await expect(
          LinkComponent.link('app-entity-link', 'Platform')
        ).toExist()
      })

      it('Clicking on the team should take you to the Team page', async () => {
        await LinkComponent.link('app-entity-link', 'Platform').click()
        await onThePlatformTeamPage()
      })

      it('Should be able to remove the user from the team', async () => {
        await FormComponent.submitButtonWithTestId(
          'Remove',
          'remove-member-buttonAStub'
        ).click()
        await onThePlatformTeamPage()

        await expect(
          HeadingComponent.content('Member removed from team')
        ).toExist()
      })
    })

    after(async () => {
      await LoginStubPage.logOut()
    })
  })

  describe('When logged in as non-admin', () => {
    before(async () => {
      await LoginStubPage.loginAsNonAdmin()
    })

    describe('When adding and removing a user from a team they are a member of', () => {
      it('Should be able to go to the Teams page', async () => {
        await LinkComponent.link('nav-teams', 'Teams').click()
        await expect(browser).toHaveTitle(
          'Teams | Core Delivery Platform - Portal'
        )
        await expect(HeadingComponent.title('Teams')).toExist()
      })

      it('Should be able to go to the TenantTeam1 page and see the buttons', async () => {
        await LinkComponent.link('app-entity-link', 'TenantTeam1').click()

        await expect(browser).toHaveTitle(
          'TenantTeam1 team | Core Delivery Platform - Portal'
        )
        await expect(HeadingComponent.title('TenantTeam1')).toExist()

        await expect(LinkComponent.link('add-button', 'Add')).toExist()
        await expect(LinkComponent.link('edit-button', 'Edit')).toExist()
      })

      it('Should be able to add a user to the team', async () => {
        await LinkComponent.link('add-button', 'Add').click()
        await expect(browser).toHaveTitle(
          'Add team members | Core Delivery Platform - Portal'
        )
        await searchAndSelectACdpUser()
        await expect(HeadingComponent.title('TenantTeam1')).toExist()
      })

      it('Should see the user and be able to remove them', async () => {
        await expect(TeamPage.memberItem('A Stub')).toExist()
        await FormComponent.submitButtonWithTestId(
          'Remove',
          'remove-member-buttonAStub'
        ).click()

        await expect(browser).toHaveTitle(
          'TenantTeam1 team | Core Delivery Platform - Portal'
        )
        await expect(HeadingComponent.title('TenantTeam1')).toExist()

        await expect(
          HeadingComponent.content('Member removed from team')
        ).toExist()
      })
    })

    describe('When viewing a team they are NOT a member of', () => {
      it('Should be able to go to the Teams page', async () => {
        await LinkComponent.link('nav-teams', 'Teams').click()
        await expect(browser).toHaveTitle(
          'Teams | Core Delivery Platform - Portal'
        )
        await expect(HeadingComponent.title('Teams')).toExist()
      })

      it('Should be able to go to the Platform page but NOT see the buttons', async () => {
        await LinkComponent.link('app-entity-link', 'Platform').click()

        await expect(browser).toHaveTitle(
          'Platform team | Core Delivery Platform - Portal'
        )
        await expect(HeadingComponent.title('Platform')).toExist()

        await expect(LinkComponent.link('add-button', 'Add')).not.toExist()
        await expect(LinkComponent.link('edit-button', 'Edit')).not.toExist()
      })
    })

    after(async () => {
      await LoginStubPage.logOut()
    })
  })

  describe('When logged in again as admin', () => {
    before(async () => {
      await LoginStubPage.loginAsAdmin()
      await AdminPage.open()
    })

    describe('When deleting a user', () => {
      it('Should be able to go to the Admin Users page', async () => {
        await LinkComponent.link('app-subnav-link-users', 'Users').click()
        await onTheAdminUsersPage()
      })

      it('Should be able to go to the User page', async () => {
        await LinkComponent.link('app-entity-link', 'A Stub').click()
        await onTheTestUsersPage()
      })

      it('Should be able to go to the Delete user flow', async () => {
        await LinkComponent.link('delete-user-button', 'Delete').click()

        await expect(browser).toHaveTitle(
          'Confirm user deletion | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await UsersPage.subNavIsActive()).toBe(true)
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
        await onTheAdminUsersPage()
      })

      it('Should have deleted the user', async () => {
        await expect(HeadingComponent.title('A Stub')).not.toExist()
        await expect(HeadingComponent.caption('User details.')).not.toExist()
      })
    })
  })
})
