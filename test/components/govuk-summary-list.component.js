import { $ } from '@wdio/globals'

/**
 * govukSummaryList helper component
 */
class GovukSummaryListComponent {
  content() {
    return $('[data-testid="govuk-summary-list"]')
  }

  row(testId) {
    return $(`[data-testid="govuk-summary-list"] [data-testid="${testId}"]`)
  }
}

export default new GovukSummaryListComponent()
