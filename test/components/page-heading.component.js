import { $ } from '@wdio/globals'

/** appPageHeading component */
class PageHeadingComponent {
  title(content) {
    return $('[data-testid="app-page-heading-title"]*=' + content)
  }

  caption(content) {
    return $(
      '[data-testid="app-page-heading-caption"]' +
        (content ? '*=' + content : '')
    )
  }

  cta(content) {
    return $('[data-testid="app-page-heading-cta"]*=' + content)
  }
}

export default new PageHeadingComponent()
