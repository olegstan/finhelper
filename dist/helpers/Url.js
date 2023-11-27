export default class Url {
  static getCurrentUrl() {
    var sourceURL = window.location.href.replace(window.location.protocol + "//" + window.location.hostname, '');
    sourceURL = sourceURL.replace(':3000', '');
    var rtn = sourceURL.split("?")[0],
      // param,
      params_arr = [],
      queryString = sourceURL.indexOf("?") !== -1 ? sourceURL.split("?")[1] : "";
    if (queryString !== "") {
      params_arr = queryString.split("&");
      for (var i = params_arr.length - 1; i >= 0; i -= 1) {
        // param = params_arr[i].split("=")[0];
        params_arr.splice(i, 1);
      }
      rtn = rtn + "?" + params_arr.join("&");
    }
    return rtn.replace('?', '');
  }
  static getParams() {
    var params = {};
    if (window.location.search) {
      var parts = window.location.search.substring(1).split('&');
      for (var i = 0; i < parts.length; i++) {
        var nv = parts[i].split('=');
        if (!nv[0]) continue;
        params[nv[0]] = nv[1] || true;
      }
    }
    return params;
  }
  static getId() {
    var sourceURL = window.location.href.replace(window.location.protocol + "//" + window.location.hostname, '');
    sourceURL = sourceURL.replace(':3000', '');
    var rtn = sourceURL.split("?")[0];
    var parts = rtn.split('#');
    if (parts.length > 0) {
      return parts[1];
    }
    return null;
  }
  static getLangCode() {
    let sourceURL = window.location.href.replace(window.location.protocol + "//" + window.location.hostname, '');
    sourceURL = sourceURL.replace(':3000', '');
    let parts = sourceURL.split('/');
    if (parts.length > 1 && parts[1].length === 2) {
      return parts[1];
    } else {
      return 'ru';
    }
  }
}