define(function () {
  let msg = 'www.xianzao.com';
  function getMsg() {
    return msg.toUpperCase();
  }
  return { getMsg }; // 暴露模块
});
