export default class ChatLoad {
  static isPlaced = false;
  static loadScript(isAuth = false) {
    if (!ChatLoad.isPlaced && process.env.REACT_APP_ENV === 'production') {
      let url;
      if (isAuth) {
        url = '//code.jivo.ru/widget/KEI7ejRTsy';
      } else {
        url = '//code.jivo.ru/widget/vOchfN9hba';
      }
      let script = document.querySelector(`script[src="${url}"]`);
      if (!script) {
        script = document.createElement("script");
        script.type = "application/javascript";
        script.src = url;
        script.async = true;
        document.body.appendChild(script);
      }
      ChatLoad.isPlaced = true;
    }
  }
}
//# sourceMappingURL=ChatLoad.js.map