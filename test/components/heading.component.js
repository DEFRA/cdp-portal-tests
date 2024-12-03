import { $ } from '@wdio/globals'

/**  @deprecated appHeading component */
class HeadingComponent {
  content(content) {
    return $('[data-testid="app-banner-content"]*=' + content)
  }

  title(content) {
    return $('[data-testid="app-heading-title"]*=' + content)
  }

  caption(content) {
    return $(
      '[data-testid="app-heading-caption"]' + (content ? '*=' + content : '')
    )
  }
}

export default new HeadingComponent()
