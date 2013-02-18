var doc = document;
	var W3C = document.dispatchEvent;
	var head = doc.head || doc.getElementsByTagName("head")[0];
	var modules = {};
	var callbacks = {};
	var nowJs = getCurrentScript();
	var base = getBase(nowJs);
	
	function type(obj) {
		return Object.prototype.toString.call(obj).slice(8, -1);
	}
function getBase(url){
var arr = url.split('/');
arr.pop();
return arr.join('/');
}
	function reg(id, factory) {
		console.log(id, factory);
		if (!modules[id]) {
			modules[id] = factory.apply(null, []);
			if (callbacks[id]) {
				var args = [];
				var l = callbacks[id]['args'].length;
				for(var i  = 0 ;i<l;i++){//把参数装配成modules存储的模块
				args.push(modules[callbacks[id]['args'][i]])
				}
				callbacks[id].apply(null, args)
			};
		}
	};
		function loadjs(url) {
			//通过script节点加载目标模块
			var node = doc.createElement("script");
			node[ W3C? "onload" : "onreadystatechange"] = function () {
				if (W3C || /loaded|complete/i.test(node.readyState)) {
						console.log("已成功加载 " + node.src);
				}
			}
			node.onerror = function () {
				alert('加载失败')
			}
			
			node.src = url;
			head.insertBefore(node, head.firstChild); 
			console.log("正准备加载 " + node.src) 
		}
	//https://github.com/RubyLouvre/mass-Framework/blob/master/mass.js
	//http://www.cnblogs.com/_franky/archive/2010/06/20/1761370.html
//	loadjs('http://code.jquery.com/jquery-1.9.0.min.js')
//adjustPath('aa/bb/cc','../dd.js') -->"aa/bb/dd.js"
function adjustPath(base, user) {
	var patharr = base.replace(/\/$/, "").split("\/");
	var nstr = user.replace(/\.\.\//g, function (a) {
			console.log(a);
			return patharr.pop() ? "" : a;
		});
	return patharr.length ? patharr.join("/") + "/" + nstr : nstr;
}
//define(id?, dependencies?, factory);
//define 方法允许你省略第一个参数，
//这样就定义了一个匿名模块，
//这时候模块文件的文件名就是模块 ID。
//如果这个模块定义在 a.js 中，那么 a 就是模块 ID。
//可以在依赖项中用 “a” 来依赖这个匿名模块。
// dependencies
//第二个参数：依赖 是被定义的模块所依赖的模块的 ID 构造的数组。
//所依赖的模块必须在回调函数执行前载入，
//所依赖的模块的顺序需和回调函数的参数一一对应。
//所依赖的模块路径是相对的，应该相对正在定义的模块来指定。
//换句话说：模块的路径应该相对于被定义的模块，而不是模块的物理路径。


 window.define = function (id, deps, factory) {
 	var l = deps.length,
 	i;
 	if (type(id) == 'String') { //有名字
	var absoluteUrl = adjustPath(base,id)+'.js';
 		if (l == 0) { //无依赖
 			reg(absoluteUrl, factory); //直接注册,模块名为模块文件绝对路径
 		} else {
 			for (i = 0; i < l; i++) {
			var absoluteUrl = adjustPath(base,deps[i])+'.js';
 				if (!modules[absoluteUrl]) {
 					loadjs(absoluteUrl);
 				}
 			}
 		}
 	} else {//没名字，注册模块名，为模块文件绝对路径。
 		moduleName = getCurrentScript();
		var factory = arguments[arguments.length-1];
		 if (l == 0) { //无依赖
 			reg(moduleName, factory); //直接注册,模块名为模块文件绝对路径
 		} else {
 			for (i = 0; i < l; i++) {
			var absoluteUrl = adjustPath(base,deps[i])+'.js';
 				if (!modules[absoluteUrl]) {
 					loadjs(absoluteUrl);
 				}
 			}
 		}
 	}
 };
window.require = function (deps, callback) {
	if (type(deps) == 'String') {
	var absoluteUrl = adjustPath(base,deps)+'.js'
		if (modules[absoluteUrl]) { //存在此模块
			callback.apply(null, [modules[absoluteUrl]]);
		} else { //当不存在此模块
			callbacks[absoluteUrl]=callback;//把回调函数的属主设置为模块
			callbacks[absoluteUrl]['args']=[];
			callbacks[absoluteUrl]['args'].push(absoluteUrl);
			loadjs(absoluteUrl);
		}
	} else {
		var l = deps.length,
		i,finallyModuleName = adjustPath(base,deps[l-1])+'.js';
		callbacks[finallyModuleName]=callback;//利用最后加载的模块作为callback的属主
	callbacks[finallyModuleName]['args']=[];//存参数
		for (i = 0; i < l; i++) {
		var absoluteUrl = adjustPath(base,deps[i])+'.js';
		callbacks[finallyModuleName]['args'].push(absoluteUrl)
			if (!modules[absoluteUrl]) { //依赖没有加载
				loadjs(absoluteUrl);
			}
		}
	}
};
  //来自正美大大的博客 http://www.cnblogs.com/rubylouvre/archive/2013/01/23/2872618.html
   function getCurrentScript() {
        //取得正在解析的script节点
        if (doc.currentScript) { //firefox 4+
            return doc.currentScript.src;
        }
        // 参考 https://github.com/samyk/jiagra/blob/master/jiagra.js
        var stack;
        try {
            a.b.c(); //强制报错,以便捕获e.stack
        } catch (e) { //safari的错误对象只有line,sourceId,sourceURL
            stack = e.stack;
            if (!stack && window.opera) {
                //opera 9没有e.stack,但有e.Backtrace,但不能直接取得,需要对e对象转字符串进行抽取
                stack = (String(e).match(/of linked script \S+/g) || []).join(" ");
            }
        }
        if (stack) {
            /**e.stack最后一行在所有支持的浏览器大致如下: 
             *chrome23:
             * at http://113.93.50.63/data.js:4:1
             *firefox17:
             *@http://113.93.50.63/query.js:4
             *opera12:http://www.oldapps.com/opera.php?system=Windows_XP
             *@http://113.93.50.63/data.js:4
             *IE10:
             *  at Global code (http://113.93.50.63/data.js:4:1)
             */
            stack = stack.split(/[@ ]/g).pop(); //取得最后一行,最后一个空格或@之后的部分
            stack = stack[0] === "(" ? stack.slice(1, -1) : stack;
            return stack.replace(/(:\d+)?:\d+$/i, ""); //去掉行号与或许存在的出错字符起始位置
        }
        var nodes = head.getElementsByTagName("script"); //只在head标签中寻找
        for (var i = 0, node; node = nodes[i++]; ) {
            if (node.className === moduleClass && node.readyState === "interactive") {
                return node.className = node.src;
            }
        }
    }

	

	