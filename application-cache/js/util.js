/**
 * 获取url参数值
 * @method getQueryString
 * @param {String} name url属性名
 * @return {String} 返回属性值
 * @Date 2016/7/28 - 18:12
 */
"use strict";
let getQueryString = (name) => {
    let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    let r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]);
    return null;
}

/**
 * 判断是否是移动端访问
 * @method isMobile
 * @param {String} 参数名 参数说明
 * @return {String} 返回值说明
 * @Date 2016/7/28 - 18:20
 */
let isMobile = () => {
    let u = navigator.userAgent,
        a = ["Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod"],
        res = false;
    for (let i = 0; i < a.length; i++) {
        if (u.indexOf(a[i]) > 0) {
            res = true;
            break;
        }
    }
    return res;
}

/**
 * 方法说明
 * @method 检测对象是否为空
 * @param {object} a 需要检测的对象
 * @return {boolean} 返回false 为空
 * @Date 2016/7/29 - 9:04
 */
let isNotBlank = (a) => {
    if (a == undefined || a == null || a == "null" || a == "undefined" || a.toString().trim().length <= 0) {
        return false
    }
    return true
}

/**
 * 根据相应设备 返回对应的点击事件
 * @method tap
 * @param { }
 * @return {String} 返回对应的事件名
 * @Date 2016/7/29 - 9:06
 */
let tap = () => {
    return isMobile() ? "touchend" : "click";
}


/**
 * 将url属性生成为对象
 * @method getRequestParameter
 * @return {object} 返回对应属性值
 * @Date 2016/7/29 - 9:12
 */
let getRequestParameter = () => {
    let url = location.search;
    let theRequest = new Object();
    if (url.indexOf("?") != -1) {
        let str = url.substr(1);
        let newStrs = str.split("?").join('&');
        let strs = newStrs.split("&");
        for (let i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}