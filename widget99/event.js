function customEvent() {
    this.eventCollection = {};
}
customEvent.prototype = {
    trigger: function (eve, news) {
        this.eventCollection[eve].forEach(function (fn) {
            fn.call(this, news);
        })
    },
    on: function (eve, fnHandle) {

        if (typeof(this.eventCollection[eve]) == 'undefined') {
            this.eventCollection[eve] = []
        }
        this.eventCollection[eve].push(fnHandle);
    },
    off: function (eve, fnHandle) {
        if (this.eventCollection[eve] instanceof Array) {
            var handlers = this.eventCollection[eve];
            for (var i = 0, len = handlers.length; i < len; i++) {
                if (handlers[i] === fnHandle) {
                    break;
                }
            }
            handlers.splice(i, 1);
        }
    }

}