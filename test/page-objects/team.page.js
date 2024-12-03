import { Page } from 'page-objects/page'
import SplitPaneComponent from 'components/split-pane.component'
import { $ } from '@wdio/globals'

class TeamPage extends Page {
  /**
   * Check if the user sub nav link is active
   * @returns {Promise<boolean>}
   */
  async subNavIsActive() {
    return await SplitPaneComponent.subNavIsActive('teams')
  }

  teamMember(content) {
    return $('[data-testid="team-member"]*=' + content)
  }

  removeButton(name) {
    const memberRow = $$('[data-testid="team-members"] tr').find(async (tr) => {
      const textContent = await tr.getText()

      return textContent.includes(name)
    })

    return memberRow.$('[data-testid="remove-member-button"]')
  }

  open(value) {
    return super.open('/teams/' + value)
  }
}

export default new TeamPage()
