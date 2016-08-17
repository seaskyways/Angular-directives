/**
 * Created by Ahmad Sharif on 16/8,Aug/2016.
 */

jQuery.fn.tagName = function () {
    return this.prop("tagName");
};

jQuery.fn.isTagName = function (tagName) {
    return this.tagName() == tagName.toUpperCase();
};

class Child {
    update() {
        console.log("hello from super");
    };

    constructor() {

    }
}

class ChildrenGroup1 extends Child {

    constructor(element = "", required) {
        super();

        let h = String.raw`
<div>
<ul>
<li>
    <input type="checkbox">
</li>
</ul>
</div>
`;

        this.hello = element;
        super.hello = "hello";
    }

    // update(){
    //     console.log("hello from child");
    //     super.update();
    // }
}

// import * as base from "base";

function hello(...x) {
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
