/**
 * Created by Ahmad Sharif on 16/8,Aug/2016.
 */
function parentOf(elem, isWrappedWithLabel) {
    var levels = (isWrappedWithLabel) ? 2 : 1;
    return $($($(elem)[0]).parents().eq(levels).siblings()[0]).children()
}



/**function to manipulate children groups*/
function ChildrenGroup(linkValue) {
    var group = $('[linked-to=' + linkValue + ']');
    if (!group.length) return false;

    this.allChecked = function () {
        for (var x in group) {
            if (isFinite(x))
                if (!$(group[x]).prop("checked"))
                    return false;
        }
        return true;
    };
    this.allUnchecked = function () {
        for (var x in group) {
            if (isFinite(x))
                if ($(group[x]).prop("checked"))
                    return false;
        }
        return true;
    };
    this.atLeastOneIsChecked = this.allChecked() || !this.allUnchecked();
    this.atLeastOneIsCheckedButNotAll = !this.allChecked() && !this.allUnchecked();
    return this;
}

/**linkTo Directive
 * This directive is supposed to link a master checkbox to children checkboxes
 * useful in checkbox trees
 * usage as attribute : link-to="children" ng-model="master"
 * */
angApp.directive("linkTo", function ($compile, $rootElement) {
    var
        scope = false,
        restrict = "A";


    /**Shortcut to checking group of jQuery checkboxes
     * @param elems jQuery object*/
    function checkGroup(elems) {
        elems.prop("checked", "checked");
    }

    /**Shortcut to unchecking group of jQuery checkboxes
     * @param elems jQuery object*/
    function uncheckGroup(elems) {
        elems.removeProp("checked");
    }


    /** Here is where all the work happens*/
    function compile(element, attrs) {
        var linkTo = attrs.linkTo; //string to link children to
        var linkedElements = $("[linked-to=" + linkTo + "]"); //array of linked elements


        return {
            pre: function preLink(scope) {
                //watch the parent model for changes to apply changes to children accordingly
                scope.$watch(attrs.ngModel, function () {
                    linkedElements = $("[linked-to=" + linkTo + "]");
                    var parentChecked = element.prop("checked");
                    element.removeProp("indeterminate");
                    if (parentChecked)
                        checkGroup(linkedElements);
                    else
                        uncheckGroup(linkedElements);
                });


                //watch all the children to do repective master changes

            },
            post: function postLink(scope) {
                //if one of the children elements has a model, here that model should be updated
                //hence if the child itself is a master and has children , the children would change accordingly
                angular.forEach(linkedElements, function (elem) {
                    var $elem = $(elem);
//                        var elemProp = $elem.prop;
                    var elemModel = $elem.attr("ng-model");
                    if (elemModel) {
                        scope.$watch(attrs.ngModel, function () {
                            scope[elemModel] = scope[attrs.ngModel];
                        });
                    }
//                        watch the children themselves to set indeterminate accordingly

                    function updateMaster(noApply) {
                        var group = new ChildrenGroup(attrs.linkTo);

                        if (group.atLeastOneIsCheckedButNotAll) {
                            element.prop("indeterminate", true);

                        } else {
                            element.prop("indeterminate", false);
                            if (group.allChecked()) {
                                scope[attrs.ngModel] = true;
                            }
                            if (group.allUnchecked()) {
                                scope[attrs.ngModel] = false;
                            }
                            if (!noApply)
                                scope.$apply();
                        }

                        if (attrs.linkedTo) {
                            var newVal = $elem.prop("indeterminate");
                            $("[link-to=" + linkTo + "]").prop("indeterminate", newVal);
                        }

                    }

                    scope.$watch(function () {
                        return $elem.prop("checked");
                    }, function () {
                        updateMaster("noApply");
                    });
                    $elem.bind("change", function () {
                        updateMaster();
                    });
                })

            }
        }
    }

    return {
        scope: scope,
        restrict: restrict,
        compile: compile
    }

});

/**linkedTo Directive
 * This directive is to be used in combination with linkTo Directive
 * The value in this directive tells the checkbox what master checkbox it should follow
 * if master checkbox has link-to="children"
 * then usage as attribute : linked-to="children"
 * */
angApp.directive("linkedTo", function () {
    return {
        scope: false,
        restrict: 'A',
        compile: function (element, attrs) {
            // find master of current child

            return {}
        }
    }
});
