define('ui', [], function() {
var pos = 
{
		wholeHeight : function () {
			return document.body.scrollHeight || document.documentElement.scrollHeight
		},
		windowHeight : function () {
			var a = document.documentElement;
			return self.innerHeight || a && a.clientHeight || document.body.clientHeight
		},
		scrollY : function (a) {
			var b = document.documentElement;
			if (a) {
				var c = a.parentNode,
				e = a.scrollTop || 0;
				if (a == b)
					e = UI.scrollY();
				return c ? e + UI.scrollY(c) : e
			}
			return self.pageYOffset || b && b.scrollTop || document.body.scrollTop
		}
}
return pos
});