// 设置层级关系
// function dotSum() {
//     var routerPath = window.location.pathname.match(/\//g)
//     var dots = ""
//     var pathLength = routerPath.length; //线上
//     // var pathLength = routerPath.length - 1;  //本地测试
//     if (pathLength === 1) {
//         dots = dots + "./"
//     } else {
//         while (pathLength > 1) {
//             pathLength--;
//             dots = dots + "../"
//         }
//     }

//     return dots
// }
// var dotsSum = dotSum()

// 图标样式<link rel="stylesheet" href="./iconfont.css">
// document.write('<link href="' + dotsSum + 'iconfont/iconfont.css" rel="stylesheet">');
// // 加载vant
// document.write("<link href='" + dotsSum + "vant/index.css' rel='stylesheet'>");
// // 加载vue
// document.write("<script src='" + dotsSum + "vue/vue.js'></script>");
// // 加载vant
// document.write("<script src='" + dotsSum + "vant/vant.min.js'></script>");
// // 加载rem
// document.write('<script src="' + dotsSum + 'config/flexible.js"></script>')
// document.write('<meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate" />')
// document.write('<meta http-equiv="Pragma" content="no-cache" />')
// document.write('<meta http-equiv="Expires" content="0" />')
