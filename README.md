# cdp-portal-tests

Cdp Portal test suite

- [cdp-portal-tests](#cdp-portal-tests)
  - [Requirements](#requirements)
    - [Node.js](#nodejs)
  - [Local development](#local-development)
    - [Setup](#setup)
    - [Debugging](#debugging)
  - [Test suite requirements](#test-suite-requirements)
    - [Running portal using cdp-local-environment](#running-portal-using-cdp-local-environment)
    - [Running portal using cdp-portal-stubs](#running-portal-using-cdp-portal-stubs)
    - [Running the test suite](#running-the-test-suite)
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

In IntelliJ and Webstorm use the [WebdriverIO Plugin](https://plugins.jetbrains.com/plugin/16147-webdriverio).
If you are using Intellij you will also have full debug and breakpoint capabilities in your tests

You can also set the following env:

> This provides debug config in the [wdio.local.conf.js](./wdio.local.conf.js) file

```bash
DEBUG=true
```

Use the following command in code:

```javascript
browser.debug()
```

Or use the npm script:

```bash
npm run test-local:debug
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
