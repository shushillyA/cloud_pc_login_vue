/*
* @Author: soulmate
* @Date:   2017-06-14 14:34:21
* @Last Modified by:   soulmate
* @Last Modified time: 2017-06-16 10:18:34
*/

// 接口公共域名
// var baseUrl = 'https://cloud15-user-api.dev.xlhb.com/v2/';   //原来的
var baseUrl = 'https://cloud15-user-api.stage.xlhb.com/v2/';  // 预发的

// 获取url参数值
function GetQueryString(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
}