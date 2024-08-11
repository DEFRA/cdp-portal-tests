# cdp-portal-tests

Cdp Portal test suite

- [Requirements](#requirements)
  - [Node.js](#nodejs)
- [Local development](#local-development)
  - [Setup](#setup)
  - [Debugging](#debugging)
    - [WebdriverIO Plugin](#webdriverio-plugin)
    - [Setup in IntelliJ](#setup-in-intellij)
    - [Debug environment variable](#debug-environment-variable)
    - [WebdriverIO debug command](#webdriverio-debug-command)
- [Test suite requirements](#test-suite-requirements)
  - [Running portal using cdp-local-environment](#running-portal-using-cdp-local-environment)
  - [Running portal using cdp-portal-stubs](#running-portal-using-cdp-portal-stubs)
  - [Running the test suite](#running-the-test-suite)
- [Best practices](#best-practices)
  - [Finding elements on a page](#finding-elements-on-a-page)
  - [Components](#components)
  - [Page objects](#page-objects)
  - [Spec files](#spec-files)
- [Licence](#licence)
  - [About the licence](#about-the-licence)

## Requirements

### Node.js

Please install [Node.js](http://nodejs.org/) `>= v20` and [npm](https://nodejs.org/) `>= v9`. You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
cd cdp-portal-tests
nvm use
```

## Local development

### Setup

Install application dependencies:

```bash
npm install
```

### Debugging

#### WebdriverIO Plugin

In IntelliJ and Webstorm use the [WebdriverIO Plugin](https://plugins.jetbrains.com/plugin/16147-webdriverio). This
provides full run, debug and breakpoint capabilities in your WebDriverIO tests.

#### Setup in IntelliJ/Webstorm

1. `Run -> Edit configurations`
1. `Edit configuration templates => WebdriverIO`
1. Add the following to the `WebdriverIO` configuration template:
   ![WebDriverIO template configuration](docs/webdriverio-plugin/webdriverio-template.png?raw=true)
1. Add a `tests/specs configuration`:
   ![WebDriverIO tests/specs configuration](docs/webdriverio-plugin/test-specs.png?raw=true)
1. You can now run and debug your tests in IntelliJ/Webstorm via your test files controls

#### Debug environment variable

You can also set the following env:

> This provides debug config in the [wdio.local.conf.js](./wdio.local.conf.js) file

```bash
DEBUG=true
```

Or use the npm script:

> This script automatically sets the debug environment variable

```bash
npm run test-local:debug
```

#### WebdriverIO debug command

Use the following command in code:

```javascript
browser.debug()
```

## Test suite requirements

- mongodb
- redis
- localstack
- [cdp-portal-stubs](https://github.com/defra/cdp-portal-stubs)
- cdp portal running and pointed at stubs/local services

### Running portal using cdp-local-environment

> Note there is currently a bug on macs where this does not work

The easiest way of setting this up:

- clone [cdp-local-environment](https://github.com/defra/cdp-local-environment)
- start the portal profile

```bash
$ docker compose --profile portal up
```

### Running portal using cdp-portal-stubs

You can also set up your local suite of Portal apps via [cdp-portal-stubs](https://github.com/defra/cdp-portal-stubs)

- clone [cdp-portal-stubs](https://github.com/defra/cdp-portal-stubs)
- start all the applications listed in the [README.md](https://github.com/defra/cdp-portal-stubs#setup)

### Running the test suite

To run the suite headless:

```bash
$ npm test
```

To run the test suite with a browser:

> This makes it much easier to debug

```bash
npm run test-local
```

## Best practices

- Keep these tests organised, clean and maintainable as this repository is likely to grow in size with the
  `cdp-portal-frontend`
- Test the `cdp-portal-frontend` as a user would use it
- Test the important flows, not too many, just enough to give you confidence. User Journey tests are expensive

> The more your tests resemble the way your software is used, the more confidence they can give you. - Kent C. Dodds
> <cite>[Testing Implementation Details](https://kentcdodds.com/blog/testing-implementation-details)</cite>

### Finding elements on a page

When writing tests, you can do a few things to make your life easier. Because pages and components will change and will
move around you should avoid finding elements via `css` or `xpath` selectors defined by their location.

For example.

- Find the second button in the grid on the right of the page

Compared to:

- Find the button with the data testid attribute `[data-testid="<name>"]` and the text `Save`

This then leads to the following best practices:

- Add helpers to the [component helpers](test/components) for a domain object/business concern, to interact with the
  page
- Find elements on the page by searching for `[data-testid="<name>"]*=Save` attributes on the elements and the text
  content of these elements
- If there is not a `data-testid` attribute, add one to the element in the `cdp-portal-frontend` and raise a PR

### Components

The [component helpers](test/components) are based on components found in the `cdp-portal-frontend`. There are also
other common helpers, for instance the the `FormComponent` which is used to interact with forms by finding elements
by html element and content.
These helpers provide simple methods to interact with the Portal frontend components.

### Page objects

The [page objects](test/page-objects) are based on the pages/domain objects found in the `cdp-portal-frontend`.

### Spec files

The [spec files](test/specs) are the flows/features found in the `cdp-portal-frontend`.

## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government licence v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
