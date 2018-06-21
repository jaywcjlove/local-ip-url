const localIpUrl = require('../');
const prepareUrls = require('../prepareUrls');

console.log('IP:', localIpUrl());
console.log('IP:', localIpUrl('public'));
console.log('IP4:', localIpUrl('public', 'ipv4'));
console.log('IP6:', localIpUrl('public', 'ipv6'));
console.log('IP:', localIpUrl('private'));
console.log('IP4:', localIpUrl('private', 'ipv4'));
console.log('IP6:', localIpUrl('private', 'ipv6'));

console.log('prepareUrls:', prepareUrls({
  protocol: 'http',
  host: '0.0.0.0',
  port: '3000'
}));
