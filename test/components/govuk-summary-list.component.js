import { $ } from '@wdio/globals'

/**
 * govukSummaryList helper component
 */
class GovukSummaryListComponent {
  row(testId) {
    return $(`[data-testid="govuk-summary-list"] [data-testid="${testId}"]`)
  }
}

export default new GovukSummaryListComponent()
