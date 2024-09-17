import { $ } from '@wdio/globals'

/** appEntityList component */
class EntityListComponent {
  content(content) {
    return $('[data-testid="app-entity-list"]*=' + content)
  }

  entityLink(content) {
    return $('[data-testid="app-entity-link"]*=' + content)
  }
}

export default new EntityListComponent()
