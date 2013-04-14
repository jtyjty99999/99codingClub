/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-3-29
 * Time: 下午12:05
 * To change this template use File | Settings | File Templates.
 */
;
(function () {
    var toolkit = {
        throttle:function (fn, delay) {
            var timer = null;
            return function () {
                var context = this, args = arguments;
                clearTimeout(timer);
                timer = setTimeout(function () {
                    fn.apply(context, args);
                }, delay);
            };
        },
    uncurryThis:function (f) {
        return function () {
            return f.call.apply(f, arguments)
        };
    },
    curryThis:function (f) {
        return function () {
            var a = Array.prototype.slice.call(arguments);
            a.unshift(this);
            return f.apply(null, a);
        };
    },
    connect:function (scope, fnFrom, fnTo) {
        "use strict"
        var objFn = fnFrom.split('.');
        var deepth = objFn.length;
        var scope = scope || window;
        var j = deepth, i = j;
        var _obj = scope, __obj = _obj;
        while (i > 0) {
            _obj = _obj[objFn[deepth - i]];
            i -= 1;
        }
        var t = function () {
            return function () {
                var ret = _obj.apply(this, arguments);
                fnTo.apply(this, arguments);
                return ret;
            }
        }
        while (j > 1) {
            __obj = __obj[objFn[deepth - j]];
            j -= 1;
        }
        __obj[objFn[deepth - 1]] = t();
    },
     Timer = {
            _data : {},
            start : function (key) {
                Timer._data[key] = new Date();
            }
            stop : function (key) {
                var time = Timer._data[key];
                if (time) {
                    Timer._data[key] = new Date - time;
                }
            }
            getTime : function (key) {
                return Timer._data[key];
            }
        },
        simpleAtQuene:function (toDoList, args, callback) {
        var todo = toDoList.concat();
        setTimeout(function () {
            var task = todo.shift();
            task.apply(null, args || []);
            //console.log('todo = '+todo.length)
            if (todo.length > 0) {
                setTimeout(arguments.callee, 25)
            } else {
                callback()
            }
        }, 25)
    },
    memorize:function (fun){
        var buffer = {};
        var cache = function(){
            var key = Array.prototype.join.call(arguments, '');
            if(!(key in buffer)){ buffer[key] = fun.apply(this, arguments); };
            return buffer[key];
        }
        cache.del = function(key){
            if(!key){
                buffer = {};
            }else if(key in buffer){
                delete buffer[key];
            }
        }
        cache.add = function(key, value){
            buffer[key] = value;
        }
        return cache;
    },
    timeTest = function(funName) {
        var that = this;
        return function() {
            var d = +new Date();
            var apy = that.apply(this,arguments);
            console.log(funName+" need time:"+(+new Date() - d));
            return apy;
       }
};
return tookit
})()