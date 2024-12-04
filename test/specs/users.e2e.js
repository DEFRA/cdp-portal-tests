import { browser, expect } from '@wdio/globals'

import { createUser, deleteUser } from '~/test/helpers/create-user'
import HeadingComponent from 'components/heading.component'
import FormComponent from 'components/form.component'
import LinkComponent from 'components/link.component'
import LoginStubPage from 'page-objects/login-stub.page'
import TeamPage from 'page-objects/team.page'

const mockUserName = 'A Stub'

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
  describe('When logged in as non-admin', () => {
    before(async () => {
      await createUser('test')
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
      })

      it('Should see the user and be able to remove them', async () => {
        await expect(TeamPage.teamMember(mockUserName)).toExist()
        await TeamPage.removeButton(mockUserName).click()

        await expect(browser).toHaveTitle(
          'TenantTeam1 team | Core Delivery Platform - Portal'
        )
        await expect(HeadingComponent.title('TenantTeam1')).toExist()

        await expect(
          HeadingComponent.banner('Member removed from team')
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
      await deleteUser('A Stub')
    })
  })
})
