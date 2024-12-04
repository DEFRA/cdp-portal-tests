import { expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import TabsComponent from 'components/tabs.component'
import SplitPaneComponent from 'components/split-pane.component'
import ServicesPage from 'page-objects/services.page'
import SecretsPage from '~/test/page-objects/secrets.page'
import ErrorPage from 'page-objects/error.page'
import LoginStubPage from 'page-objects/login-stub.page'

const tenantService = 'cdp-portal-frontend'

describe('Secrets feature', () => {
  describe('When not logged in', () => {
    before(async () => {
      await ServicesPage.open(`/${tenantService}`)
      await expect(ServicesPage.logInLink()).toHaveText('Sign in')
    })

    it('Should not be a tab on a "Service" page', async () => {
      await expect(await ServicesPage.navIsActive()).toBe(true)
      await expect(ServicesPage.pageHeading()).toHaveText(tenantService)
      await expect(TabsComponent.secondTab()).not.toExist()
    })

    it('Should not be able to browse to "Secrets" page', async () => {
      await SecretsPage.open(tenantService)
      await expect(ErrorPage.title('401')).toExist()
      await expect(ErrorPage.message()).toHaveText('Unauthorized')
    })
  })

  describe('When logged in as admin user', () => {
    before(async () => {
      await LoginStubPage.loginAsAdmin()
      await ServicesPage.open(`/${tenantService}`)
      await expect(await ServicesPage.logOutLink()).toHaveText('Sign out')
    })

    it('Should be a tab on a "Service" page', async () => {
      await expect(await ServicesPage.navIsActive()).toBe(true)
      await expect(ServicesPage.pageHeading()).toHaveText(tenantService)
      await expect(
        HeadingComponent.caption(
          'Information about the cdp-portal-frontend microservice.'
        )
      ).toExist()

      await expect(TabsComponent.activeTab()).toHaveText('About')
      await expect(TabsComponent.secondTab()).toHaveText('Secrets')
    })

    describe('When navigating to Secrets overview page', () => {
      it('Should be able to go direct to "Secrets" overview', async () => {
        await SecretsPage.open(tenantService)
        await expect(SecretsPage.pageHeading()).toHaveText(tenantService)
        await expect(TabsComponent.activeTab()).toHaveText('Secrets')
      })

      it('Should be an overview page of all secrets page', async () => {
        await ServicesPage.open(`/${tenantService}`)
        await expect(await TabsComponent.secondTab()).toHaveText('Secrets')
        await TabsComponent.secondTab().click()
        await expect(await SecretsPage.pageHeading()).toHaveText(tenantService)
        await expect(TabsComponent.activeTab()).toHaveText('Secrets')
      })
    })

    describe('When going to an Environment Secrets page', () => {
      it('Should be a page of that environments secrets', async () => {
        await SecretsPage.open(tenantService, 'management')
        await expect(SecretsPage.environmentHeader()).toHaveText(
          'Management secrets'
        )
        await expect(
          await SplitPaneComponent.subNavIsActive('management')
        ).toBe(true)
      })

      it('Should be navigable via sidebar to environment secrets', async () => {
        await SecretsPage.open(tenantService)
        await expect(await ServicesPage.navIsActive()).toBe(true)
        await expect(await SplitPaneComponent.subNavIsActive('all')).toBe(true)
        await SplitPaneComponent.subNavItemLink('management').click()
        await expect(SecretsPage.environmentHeader()).toHaveText(
          'Management secrets'
        )
        await expect(
          await SplitPaneComponent.subNavIsActive('management')
        ).toBe(true)
      })
    })

    describe('When creating a new secret', () => {
      before(async () => {
        await SecretsPage.open(tenantService, 'management')
      })
      const suffix = (Math.random() + 1).toString(36).substring(7).toUpperCase()
      const keyName = `TEST_${suffix}`

      it('Should be listed as available secret', async () => {
        await SecretsPage.createSecretName().setValue(keyName)
        await SecretsPage.createSecretValue().setValue('test-value')
        await SecretsPage.createSecretButton().click()

        await expect(await SecretsPage.secretCell(keyName)).toExist()
      })
    })

    describe('When updating a secret', () => {
      const suffix = (Math.random() + 1).toString(36).substring(7).toUpperCase()
      let keyName

      before(async () => {
        keyName = `TEST_${suffix}`

        // Create a secret to test against
        await SecretsPage.open(tenantService, 'management')
        await SecretsPage.createSecretName().setValue(keyName)
        await SecretsPage.createSecretValue().setValue('test-value')
        await SecretsPage.createSecretButton().click()

        await expect(SecretsPage.secretCell(keyName)).toExist()
      })

      it('Should be listed as updated secrets', async () => {
        await SecretsPage.secretAction(keyName).click()
        await SecretsPage.updateHeader().waitForExist()
        await SecretsPage.updateSecretValue().setValue('test-updated-value')
        await SecretsPage.updateSecretButton().click()

        await expect(await SecretsPage.secretCell(keyName)).toExist()
        await expect(await SecretsPage.secretActionCell(keyName)).toExist()
        await expect(
          await SecretsPage.secretStatus(keyName, 'Secret available')
        ).toExist()
      })
    })
  })
})
