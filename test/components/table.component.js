import { $ } from '@wdio/globals'

/**
 * Table helper component
 */
class TableComponent {
  rows() {
    return $('#main-content .govuk-table').$$('tr')
  }

  row(rowNumber) {
    return this.rows()[rowNumber]
  }

  rowCell(rowNumber, cellNumber) {
    return this.row(rowNumber).$$('td')[cellNumber]
  }
}

export default new TableComponent()
