export default class Url {
  static getCurrentUrl() {
    const sourceURL = window.location.href.replace(window.location.protocol + "//" + window.location.hostname, '').replace(':3000', '');
    const queryStringIndex = sourceURL.indexOf("?");
    let rtn = queryStringIndex !== -1 ? sourceURL.substring(0, queryStringIndex) : sourceURL;
    return rtn.replace('?', '');
  }
  static getParams() {
    const params = {};
    const searchParams = new URLSearchParams(window.location.search);
    for (const [key, value] of searchParams.entries()) {
      params[key] = value || true;
    }
    return params;
  }
  static getId() {
    const sourceURL = window.location.href.replace(window.location.protocol + "//" + window.location.hostname, '').replace(':3000', '');
    const parts = sourceURL.split('#');
    return parts.length > 1 ? parts[1] : null;
  }
  static getLangCode() {
    const sourceURL = window.location.href.replace(window.location.protocol + "//" + window.location.hostname, '').replace(':3000', '');
    const parts = sourceURL.split('/');
    return parts.length > 1 && parts[1].length === 2 ? parts[1] : 'ru';
  }
}
//# sourceMappingURL=Url.js.map