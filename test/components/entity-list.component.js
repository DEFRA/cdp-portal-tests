import { $ } from '@wdio/globals'

/** appEntityList component */
class EntityListComponent {
  entityLink(content) {
    return $('[data-testid="app-entity-link"]*=' + content)
  }
}

export default new EntityListComponent()
