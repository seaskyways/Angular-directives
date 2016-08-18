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
    var t = "<li>" +
        content +
        "</li>";
    return t;
}

function ulWithHeader(header, lis) {
    if (!header) return ul(lis);
    var t = "<ul>" +
        "<li>" +
        header +
        ul(lis) +
        "</li>" +
        "</ul>";
    return t;
}

function innerUlWithHeader(header, lis) {
    var t = "<li>" +
        header +
        ul(lis) +
        "</li>";
    return t;
}

function checkbox(label, attrs) {
    var t = "<label>" +
        "<input type='checkbox' ";
    for (var key in attrs) {
        var attr = attrs[key];
        if (angular.isUndefined(attr)) attr = "";
        t +=
            key +
            "=\"" +
            attr +
            "\"" +
            " ";
    }
    t += ">" +
        label +
        "</label>";
    return t;
}

var checkboxTreeObject = {
    label: "My master checkbox",
    attrs: {},
    class: "",
    content: []
};

class ElementTemplate {
    constructor(label = "", attrs = {}, className = "") {
        this.initial = {
            label,
            attrs,
            className
        };
        this.template = angular.copy(this.initial);
    }

    setLabel(label = "") {
        this.template.label = label;
    }

    setAttrs(attrs = {}) {
        this.template.attrs = attrs;
    }

    setClass(className = "") {
        this.template.className = className;
    }

    getLabel() {
        return this.template.label;
    }

    getAttrs() {
        return this.template.attrs;
    }

    getClass() {
        return this.template.className;
    }

    getTemplate() {
        return this.template;
    }
}

class CheckboxTemplateObject extends ElementTemplate {
    constructor(label = "", attrs = {}, className = "", ...children) {
        let parent = super(label, attrs, className).initial;
        parent.children = [];
        this.children = children;
        for (var i in children)
            parent.children.push(children[i].getTemplate());

        this.initial = parent;
        this.template = angular.copy(parent);
    }

    setChildren(...children) {
        this.template.children = children;
    }

    getChildren() {
        return this.children;
    }

    addChild(child) {
        this.template.children.push(child);
    }

    isCheckboxMaster() {
        return this.template.children.length > 0;
    }

    /*@Override*/
    getTemplate() {
        if (this.isCheckboxMaster() && this.getLabel() == "" && this.getAttrs() == {}) {
            return this.template.children;
        }
        else return super.getTemplate();
    }
}


class ChildrenArray extends Array {
    constructor(...children) {
        super(children);

        this.i = 0;
    }

    getNext() {
        if (this.i == this.length - 1) return false;
        this.i++;
        return this[this.i];
    }

    generateCheckboxTreeArray() {
        var result = [];
        angular.forEach(this, function (child) {
            if (child.isCheckboxMaster()) {
                // let subChildren = new ChildrenArray(...child.getChildren());
                let subArray = [];

                for (x of this.getNext()){
                    subArray.push(li(checkbox(x.label,x.attrs)))
                }

                result.push(
                    innerUlWithHeader(
                        checkbox(child.getLabel(), child.getAttrs())
                    )
                )
            }
        })
    }
}

class CheckboxTreeLevel {

    /**@param checkboxTemplateObject this parameter should be a CheckboxTemplateObject
     * */
    constructor(checkboxTemplateObject) {

        var template = checkboxTemplateObject.getTemplate();
        this.result = "";


        if (angular.isArray(template)) {

        } else if (angular.isObject(template)) {


            this.result =
                ulWithHeader(
                    checkbox(template.label, template.attrs), []
                )
        }
    }
}