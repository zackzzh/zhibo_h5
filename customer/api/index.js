/**
 * 获取url地址
 * @param {*} urlStr 
 */
var sUserAgent = navigator.userAgent.toLowerCase();
var isIphone = sUserAgent.match(/iphone/i) == "iphone";
var isAndroid = sUserAgent.match(/android/i) == "android";

function GetRequest(urlStr) {
    if (typeof urlStr == "undefined") {
        var url = decodeURI(location.search); //获取url中"?"符后的字符串
    } else {
        var url = "?" + urlStr.split("?")[1];
    }
    var theRequest = new Object();
    if (url.indexOf("?") != -1) {
        var str = url.substr(1);
        strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}
//线上
var curWwwPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curWwwPath.indexOf(pathName);
//获取主机地址，如： http://localhost:7070
var localhostPaht = curWwwPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
const APIROOT = localhostPaht + projectName + '/api/';
var url = window.location.href;
var urlparams = GetRequest(url)
if (urlparams.token) {
    sessionStorage.setItem('TOKEN', urlparams.token)
}
const TOKEN_KEY = sessionStorage.getItem("TOKEN")
console.log('TOKEN_KEY', TOKEN_KEY)
//线下
// TOKEN_KEY = '0ad514a7-89a1-4fe2-bcec-4059f8e480f1'
// const APIROOT = '/api/';
const HISTORY_KEY = 'History-Key'
// 配置axios
const axiosConfig = {
    baseURL: APIROOT,
    timeout: 3000,
    withCredentials: false,
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'token': TOKEN_KEY
    },

}
// 创建实例对象
const instance = axios.create(axiosConfig);


// 访问后端转换
function request(val) {
    return instance(val);
}

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    console.log("发送请求", config);
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    if (response.status == 200) {
        if (response.data.code == 200) {
            return response.data;
        } else if (response.data.code == 503) {
            if (isIphone) {

            } else {
                window.android.onInvalidToken('503');
            }
            vant.Toast.fail(response.data.msg);
        } else {
            vant.Toast.fail(response.data.msg);
        }
    } else {
        vant.Toast.fail('请求失败');
    }
}, function (error) {
    return Promise.reject(error);
});