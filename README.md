# cdp-portal-tests

Core delivery platform Node.js Backend Template.

- [Requirements](#requirements)
  - [Node.js](#nodejs)
- [Local development](#local-development)
  - [Setup](#setup)
  - [Running the test suite](#running-the-test-suite)
- [Licence](#licence)
  - [About the licence](#about-the-licence)

## Requirements

### Node.js

Please install [Node.js](http://nodejs.org/) `>= v18` and [npm](https://nodejs.org/) `>= v9`. You will find it
easier to use the Node Version Manager [nvm](https://github.com/creationix/nvm)

To use the correct version of Node.js for this application, via nvm:

```bash
$ cd cdp-portal-tests
$ nvm use
```

## Local development

### Setup

Install application dependencies:

```bash
$ npm install
```

Download https://github.com/defra/cdp-local-environment and start the portal profile

```bash
$ docker compose --profile portal up
```

### Running the test suite

```bash
$ npm test
```


## Licence

THIS INFORMATION IS LICENSED UNDER THE CONDITIONS OF THE OPEN GOVERNMENT LICENCE found at:

<http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3>

The following attribution statement MUST be cited in your products and applications when using this information.

> Contains public sector information licensed under the Open Government license v3

### About the licence

The Open Government Licence (OGL) was developed by the Controller of Her Majesty's Stationery Office (HMSO) to enable
information providers in the public sector to license the use and re-use of their information under a common open
licence.

It is designed to encourage use and re-use of information freely and flexibly, with only a few conditions.
