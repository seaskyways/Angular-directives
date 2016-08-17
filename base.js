/**
 * Created by Ahmad Sharif on 16/8,Aug/2016.
 */

var angApp = angular.module("app", []);

$$ = angular.element;

function onScopeInit(scope, scopeName) {
    switch (scopeName) {
        case "scope1" :
            console.log("hello from scope");
            scope.hey = "HEEY";
            break;
    }
}


angApp.directive("test", function ($compile, $rootElement) {
    var template = function () {
        //noinspection HtmlUnknownAttribute
        return "" +
            "<ul>" +
            "<li %repeat>%check</li>" +
            "</ul>";
    };

    function ul(lis) {
        var t = "<ul>";
        angular.forEach(lis, function (li) {
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

    var checkbox = function (name) {
        //noinspection HtmlUnknownAttribute
        var box = "<label><input type='checkbox' %attrs>%name</label>";
        if (angular.isDefined(name))
            box = box.replace("%name", name);
        return box;
    };

    var master = function (masterAttrs, name) {
        masterAttrs += " link-to=\"" + generateMasterValue() + "\"";
        var t = template()
            .replace("%repeat", "")
            .replace("%check", checkbox(name)
                .replace("%attrs", masterAttrs));
        return t;
    };

    var child = function (childAttrs, name) {
        childAttrs += " linked-to=\"" + getMasterValue() + "\"";
        var t = template()
            .replace("%repeat", "")
            .replace("%check", checkbox(name)
                .replace("%attrs", childAttrs));
        return t;
    };

    var lastMasterIndex = 0;

    var getMasterValue = function () {
        return false;
    };

    var generateMasterValue = function () {
        getMasterValue = function () {
            return "master" + (lastMasterIndex);
        };
        lastMasterIndex++;
        return getMasterValue();
    };

    var finalTemplate = "";

    return {
        scope: false,
        restrict: "E",
        compile: function (element, attrs) {

            return {
                post: function (scope) {
                    finalTemplate = master(" ng-model=\"hey\" ", "I'm a master !") + child("", "I'm a child !");

                    console.log($compile(finalTemplate)(scope));
                }
            }
        },
        template: function () {
            finalTemplate = master(" ng-model=\"hey\" ", "I'm a master !") + child("", "I'm a child !");

            return finalTemplate;
        }
    }
});


angApp.controller("ctrl", function ($scope, $compile, $rootScope, $timeout) {
    $scope.l = console.log;

});

function getScope() {
    return angular.element('[ng-controller]').scope();
}

s = getScope;

