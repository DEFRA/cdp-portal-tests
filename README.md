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

- mongodb
- redis
- localstack
- cdp-portal-stubs
- cdp portal running and pointed at stubs/local services

The easiest way of setting this up would be to clone [https://github.com/defra/cdp-local-environment](cdp-local-environment) and start the portal profile

```bash
$ docker compose --profile portal up
```

### Running the test suite

```bash
$ npm test
```

or

```bash
npm run test-local
```
to run it with the browser visible, which is useful for debugging.

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
