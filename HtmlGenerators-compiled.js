"use strict";

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

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

var checkboxTreeObject = {
    label: "My master checkbox",
    attrs: {},
    class: "",
    content: []
};

var ElementTemplate = function () {
    function ElementTemplate() {
        var label = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
        var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
        var className = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

        _classCallCheck(this, ElementTemplate);

        this.initial = {
            label: label,
            attrs: attrs,
            className: className
        };
        this.template = angular.copy(this.initial);
    }

    _createClass(ElementTemplate, [{
        key: "setLabel",
        value: function setLabel() {
            var label = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

            this.template.label = label;
        }
    }, {
        key: "setAttrs",
        value: function setAttrs() {
            var attrs = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

            this.template.attrs = attrs;
        }
    }, {
        key: "setClass",
        value: function setClass() {
            var className = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];

            this.template.className = className;
        }
    }, {
        key: "getLabel",
        value: function getLabel() {
            return this.template.label;
        }
    }, {
        key: "getAttrs",
        value: function getAttrs() {
            return this.template.attrs;
        }
    }, {
        key: "getClass",
        value: function getClass() {
            return this.template.className;
        }
    }, {
        key: "getTemplate",
        value: function getTemplate() {
            return this.template;
        }
    }]);

    return ElementTemplate;
}();

var CheckboxTemplateObject = function (_ElementTemplate) {
    _inherits(CheckboxTemplateObject, _ElementTemplate);

    function CheckboxTemplateObject() {
        var label = arguments.length <= 0 || arguments[0] === undefined ? "" : arguments[0];
        var attrs = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

        var _this;

        var className = arguments.length <= 2 || arguments[2] === undefined ? "" : arguments[2];

        _classCallCheck(this, CheckboxTemplateObject);

        var parent = (_this = _possibleConstructorReturn(this, Object.getPrototypeOf(CheckboxTemplateObject).call(this, label, attrs, className)), _this).initial;
        parent.children = [];

        for (var _len = arguments.length, children = Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {
            children[_key - 3] = arguments[_key];
        }

        _this.children = children;
        for (var i in children) {
            parent.children.push(children[i].getTemplate());
        }_this.initial = parent;
        _this.template = angular.copy(parent);
        return _this;
    }

    _createClass(CheckboxTemplateObject, [{
        key: "setChildren",
        value: function setChildren() {
            for (var _len2 = arguments.length, children = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                children[_key2] = arguments[_key2];
            }

            this.template.children = children;
        }
    }, {
        key: "getChildren",
        value: function getChildren() {
            return this.children;
        }
    }, {
        key: "addChild",
        value: function addChild(child) {
            this.template.children.push(child);
        }
    }, {
        key: "isCheckboxMaster",
        value: function isCheckboxMaster() {
            return this.template.children.length > 0;
        }

        /*@Override*/

    }, {
        key: "getTemplate",
        value: function getTemplate() {
            if (this.isCheckboxMaster() && this.getLabel() == "" && this.getAttrs() == {}) {
                return this.template.children;
            } else return _get(Object.getPrototypeOf(CheckboxTemplateObject.prototype), "getTemplate", this).call(this);
        }
    }]);

    return CheckboxTemplateObject;
}(ElementTemplate);

var ChildrenArray = function (_Array) {
    _inherits(ChildrenArray, _Array);

    function ChildrenArray() {
        _classCallCheck(this, ChildrenArray);

        for (var _len3 = arguments.length, children = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
            children[_key3] = arguments[_key3];
        }

        var _this2 = _possibleConstructorReturn(this, Object.getPrototypeOf(ChildrenArray).call(this, children));

        _this2.i = 0;
        return _this2;
    }

    _createClass(ChildrenArray, [{
        key: "getNext",
        value: function getNext() {
            if (this.i == this.length - 1) return false;
            this.i++;
            return this[this.i];
        }
    }, {
        key: "generateCheckboxTreeArray",
        value: function generateCheckboxTreeArray() {
            var result = [];
            angular.forEach(this, function (child) {
                if (child.isCheckboxMaster()) {
                    // let subChildren = new ChildrenArray(...child.getChildren());
                    var subArray = [];

                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                        for (var _iterator = this.getNext()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                            x = _step.value;

                            subArray.push(li(checkbox(x.label, x.attrs)));
                        }
                    } catch (err) {
                        _didIteratorError = true;
                        _iteratorError = err;
                    } finally {
                        try {
                            if (!_iteratorNormalCompletion && _iterator.return) {
                                _iterator.return();
                            }
                        } finally {
                            if (_didIteratorError) {
                                throw _iteratorError;
                            }
                        }
                    }

                    result.push(innerUlWithHeader(checkbox(child.getLabel(), child.getAttrs())));
                }
            });
        }
    }]);

    return ChildrenArray;
}(Array);

var CheckboxTreeLevel =

/**@param checkboxTemplateObject this parameter should be a CheckboxTemplateObject
 * */
function CheckboxTreeLevel(checkboxTemplateObject) {
    _classCallCheck(this, CheckboxTreeLevel);

    var template = checkboxTemplateObject.getTemplate();
    this.result = "";

    if (angular.isArray(template)) {} else if (angular.isObject(template)) {

        this.result = ulWithHeader(checkbox(template.label, template.attrs), []);
    }
};

//# sourceMappingURL=HtmlGenerators-compiled.js.map