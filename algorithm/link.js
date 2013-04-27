/**
 * Created with JetBrains WebStorm.
 * User: Tianyi(99)
 * Date: 13-4-15
 * Time: 上午11:03
 * To change this template use File | Settings | File Templates.
 */
function linkedList(obj) {
//初始化一个链表，接受一个object作为参数
    this.list = obj;
    this.list._idleNext = obj;
    this.list._idlePrev = obj;
}
linkedList.prototype = {
    peek: function () {
        if (this.list._idlePrev == list) return null;
        return this.list._idlePrev;
    },
    remove: function (item) {
        var linkedItem = this.list.item;
        if (linkedItem._idleNext) {
            linkedItem._idleNext._idlePrev = linkedItem._idlePrev;
        }
        if (linkedItem._idlePrev) {
            linkedItem._idlePrev._idleNext = linkedItem._idleNext;
        }
        linkedItem._idleNext = null;
        linkedItem._idlePrev = null;
    },
    shift: function () {
        var first = this.list._idlePrev;
        this.remove(first);
        return first;
    },
    append: function (item) {
        this.remove(item);
        var linkedItem = this.list.item;
        linkedItem._idleNext = this.list._idleNext;
        this.list._idleNext._idlePrev = linkedItem;
        linkedItem._idlePrev = this.list;
        this.list._idleNext = linkedItem;
    },
    isEmpty: function () {
        return this.list._idleNext === this.list;
    }
}
