/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-4-14
 * Time: 上午9:44
 * To change this template use File | Settings | File Templates.
 */
 
var tools = {
    sendData:function (data, path) {
        var url = tools.addQueryUrlParam(data, path)
        var img = new Image();
        var window[rnd_id] = img; // 全局变量引用,防止浏览器垃圾回收机制清理img对象，提高打点成功率
        img.src = url;
        img.onload = img.onerror = function () {
            img = null;
            window[rnd_id] = null; // 删除全局变量引用
        }
        
    },
    addQueryUrlParam:function (url, data) {
        for (key in data) {
            if (url.indexOf("?") == -1) {
                url += "?";
            } else {
                url += "&";
            }
            url += encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
        }
        return url
    }
}
var eop = {
    on : function (oElement, sEvent, fnHandler) {
        oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : (oElement["_" + sEvent + fnHandler] = fnHandler, oElement[sEvent + fnHandler] = function () {
            oElement["_" + sEvent + fnHandler]()
        }, oElement.attachEvent("on" + sEvent, oElement[sEvent + fnHandler]))
    },
    off : function (oElement, sEvent, fnHandler) {
        oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, oElement[sEvent + fnHandler])
    },
    addLoadHandler : function (fnHandler) {
        this.addHandler(window, "load", fnHandler)
    },
    getEvent : function (event) {
        return event ? event : window.event;
    },
    getTarget : function (event) {
        return event.target || event.srcElement;
    }

}
