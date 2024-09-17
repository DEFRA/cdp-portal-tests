import { $ } from '@wdio/globals'

/**
 * Link helper component
 */
class LinkComponent {
  /**
   * @param {string }testId
   * @param {string }content
   * @returns {*}
   */
  link(testId, content) {
    return $(`a[data-testid="${testId}"]*=` + content)
  }
}

export default new LinkComponent()
