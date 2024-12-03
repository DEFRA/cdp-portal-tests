import { Page } from 'page-objects/page'
import SplitPaneComponent from 'components/split-pane.component'
import { $ } from '@wdio/globals'

class AdminTeamPage extends Page {
  /**
   * Check if the user sub nav link is active
   * @returns {Promise<boolean>}
   */
  async subNavIsActive() {
    return await SplitPaneComponent.subNavIsActive('teams')
  }

  teamMembers() {
    return $('[data-testid="admin-team-members"]')
  }

  removeButton(name) {
    const adminMemberRow = $$('[data-testid="admin-team-members"] tr').find(
      async (tr) => {
        const textContent = await tr.getText()

        return textContent.includes(name)
      }
    )

    return adminMemberRow.$('[data-testid="admin-remove-member-button"]')
  }

  open(value) {}
}

export default new AdminTeamPage()
