import { $ } from '@wdio/globals'

class EntityListComponent {
  entityLink(value) {
    return $(`[data-testid="app-entity-link"]${value ? `*=${value}` : ''}`)
  }
}

export default new EntityListComponent()
