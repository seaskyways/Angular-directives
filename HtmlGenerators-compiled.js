"use strict";

var _set = function set(object, property, value, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent !== null) { set(parent, property, value, receiver); } } else if ("value" in desc && desc.writable) { desc.value = value; } else { var setter = desc.set; if (setter !== undefined) { setter.call(receiver, value); } } return value; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _templateObject = _taggedTemplateLiteral(["\n<div>\n<ul>\n<li>\n    <input type=\"checkbox\">\n</li>\n</ul>\n</div>\n"], ["\n<div>\n<ul>\n<li>\n    <input type=\"checkbox\">\n</li>\n</ul>\n</div>\n"]);

function _taggedTemplateLiteral(strings, raw) { return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by Ahmad Sharif on 16/8,Aug/2016.
 */

jQuery.fn.tagName = function () {
    return this.prop("tagName");
};

jQuery.fn.isTagName = function (tagName) {
    return this.tagName() == tagName.toUpperCase();
};

var Child = function () {
    _createClass(Child, [{
        key: "update",
        value: function update() {
            console.log("hello from super");
        }
    }]);

    function Child() {
        _classCallCheck(this, Child);
    }

    return Child;
}();

var ChildrenGroup1 = function (_Child) {
    _inherits(ChildrenGroup1, _Child);

    function ChildrenGroup1() {
        var element = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
        var required = arguments[1];

        _classCallCheck(this, ChildrenGroup1);

        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ChildrenGroup1).call(this));

        var h = String.raw(_templateObject);

        _this.hello = element;
        _set(Object.getPrototypeOf(ChildrenGroup1.prototype), "hello", "hello", _this);
        return _this;
    }

    // update(){
    //     console.log("hello from child");
    //     super.update();
    // }


    return ChildrenGroup1;
}(Child);

// import * as base from "base";

function hello() {
    for (var _len = arguments.length, x = Array(_len), _key = 0; _key < _len; _key++) {
        x[_key] = arguments[_key];
    }

    console.log(x);
    // console.log(base._elem);
}

var x = new ChildrenGroup1(li("Hello"));
console.log(x);

function ul(lis) {
    var t = "<ul>";
    angular.forEach(lis, function (li) {
        if (!$(li).isTagName("li")) li = window.li(li);
        t += li;
    });
    t += "</ul>";
    return t;
}

function li(content) {
    var t = "<li>" + content + "</li>";
    return t;
}

function ulWithHeader(header, lis) {
    if (!header) return ul(lis);
    var t = "<ul>" + "<li>" + header + ul(lis) + "</li>" + "</ul>";
    return t;
}

function innerUlWithHeader(header, lis) {
    var t = "<li>" + header + ul(lis) + "</li>";
    return t;
}

function checkbox(label, attrs) {
    var t = "<label>" + "<input type='checkbox' ";
    for (var key in attrs) {
        var attr = attrs[key];
        if (angular.isUndefined(attr)) attr = "";
        t += key + "=\"" + attr + "\"" + " ";
    }
    t += ">" + label + "</label>";
    return t;
}

//# sourceMappingURL=HtmlGenerators-compiled.js.map