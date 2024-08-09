import { $ } from '@wdio/globals'

/** appHeading component */
class HeadingComponent {
  content(content) {
    return $('[data-testid="app-banner-content"]*=' + content)
  }

  title(content) {
    return $('[data-testid="app-heading-title"]*=' + content)
  }

  caption(content) {
    return $('[data-testid="app-heading-caption"]*=' + content)
  }
}

export default new HeadingComponent()
