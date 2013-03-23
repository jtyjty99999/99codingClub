/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-23
 * Time: 上午10:53
 * To change this template use File | Settings | File Templates.
 */
var mouseRecord = function (align, path) {
    this.align = align || 'left';
    this.path = path;
    this.clicks = 0;
    var tools = {
        windowHeight:function () {
            var a = document.documentElement;
            return self.innerHeight || a && a.clientHeight || document.body.clientHeight
        },
        getMosPos:function (e) {
            var scrollx,
                scrolly;
            if (typeof(window.pageXOffset) == 'number') {
                scrollx = window.pageXOffset;
                scrolly = window.pageYOffset;
            } else {
                scrollx = document.documentElement.scrollLeft;
                scrolly = document.documentElement.scrollTop;
            }
            return {
                x:e.clientX + scrollx,
                y:e.clientY + scrolly
            }
        },
        getMouseEl:function (x, y) {
            return document.elementFromPoint(x, y);
        },
        sendData:function (data, path) {
            var url = tools.addQueryUrlParam(data, path)
            var img = new Image();
            img.src = url;
            img = null;
        },
        makeData:function (event) {
            var e = eop.getEvent(event);
            var mousePos = tools.getMosPos(e);
            var el = tools.getMouseEl(mousePos.x, mousePos.y);
            return {
                'elementFromMouse':el,
                'positionX':mousePos.x,
                'positionY':mousePos.y
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
    var that = this;
    //返回对象
    return {
        init : function () {
            eop.on(document, 'mousedown', function (event) {
                console.log(that.clicks)
                that.clicks+=1;
                var data = tools.makeData();
                tools.sendData(that.path,data)
            })
        },
        getClickCount:function(){
            return that.clicks
        }
    }
};
var c = new mouseRecord('middle', 'www.baidu.com');
c.init();