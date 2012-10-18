widget99
========

a newland to creatures,like plugins,like slider validator .....An easy way to create a widget 

这半年来，已经写了很多的特效。。

tab,幻灯片，时间选择，手风琴。。。

但我觉得一切都没有脱离这么一个过程

1.写html

2.在html里面填数据(各种门各种卡)或者js渲染数据进去(如日历控件，支持ajax的控件)

3.写css渲染样式

4.开始绑事件，不论是直接绑定，还是事件委托，不论是id class,还是自定义属性。。

5.扔到某个容器里

一切的一切，我觉得完全是一个填空的过程。所以，为啥不搭建一个空，填完了，一渲染，不就ok了么。。

于是。。


  var tab = new widget({
			tpl : '<ul class="nav">@#each list@<li><a>@title@</a><span>@date@</spam></li></ul>',
			css : {
				'.nav' : {
					'height' : '20px'
				},
				'.nav li' : {
					'float' : 'left'
				}
			},
			data : {
				'list' : [{
						'title' : 'hello',
						'date' : '20110102'
					}, {
						'title' : 'hello',
						'date' : '20110102'
					}
				]
			},
			events : {
				'.nav click' : 'open'
			}
			room : '#container'
		})
		tab.render();

  
当我每次创建一个“特效”，我认为自己创建了一个widget。

他当然包含数据 包含html结构，包含css，包含事件绑定与相应的句柄。这样我填写完毕后，一个render 就可以用了。那么我需要什么东西呢？

1.为了减小耦合度，需要一个模块加载器加载tpl css event组件库,提供一些基本方法库(util.js，类似underscore)
2.我需要一个模板引擎，支持if 遍历 两种语法
3.css采用行内样式？采用addrule操纵样式表?
4.event只提供事件委托，但是是批量事件委托，不支持委托的事件？厄，用传统方式。。
5.selector 提供class与id的选择器，神马。。要支持css3选择器么？不是吧。。
那么我还需要一个东西来extend 这个对象，为了把事件绑定的函数加入进去

6.获取css的方法也同样重要，我需要来几个现成的，神马scroll啊，什么offset啊都要一份

7.util里面包含啥？ 必须要判断类型吧   必须要一个class跟extend工具吧，我靠怎么能少了each呢，当然some跟filter方法应该也要把！array里面怎么着得扩展个最大最小取位置去重复吧。。。。。

8...我晕了。。。

于是  我开始干活了。。。

