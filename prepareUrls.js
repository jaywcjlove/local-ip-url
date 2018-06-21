const address = require('./')();
const url = require('url');

module.exports = function prepareUrls(option = {}) {
  const { protocol, host, port } = option;
  const formatUrl = hostname =>
    url.format({
      protocol,
      hostname,
      port,
      pathname: '/',
    });
  const isUnspecifiedHost = host === '0.0.0.0' || host === '::';
  const prettyHost = isUnspecifiedHost ? 'localhost' : host;
  const localUrl = formatUrl(prettyHost);
  const lanUrl = formatUrl(address);

  return {
    ip: address,
    localUrl,
    lanUrl,
  }
}