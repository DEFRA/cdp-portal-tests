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
    const listItem = $$('[data-testid="admin-team-members"] li').find(
      async (li) => {
        const textContent = await li.getText()

        return textContent.includes(name)
      }
    )

    return listItem.$('a[data-testid="app-link"]*=Remove')
  }
}

export default new AdminTeamPage()
