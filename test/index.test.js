const localIpUrl = require('..');
const prepareUrls = require('../prepareUrls');

// console.log('IP:', localIpUrl());
// console.log('IP:', localIpUrl('public'));
// console.log('IP4:', localIpUrl('public', 'ipv4'));
// console.log('IP6:', localIpUrl('public', 'ipv6'));
// console.log('IP:', localIpUrl('private'));
// console.log('IP4:', localIpUrl('private', 'ipv4'));
// console.log('IP6:', localIpUrl('private', 'ipv6'));

// console.log('prepareUrls:', prepareUrls({
//   protocol: 'http',
//   host: '0.0.0.0',
//   port: '3000'
// }));

const REX_IPV6 = /^(((((?!::)[0-9a-fA-F]{1,4}::?(?!:)){0,7}|((?!::)[0-9a-fA-F]{1,4}:){7})((?!::)[0-9a-fA-F]{1,4})|([0-9a-fA-F]{1,4}::([0-9a-fA-F]{1,4}:){0,5})|(::([0-9a-fA-F]{1,4}:){0,6}))|(([0-9a-fA-F]{1,4}:){5}:([0-9a-fA-F]{1,4}))|([0-9a-fA-F]{1,4}:){6}((25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9])\.){3}(25[0-5]|(2[0-4]|1[0-9]|[1-9])?[0-9]))(\%[\w\d]+)?$/i

it('test case: localIpUrl() => 192.168.188.18', () => {
  expect(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(localIpUrl())).toBeTruthy()
})

it('test case: localIpUrl("public") => 192.168.188.18', () => {
  expect(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(localIpUrl('public'))).toBeTruthy()
})

it('test case: localIpUrl("public", "ipv4") => 192.168.188.18', () => {
  expect(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(localIpUrl('public'))).toBeTruthy()
})

it('test case: localIpUrl("public", "ipv6") => fe80::4c63:dcff:fe61:5668', () => {
  expect(REX_IPV6.test(localIpUrl('public', "ipv6"))).toBeTruthy()
})

it('test case: localIpUrl("private") => 127.0.0.1', () => {
  expect(localIpUrl('private')).toEqual('127.0.0.1')
})

it('test case: localIpUrl("private", "ipv4") => 127.0.0.1', () => {
  expect(localIpUrl('private', 'ipv4')).toEqual('127.0.0.1')
})

it('test case: localIpUrl("private", "ipv6") => fe80::1', () => {
  expect(REX_IPV6.test(localIpUrl('private', "ipv6"))).toBeTruthy()
})

it('test case: localIpUrl("private", "ipv6") => fe80::1', () => {
  const data = prepareUrls({
    protocol: 'http',
    host: '0.0.0.0',
    port: '3000'
  })
  expect(/^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/.test(data.ip)).toBeTruthy()
  expect(/^http:\/\/localhost:3000\//.test(data.localUrl)).toBeTruthy()
  expect(/^(?:https?:\/\/)?([\w.-]+)(?::(\d+))?\/?/i.test(data.localUrl)).toBeTruthy()
})
