import { browser, expect } from '@wdio/globals'

import HeadingComponent from 'components/heading.component'
import TabsComponent from 'components/tabs.component'
import SplitPaneComponent from 'components/split-pane.component'
import TableComponent from 'components/table.component'
import TenantServicePage from 'page-objects/tenant-service.page'
import SecretsOverviewPage from 'page-objects/secrets-overview.page'
import SecretsEnvironmentPage from 'page-objects/secrets-environment.page'
import ErrorPage from 'page-objects/error.page'

const tenantService = 'cdp-portal-frontend'

describe('Secrets feature', () => {
  describe('When not logged in', () => {
    before(async () => {
      await TenantServicePage.open(tenantService)
      await expect(TenantServicePage.logInLink()).toHaveText('Sign in')
    })

    it('Should not be a tab on a "Service" page', async () => {
      await expect(await TenantServicePage.navIsActive()).toBe(true)
      await expect(TenantServicePage.pageHeading()).toHaveText(tenantService)
      await expect(TabsComponent.secondTab()).not.toExist()
    })

    it('Should not be a able to browse to "Secrets" page', async () => {
      await SecretsOverviewPage.open(tenantService)
      await expect(ErrorPage.title('401')).toExist()
      await expect(ErrorPage.message()).toHaveText('Unauthorized')
    })
  })

  describe('When logged in', () => {
    before(async () => {
      await TenantServicePage.logIn()
      await TenantServicePage.open(tenantService)
      await expect(TenantServicePage.logOutLink()).toHaveText('Sign out')
    })

    it('Should be a tab on a "Service" page', async () => {
      await expect(await TenantServicePage.navIsActive()).toBe(true)
      await expect(TenantServicePage.pageHeading()).toHaveText(tenantService)
      await expect(
        HeadingComponent.caption(
          'Information about the cdp-portal-frontend microservice.'
        )
      ).toExist()

      await expect(TabsComponent.activeTab()).toHaveText('About')
      await expect(TabsComponent.secondTab()).toHaveText('Secrets')
    })

    describe('And when navigating to Secrets overview page', () => {
      it('Should be a able to go direct to "Secrets" overview', async () => {
        await SecretsOverviewPage.open(tenantService)
        await expect(SecretsOverviewPage.pageHeading()).toHaveText(
          tenantService
        )
        await expect(TabsComponent.activeTab()).toHaveText('Secrets')
      })

      it('Should be a overview page of all secrets page', async () => {
        await TenantServicePage.open(tenantService)
        await expect(TabsComponent.secondTab()).toHaveText('Secrets')
        await TabsComponent.secondTab().click()
        await expect(SecretsOverviewPage.pageHeading()).toHaveText(
          tenantService
        )
        await expect(TabsComponent.activeTab()).toHaveText('Secrets')
      })
    })

    describe('And when going to an Environment Secrets page', () => {
      before(async () => {
        await SecretsEnvironmentPage.open(tenantService, 'management')
      })

      it('Should be a page of that environments secrets', async () => {
        await expect(SecretsEnvironmentPage.environmentHeader()).toHaveText(
          'Management secrets'
        )
        await expect(SplitPaneComponent.subNavIsActive('management')).toBe(true)
      })

      it('Should be a navigable via sidebar to environment secrets', async () => {
        await SecretsOverviewPage.open(tenantService)
        await SplitPaneComponent.navItem('management').click()
        await expect(SecretsEnvironmentPage.environmentHeader()).toHaveText(
          'Management secrets'
        )
        await expect(SplitPaneComponent.subNavIsActive('management')).toBe(true)
      })

      describe('And when creating a new secret', () => {
        before(async () => {
          await SecretsEnvironmentPage.open(tenantService, 'management')
        })

        it('Should be a not be listed already', async () => {
          TableComponent.rows().then(async (cells) => {
            cells.forEach(async (cell) => {
              await expect(cell).not.toHaveText('TEST')
            })
          })
        })

        it('Should be a be listed as available secrets', async () => {
          await SecretsEnvironmentPage.createSecretName().setValue('TEST')
          await SecretsEnvironmentPage.createSecretValue().setValue(
            'test-value'
          )
          await SecretsEnvironmentPage.createSecretButton().click()
          TableComponent.rows().then(async (cells) => {
            cells.forEach(async (cell) => {
              await expect(cell).toHaveText('TEST')
            })
          })
        })
      })

      describe('And when updating an existing secret', () => {
        it('Should be a be listed as updated secrets', async () => {
          //  pending('Not implemented')
        })
      })
    })
  })
})
