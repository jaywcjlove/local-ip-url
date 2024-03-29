local-ip-url
===

[![Buy me a coffee](https://img.shields.io/badge/Buy%20me%20a%20coffee-048754?logo=buymeacoffee)](https://jaywcjlove.github.io/#/sponsor)
![](http://jaywcjlove.github.io/sb/status/no-dependencies.svg)
[![Coverage Status](https://jaywcjlove.github.io/local-ip-url/badges.svg)](https://jaywcjlove.github.io/local-ip-url/lcov-report/)
[![](https://img.shields.io/github/forks/react-doc/local-ip-url.svg)](https://github.com/react-doc/local-ip-url/network)
[![](https://img.shields.io/github/stars/react-doc/local-ip-url.svg)](https://github.com/react-doc/local-ip-url/stargazers)
[![](https://img.shields.io/github/release/react-doc/local-ip-url.svg)](https://github.com/react-doc/local-ip-url/releases)
[![NPM version](https://img.shields.io/npm/v/local-ip-url.svg?style=flat)](https://npmjs.org/package/local-ip-url)

Get current machine IP.

## Install

```bash
npm install local-ip-url --save-dev
```

## Usage

```js
const localIpUrl = require('local-ip-url');
localIpUrl() // => 192.168.31.69
localIpUrl('public') // => 192.168.31.69
localIpUrl('public', 'ipv4') // => 192.168.31.69
localIpUrl('public', 'ipv6') // => fe80::c434:2eff:fe06:f90
localIpUrl('private') // => 127.0.0.1
localIpUrl('private', 'ipv4') // => 127.0.0.1
localIpUrl('private', 'ipv6') // => fe80::1
```

```js
const prepareUrls = require('local-ip-url/prepareUrls');

prepareUrls({
  protocol: 'http',
  host: '0.0.0.0',
  port: 3001
});

// ===output==>
// {
//   ip: '192.168.31.69',
//   localUrl: 'http://localhost:3001/',
//   lanUrl: 'http://192.168.31.69:3001/'
// }
```

## Contributors

As always, thanks to our amazing contributors!

<a href="https://github.com/jaywcjlove/local-ip-url/graphs/contributors">
  <img src="https://uiwjs.github.io/copy-to-clipboard/CONTRIBUTORS.svg" />
</a>

Made with [contributors](https://github.com/jaywcjlove/github-action-contributors).

## License

MIT
