import { browser, expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import AdminPage from 'page-objects/admin.page'
import FormComponent from 'components/form.component'
import LinkComponent from 'components/link.component'
import EntityListComponent from 'components/entity-list.component'
import GovukSummaryListComponent from 'components/govuk-summary-list.component'
import LoginStubPage from 'page-objects/login-stub.page'
import AdminTeamsPage from 'page-objects/admin-teams.page'
import AdminTeamPage from 'page-objects/admin-team.page'

async function onTheAdminTeamsPage() {
  await expect(browser).toHaveTitle('Teams | Core Delivery Platform - Portal')
  await expect(await AdminPage.navIsActive()).toBe(true)
  await expect(await AdminTeamsPage.subNavIsActive()).toBe(true)
  await expect(HeadingComponent.title('Teams')).toExist()
}

async function onTheAnotherTenantTeamAdminPage() {
  await expect(browser).toHaveTitle(
    'AnotherTenantTeam | Core Delivery Platform - Portal'
  )
  await expect(await AdminPage.navIsActive()).toBe(true)
  await expect(await AdminTeamPage.subNavIsActive()).toBe(true)
  await expect(HeadingComponent.title('AnotherTenantTeam')).toExist()
  await expect(HeadingComponent.caption('Team details.')).toExist()
}
describe('Teams', () => {
  describe('When logged in as admin', () => {
    before(async () => {
      await LoginStubPage.loginAsAdmin()
    })

    describe('When creating a new team', () => {
      it('Should be able to view the "Admin Teams" list page', async () => {
        await AdminTeamsPage.open()
        await onTheAdminTeamsPage()
      })

      it('Should be able to go to the Create team flow', async () => {
        await LinkComponent.link('create-team-button', 'Create').click()

        await expect(browser).toHaveTitle(
          'Create team | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await AdminTeamsPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Create team')).toExist()
        await expect(
          HeadingComponent.caption('Create Core Delivery Platform team.')
        ).toExist()
      })

      it('Should be able to Create a team', async () => {
        await FormComponent.inputLabel('Team name').click()
        await browser.keys('AnotherTenantTeam')

        await FormComponent.submitButton('Next').click()
      })

      it('Should be on the Find GitHub team page', async () => {
        await expect(browser).toHaveTitle(
          'Find Defra GitHub Team | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await AdminTeamsPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Find Defra GitHub Team')).toExist()
        await expect(
          HeadingComponent.caption('Link the Defra GitHub team.')
        ).toExist()
      })

      it('Should be able to find GitHub team', async () => {
        await FormComponent.inputLabel('GitHub team').click()
        await browser.keys('test')

        const githubSearchResult = await FormComponent.inputLabel(
          'CDP Test 1 Team - @cdp-test-1'
        )
        await expect(githubSearchResult).toExist()
        await githubSearchResult.click()
        await FormComponent.submitButton('Next').click()
      })

      it('Should be on the Create team summary page', async () => {
        await expect(browser).toHaveTitle(
          'Create team summary | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await AdminTeamsPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Create team summary')).toExist()
        await expect(
          HeadingComponent.caption(
            'Information about the team you are going to create.'
          )
        ).toExist()
      })

      it('Team Summary page should contain expected details', async () => {
        await expect(await GovukSummaryListComponent.row('name')).toHaveText(
          'AnotherTenantTeam'
        )
        await expect(
          await GovukSummaryListComponent.row('github-team')
        ).toHaveText('@cdp-test-1')

        await FormComponent.submitButton('Create').click()
      })

      it('Should be redirected to the "Admin Teams" page', async () => {
        await onTheAdminTeamsPage()

        await expect(EntityListComponent.content('AnotherTenantTeam')).toExist()
        await expect(EntityListComponent.content('@cdp-test-1')).toExist()
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

    describe('When deleting a team', () => {
      it('Should be able to go to the Admin Teams page', async () => {
        await LinkComponent.link('app-subnav-link-teams', 'Teams').click()
        await onTheAdminTeamsPage()
      })

      it('Should be able to go to the Team page', async () => {
        await LinkComponent.link('app-entity-link', 'AnotherTenantTeam').click()
        await onTheAnotherTenantTeamAdminPage()
      })

      it('Should be able to go to the Delete team flow', async () => {
        await LinkComponent.link('delete-button', 'Delete').click()

        await expect(browser).toHaveTitle(
          'Confirm team deletion | Core Delivery Platform - Portal'
        )
        await expect(await AdminPage.navIsActive()).toBe(true)
        await expect(await AdminTeamPage.subNavIsActive()).toBe(true)
        await expect(HeadingComponent.title('Confirm team deletion')).toExist()
        await expect(
          HeadingComponent.caption(
            'Permanently delete team from the Core Delivery Platform.'
          )
        ).toExist()
      })

      it('Should be able to Delete the team', async () => {
        await FormComponent.submitButton('Delete').click()
      })

      it('Should be on the "Admin Teams" list page', async () => {
        await onTheAdminTeamsPage()
      })

      it('Should have deleted the team', async () => {
        await expect(HeadingComponent.title('AnotherTenantTeam')).not.toExist()
      })
    })
  })

  after(async () => {
    await LoginStubPage.logOut()
  })
})
