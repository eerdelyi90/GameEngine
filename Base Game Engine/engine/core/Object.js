var Engine = window.Engine || {};

Engine.Object = (function () {

    function Object() {
    }

    function equals(obj) {
        return _.isEqual(this, obj);
    }

    function clone() {
        return _.clone(this);
    }

    function toString() {
        return _.pairs(this);
    }

    Object.prototype.equals = equals;
    Object.prototype.clone = clone;
    Object.prototype.toString = toString;

    return Object;
})();