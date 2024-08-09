import { $ } from '@wdio/globals'

/** appBanner component */
class BannerComponent {
  content(content) {
    return $('[data-testid="app-banner-content"]*=' + content)
  }
}

export default new BannerComponent()
