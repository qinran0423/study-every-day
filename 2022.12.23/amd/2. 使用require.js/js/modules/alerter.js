// 定义有依赖的模块
define(['dataService'], function (dataService) {
  let name = 'xianzao';
  function showMsg() {
    alert(dataService.getMsg() + ', ' + name);
  }
  // 暴露模块
  return { showMsg };
});

// 引入第三方库
// define(['dataService', 'jquery'], function (dataService, $) {
//   let name = 'xianzao';
//   function showMsg() {
//     alert(dataService.getMsg() + ', ' + name);
//   }
//   $('body').css('background', 'green');
//   // 暴露模块
//   return { showMsg };
// });
