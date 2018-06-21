local-ip-url
---

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

## License

MIT