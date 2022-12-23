(function (window) {
  let msg = 'www.xianzao.com';
  function getMsg() {
    return msg.toUpperCase();
  }
  window.dataService = { getMsg };
})(window);
