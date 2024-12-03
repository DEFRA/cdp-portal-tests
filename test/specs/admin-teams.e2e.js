import { browser, expect } from '@wdio/globals'

import PageHeadingComponent from 'components/page-heading.component'
import AdminPage from 'page-objects/admin.page'
import FormComponent from 'components/form.component'
import LinkComponent from 'components/link.component'
import EntityListComponent from 'components/entity-list.component'
import GovukSummaryListComponent from 'components/govuk-summary-list.component'
import LoginStubPage from 'page-objects/login-stub.page'
import AdminTeamsPage from 'page-objects/admin-teams.page'
import AdminTeamPage from 'page-objects/admin-team.page'

const mockTenantTeam = 'AnotherTenantTeam'

async function onTheAdminTeamsPage() {
  await expect(browser).toHaveTitle('Teams | Core Delivery Platform - Portal')
  await expect(await AdminPage.navIsActive()).toBe(true)
  await expect(await AdminTeamsPage.subNavIsActive()).toBe(true)
  await expect(PageHeadingComponent.title('Teams')).toExist()
}

async function onTheAnotherTenantTeamAdminPage() {
  await expect(browser).toHaveTitle(
    `${mockTenantTeam} Team | Core Delivery Platform - Portal`
  )
  await expect(await AdminPage.navIsActive()).toBe(true)
  await expect(await AdminTeamPage.subNavIsActive()).toBe(true)
  await expect(PageHeadingComponent.title(mockTenantTeam)).toExist()
  await expect(PageHeadingComponent.caption('Team')).toExist()
}

describe('Admin Teams', () => {
  before(async () => {
    await LoginStubPage.loginAsAdmin()
  })

  describe('When creating a new team', () => {
    it('Should be able to view the "Admin Teams" list page', async () => {
      await AdminTeamsPage.open()
      await onTheAdminTeamsPage()
    })

    it('Should be able to go to the Create team flow', async () => {
      await PageHeadingComponent.cta('Create new team').click()

      await expect(browser).toHaveTitle(
        'Create Team | Core Delivery Platform - Portal'
      )
      await expect(await AdminPage.navIsActive()).toBe(true)
      await expect(await AdminTeamsPage.subNavIsActive()).toBe(true)
      await expect(PageHeadingComponent.title('Create New')).toExist()
      await expect(PageHeadingComponent.caption('Team')).toExist()
    })

    it('Should be able to Create a team', async () => {
      await FormComponent.inputLabel('Team name').click()
      await browser.keys(mockTenantTeam)

      await FormComponent.submitButton('Next').click()
    })

    it('Should be on the Find GitHub team page', async () => {
      await expect(browser).toHaveTitle(
        'Find Defra GitHub Team | Core Delivery Platform - Portal'
      )
      await expect(await AdminPage.navIsActive()).toBe(true)
      await expect(await AdminTeamsPage.subNavIsActive()).toBe(true)
      await expect(PageHeadingComponent.title('DEFRA GitHub Team')).toExist()
      await expect(PageHeadingComponent.caption('Find')).toExist()
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
        'Create Team Summary | Core Delivery Platform - Portal'
      )
      await expect(await AdminPage.navIsActive()).toBe(true)
      await expect(await AdminTeamsPage.subNavIsActive()).toBe(true)
      await expect(PageHeadingComponent.title(mockTenantTeam)).toExist()
      await expect(
        PageHeadingComponent.caption('Create Team Summary')
      ).toExist()
    })

    it('Team Summary page should contain expected details', async () => {
      await expect(await GovukSummaryListComponent.row('name')).toHaveText(
        mockTenantTeam
      )
      await expect(
        await GovukSummaryListComponent.row('github-team')
      ).toHaveText('@cdp-test-1')

      await FormComponent.submitButton('Create').click()
    })

    it('Should be redirected to the "Admin Teams" page', async () => {
      await onTheAdminTeamsPage()

      await expect(EntityListComponent.content(mockTenantTeam)).toExist()
      await expect(EntityListComponent.content('@cdp-test-1')).toExist()
    })
  })

  describe('When deleting a team', () => {
    it('Should be able to go to the Admin Teams page', async () => {
      await LinkComponent.link('app-subnav-link-teams', 'Teams').click()
      await onTheAdminTeamsPage()
    })

    it('Should be able to go to the Team page', async () => {
      await LinkComponent.link('app-entity-link', mockTenantTeam).click()
      await onTheAnotherTenantTeamAdminPage()
    })

    it('Should be able to go to the Delete team flow', async () => {
      await LinkComponent.link('admin-delete-team', 'Delete team').click()

      await expect(browser).toHaveTitle(
        'Confirm Team Deletion | Core Delivery Platform - Portal'
      )
      await expect(await AdminPage.navIsActive()).toBe(true)
      await expect(await AdminTeamPage.subNavIsActive()).toBe(true)
      await expect(PageHeadingComponent.title(mockTenantTeam)).toExist()
      await expect(PageHeadingComponent.caption('Delete Team')).toExist()
    })

    it('Should be able to Delete the team', async () => {
      await FormComponent.submitButton('Delete team').click()
    })

    it('Should be on the "Admin Teams" list page', async () => {
      await onTheAdminTeamsPage()
    })

    it('Should have deleted the team', async () => {
      await expect(EntityListComponent.content(mockTenantTeam)).not.toExist()
    })
  })

  after(async () => {
    await LoginStubPage.logOut()
  })
})
