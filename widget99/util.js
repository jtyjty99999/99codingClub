(function( window, undefined ) {
    var jQuery = function() {
        // ...
    };
    jQuery.extend = function() {
        var options, name, src, copy, copyIsArray, clone,
            target = arguments[0] || {},
            i = 1,
            length = arguments.length,
            deep = false;

        // 处理第一个参数为boolean类型
        if ( typeof target === "boolean" ) {
            deep = target;
            target = arguments[1] || {};
            // 略过第一个boolean类型参数和目标扩展对象，提供合并属性的对象从第三个参数开始
            i = 2;
        }

        // 处理当目标参数为5种基本类型
        if ( typeof target !== "object" && !jQuery.isFunction(target) ) {
            target = {};
            // 当目标参数为Function类型，它不会被扩展属性，返回的还是它本身
        }

        // 当参数只有一个，扩展jQuery本身
        if ( length === i ) {
            target = this;
            // 提供合并属性的对象从第一个参数开始
            --i;
        }

        // 枚举提供合并的对象
        for ( ; i < length; i++ ) {
            // 提供合并的对象不为null
            if ( (options = arguments[ i ]) != null ) {
                // 枚举提供合并对象的属性
                for ( name in options ) {
                    src = target[ name ];
                    copy = options[ name ];

                    // 当提供合并对象的属性等于目标对象时(即指向同一个对象索引)，跳出本次循环
                    if ( target === copy ) {
                        continue;
                    }

                    // 当deep为true，copy不为undefined、null，copy是一个字面量对象或者数组
                    if ( deep && copy && ( jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)) ) ) {
                        // 当提供合并对象的属性是数组
                        if ( copyIsArray ) {
                            // 由于在数组字面量中不能指定具体的key(默认为数值)，因此将copyIsArray设置为false
                            copyIsArray = false;
                            // 指定递归中要扩展的目标对象
                            clone = src && jQuery.isArray(src) ? src : [];

                            // 当要合并的属性是字面量对象
                        } else {
                            // 指定递归中要扩展的目标对象
                            clone = src && jQuery.isPlainObject(src) ? src : {};
                        }

                        // 将递归中扩展的目标对象赋值给目标对象属性，右边target[ name ]不能写成src，因为src保存的是target[ name ]值而不是索引
                        target[ name ] = jQuery.extend( deep, clone, copy );

                        // 当提供合并对象的属性不为undefined时，直接将其赋值给目标对象的相同属性，这意味着当目标对象属性是一个对象，或者数组时，完全是利用第二个对象
                        // 的key重写一个属性，这些值并不会合并
                    } else if ( copy !== undefined ) {
                        target[ name ] = copy;
                    }
                }
            }
        }

        // 返回被合并的对象，即目标对象
        return target;
    };

    // 扩展jQuery命名空间下的方法，增强行为
    jQuery.extend({
        method: function () {
            console.log('test');
        },
        noConflict: function () {
            //...   
        },
        isReady: false,
        // ...
    });

    window.jQuery = window.$ = jQuery;

})(window);


function loadCSS(url) {
    var head = document.head || document.getElementsByTagName("head")[0]; //HEAD元素
        var node = document.createElement("link");
        node.rel = "stylesheet";
        node.href = url;
        head.insertBefore(node, head.firstChild);
}
function type(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1);
}
var each = function(obj, iterator, context) {
    if (obj == null) return;
    if (Array.prototype.forEach && obj.forEach === Array.prototype.forEach) {
        obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
        for (var i = 0, l = obj.length; i < l; i++) {
            if (iterator.call(context, obj[i], i, obj) === {}) return;
        }
    } else {
        for (var key in obj) {
            if (_.has(obj, key)) {
                if (iterator.call(context, obj[key], key, obj) === {}) return;
            }
        }
    }
};