/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-4-14
 * Time: 上午9:45
 * To change this template use File | Settings | File Templates.
 */
var operatorRecord = function (align, path) {
    this.align = align || 'left';
    this.path = path;
    this.clicks = 0;
	this.posRecord = [];
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
        makeMouseClickData:function (event) {
            var e = eop.getEvent(event);
            var mousePos = mouseRel.getMosPos(e);
            var el = mouseRel.getMouseEl(mousePos.x, mousePos.y);
            var message = '你点击了X:'+mousePos.x+'你点击了Y'+mousePos.y;
			that.posRecord.push({
				'x' : mousePos.x + zero, //修正X坐标
				'y' : mousePos.y,
				'type' : 'click',
				'time' : +new Date(),
				'el' : el.id + ' | ' + el.className,
			});
            return {
				'id':el.id,
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
        recordMouseMoveData:function (event) {
            var e = eop.getEvent(event);
            var mousePos = mouseRel.getMosPos(e);
            var el = mouseRel.getMouseEl(mousePos.x, mousePos.y);
			that.posRecord.push({
			    'x':mousePos.x + zero, //修正X坐标
                'y':mousePos.y,
				'type':'move',
				'time':+new Date()
			});
        },
		getDeviceSituation:function(){
		
		},
		stayRecord:function(){
			var l = that.posRecord.length;
			if(l==0)return;
			var last = that.posRecord[l-1];
			last.type = "stay"
			last.time=+new Date()
			that.posRecord.push(last);
		}
    }
    var zero=mouseRel.fixZero();
    //返回对象
    return {
        init : function () {
				/*鼠标点击时，记录坐标*/
            eop.on(document, 'mousedown', function (event) {
                that.clicks+=1;
                var data = mouseRel.makeMouseClickData(event);
               // tools.sendData(that.path,data);
            })
			var timer = null; 
			
			  var active = true,
					idle = false,
					over = false,
					x = 0,
					y = 0,
					simulate = false;
			 
				// activate capture mode
				setInterval(function(){
					active = true;
				}, 80);
			
			
			   // check whether the mouse is idling
			var idlechecker = setInterval(function(){
				if(over && !simulate){
					// if it's idling -> start the simulation 
					// and add the last x/y coords
					simulate = setInterval(function(){
						mouseRel.stayRecord()
					}, 1000);
				}
			}, 150);
			

				/*鼠标运动时，记录坐标*/
            eop.on(document, 'mousemove', function (event) {
			
				        over = true;
						if(simulate){
							clearInterval(simulate);
							simulate = false;
						}
				 
						if(active){
							mouseRel.recordMouseMoveData(event);
							active = false;
						}
            })
        },
        getClickCount:function(){
            return that.clicks
        },
		getMousePos :function(){
			return JSON.stringify(that.posRecord)
		}
    }
};