/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-4-14
 * Time: 上午9:45
 * To change this template use File | Settings | File Templates.
 */
 
 var tools = {
          windowWidth:function () {
            var a = document.documentElement;
            return self.innerWidth || a && a.clientWidth || document.body.clientWidth
        },
 		getScroll:function(e){
		     var scrollx,
                scrolly;
            if (typeof(window.pageXOffset) == 'number') {
                scrollx = window.pageXOffset;
                scrolly = window.pageYOffset;
            } else {
                scrollx = document.documentElement.scrollLeft;
                scrolly = document.documentElement.scrollTop;
            }
			return{
				sx:scrollx,
				sy:scrolly
			}
		},
		keys : {
        backspace: 8,
        tab: 9,
        enter: 13,
        'return': 13,
        shift: 16,
        '⇧': 16,
        control: 17,
        ctrl: 17,
        '⌃': 17,
        alt: 18,
        option: 18,
        '⌥': 18,
        pause: 19,
        capslock: 20,
        esc: 27,
        space: 32,
        pageup: 33,
        pagedown: 34,
        end: 35,
        home: 36,
        left: 37,
        L: 37,
        '←': 37,
        up: 38,
        U: 38,
        '↑': 38,
        right: 39,
        R: 39,
        '→': 39,
        down: 40,
        D: 40,
        '↓': 40,
        insert: 45,
        'delete': 46,
        '0': 48,
        '1': 49,
        '2': 50,
        '3': 51,
        '4': 52,
        '5': 53,
        '6': 54,
        '7': 55,
        '8': 56,
        '9': 57,
        a: 65,
        b: 66,
        c: 67,
        d: 68,
        e: 69,
        f: 70,
        g: 71,
        h: 72,
        i: 73,
        j: 74,
        k: 75,
        l: 76,
        m: 77,
        n: 78,
        o: 79,
        p: 80,
        q: 81,
        r: 82,
        s: 83,
        t: 84,
        u: 85,
        v: 86,
        w: 87,
        x: 88,
        y: 89,
        z: 90,
        '⌘': 91,
        command: 91,
        kp_0: 96,
        kp_1: 97,
        kp_2: 98,
        kp_3: 99,
        kp_4: 100,
        kp_5: 101,
        kp_6: 102,
        kp_7: 103,
        kp_8: 104,
        kp_9: 105,
        kp_multiply: 106,
        kp_plus: 107,
        kp_minus: 109,
        kp_decimal: 110,
        kp_divide: 111,
        f1: 112,
        f2: 113,
        f3: 114,
        f4: 115,
        f5: 116,
        f6: 117,
        f7: 118,
        f8: 119,
        f9: 120,
        f10: 121,
        f11: 122,
        f12: 123,
        equal: 187,
        '=': 187,
        comma: 188,
        ',': 188,
        minus: 189,
        '-': 189,
        period: 190,
        '.': 190
      },
	  getKey:function(code){
	  
		for(var key in this.keys){
		
			if(this.keys[key]==code){
				return key
			}
		}
		return 'notCatch'
	  }
 }

 
var recorder = function (align, path) {
    this.align = align || 'left';
    this.path = path;
    this.clicks = 0;
	this.posRecord = [];
	this.operator = [];
    var that = this;
    //根据对齐情况计算基准点
    //居中对齐情况下，基准点在页面中心，左边为负值，右边为正值，居左情况下，基准点在页面最左边。
    var mouseRel= {
        fixZero : function(){
            zero = that.align==='middle'?-mouseRel.windowWidth()/2:0;
            return zero
        },

        getMosPos:function (e) {
			var scroll = tools.getScroll(e);
            return {
                x:e.clientX + scroll.sx,
                y:e.clientY + scroll.sy
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
                'percentageX':mousePos.x/tools.windowWidth()
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
		initOperatorRecord :function(){
			eop.on(window, 'scroll', function (event) {
				 var e = eop.getEvent(event);
				 
				 that.operator.push({
				 	'type' : 'scrollTo',
				 	'target' : tools.getScroll(e).sy,
					'time':+new Date()
				 })
            })
			eop.on(window, 'resize', function (event) {
				 var e = eop.getEvent(event);
				 that.operator.push({
				 	'type' : 'resizeTo',
				 	'target' : tools.windowWidth(),
					'time':+new Date()
				 })
            })
			eop.on(document, 'keyup', function (event) {
				 var e = eop.getEvent(event);
				  that.operator.push({
				 	'type' : 'pressed',
				 	'target' : tools.getKey(e.keyCode),
					'time':+new Date()
				 })
            })
			
			var inputs =  document.querySelectorAll('input')
				
			Array.prototype.slice.call(inputs, 0).forEach(function (d, i) {
				eop.on(d, 'focus', function (event) {
					var e = eop.getEvent(event);
					  that.operator.push({
						'type' : 'focus',
						'target' : e.target.name,
						'time':+new Date()
					 })
				})
				eop.on(d, 'blur', function (event) {
					var e = eop.getEvent(event);
					that.operator.push({
						'type' : 'blur',
						'target' : e.target.name,
						'time':+new Date()
					 })
				})
			})
			
			eop.on(window, 'load', function (event) {
				 var e = eop.getEvent(event);
				that.operator.push({
						'type' : 'load',
						'target' : 'page loaded',
						'time':+new Date()
					 })
            })
		},
        getClickCount:function(){
            return that.clicks
        },
		getMousePos :function(){
			return that.posRecord
		},
		getRecorded :function(){
			return that.operator
		},
    }
};