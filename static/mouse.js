/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-4-14
 * Time: 上午9:45
 * To change this template use File | Settings | File Templates.
 */
var mouseRecord = function (align, path) {
    this.align = align || 'left';
    this.path = path;
    this.clicks = 0;
    var that = this;
    //根据对齐情况计算基准点
    //居中对齐情况下，基准点在页面中心，左边为负值，右边为正值，居左情况下，基准点在页面最左边。

    var mouseRel= {
        windowWidth:function () {
            var a = document.documentElement;
            return self.innerWidth || a && a.clientWidth || document.body.clientWidth
        },
        fixZero : function(){
            zero = that.align==='middle'?-mouseRel.windowWidth()/2:0;
            return zero
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
        makeMouseData:function (event) {
            var e = eop.getEvent(event);
            var mousePos = mouseRel.getMosPos(e);
            var el = mouseRel.getMouseEl(mousePos.x, mousePos.y);
            var message = '你点击了X:'+mousePos.x+'你点击了Y'+mousePos.y;
            return {
                'className':el.className,
                'nodeName':el.nodeName,
                'parentNode':el.parentNode,
                'nextSibling':el.nextSibling,
                'html':el.innerHTML,
                'positionX':mousePos.x + zero, //修正X坐标
                'positionY':mousePos.y,
                'message':message,
                'percentageX':mousePos.x/mouseRel.windowWidth()
            }
        },
    }
    var zero=mouseRel.fixZero();
    //返回对象
    return {
        init : function () {
            eop.on(document, 'mousedown', function (event) {
                that.clicks+=1;
                var data = mouseRel.makeMouseData(event);
                tools.sendData(that.path,data);
            })
        },
        getClickCount:function(){
            return that.clicks
        }
    }
};