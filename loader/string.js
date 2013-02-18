define('event', [], function() {
var eop = {
	addHandler : function (oElement, sEvent, fnHandler) {
		oElement.addEventListener ? oElement.addEventListener(sEvent, fnHandler, false) : (oElement["_" + sEvent + fnHandler] = fnHandler, oElement[sEvent + fnHandler] = function () {
			oElement["_" + sEvent + fnHandler]()
		}, oElement.attachEvent("on" + sEvent, oElement[sEvent + fnHandler]))
	},
	removeHandler : function (oElement, sEvent, fnHandler) {
		oElement.removeEventListener ? oElement.removeEventListener(sEvent, fnHandler, false) : oElement.detachEvent("on" + sEvent, oElement[sEvent + fnHandler])
	},
	addLoadHandler : function (fnHandler) {
		this.addHandler(window, "load", fnHandler)
	},
	getEv : function (event) {
		return event ? event : window.event;
	},
	getTarget : function (event) {
		return event.target || event.srcElement;
	},
	delegate : function (worker, ev, group) {
		each(group, function (i) {
			eop.addHandler(worker, ev, eop.fns[group[i]['fn']] = function (event) {
				event = eop.getEv(event);
				var target = eop.getTarget(event);
				(' ' + target.className.toLowerCase() + ' ')
				.indexOf(' ' + group[i]['selector'] + ' ') !== -1 &&
				group[i]['fn'](eop.getTarget(event));
			})
		})
	},
	fns : []
}
return eop
})

});