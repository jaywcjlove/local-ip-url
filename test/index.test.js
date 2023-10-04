const os = require('os');
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

describe('localIpUrl', () => {
  const mockNetworkInterfaces = {
    eth0: [
      { family: 'IPv4', address: '192.168.0.10' },
      { family: 'IPv6', address: 'fe80::1' },
    ],
    wlan0: [
      { family: 'IPv4', address: '192.168.1.10' },
      { family: 'IPv6', address: '::1' },
    ],
  };

  beforeEach(() => {
    jest.spyOn(os, 'networkInterfaces').mockReturnValue(mockNetworkInterfaces);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should return default IPv4 loopback address when no name and family are provided', () => {
    const result = localIpUrl();
    expect(result).toBe('192.168.0.10');
  });

  it('should return IPv4 address of the specified network interface', () => {
    const result = localIpUrl('eth0');
    expect(result).toBe('192.168.0.10');
  });

  it('should return IPv6 address of the specified network interface', () => {
    const result = localIpUrl('wlan0', 'ipv6');
    expect(result).toBe('::1');
  });

  it('should return the first public IPv4 address', () => {
    const result = localIpUrl('public');
    expect(result).toBe('192.168.0.10');
  });

  it('should return the first private IPv6 address', () => {
    const result = localIpUrl('private', 'ipv6');
    expect(result).toBe('fe80::1');
  });

  it('should throw an error when an invalid family is provided', () => {
    expect(() => {
      localIpUrl('private', 'invalid');
    }).toThrow('family must be ipv4 or ipv6');
  });
});