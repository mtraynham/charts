angular.module('charts').controller('Example3Ctrl', ['$scope', function($scope) {

    var Attribute = function(data) {
        angular.extend(this, data);
    };
    Attribute.prototype.getValueOrDefault = function() {
        return this.value ? this.value : this.defaultValue;
    };

    $scope.attributes = {
        gap : new Attribute({
            name : "Gap",
            defaultValue : 1,
            min : 0,
            type: "number"
        }),
        externalLabelRadius : new Attribute({
            name : "External Label Radius",
            defaultValue : 5,
            type: "number"
        }),
        innerRadiusPercentage : new Attribute({
            name : "Inner Radius Percentage",
            defaultValue : 0.5,
            min: 0,
            max: 1,
            step: 0.05,
            type: "number"
        }),
        domainMax : new Attribute({
            name : "Maximum Value",
            defaultValue : 100,
            type: "number"
        }),
        domainMin : new Attribute({
            name : "Minimum Value",
            defaultValue : 0,
            type: "number"
        }),
        maxAngle : new Attribute({
            name : "Maximum Angle",
            defaultValue : 90,
            type: "number"
        }),
        minAngle : new Attribute({
            name : "Minimum Angle",
            defaultValue : -90,
            type: "number"
        }),
        renderLabel : new Attribute({
            name : "Render Labels",
            defaultValue : false,
            type: "checkbox"
        }),
        slices : new Attribute({
            name : "Slices",
            defaultValue : 5,
            min : 0,
            type: "number"
        }),
        value : new Attribute({
            name : "Value",
            defaultValue : 50,
            type: "number"
        })
    };

    // Chart 1
    var index = crossfilter([]);
    var dimension1 = index,
        group1 = dimension1.groupAll(),
        chart1 = dc.gauge("#chart1")
        .width(500)
        .height(300)
        .dimension(dimension1)
        .group(group1);

    $scope.updateAttributes = function(render) {
        chart1.gap($scope.attributes.gap.getValueOrDefault());
        chart1.domain([ $scope.attributes.domainMin.getValueOrDefault(), $scope.attributes.domainMax.getValueOrDefault() ]);
        chart1.externalLabelRadius($scope.attributes.externalLabelRadius.getValueOrDefault());
        chart1.innerRadiusPercentage($scope.attributes.innerRadiusPercentage.getValueOrDefault());
        chart1.maxAngle($scope.attributes.maxAngle.getValueOrDefault());
        chart1.minAngle($scope.attributes.minAngle.getValueOrDefault());
        chart1.renderLabel($scope.attributes.renderLabel.getValueOrDefault());
        chart1.slices($scope.attributes.slices.getValueOrDefault());
        if(render) {
            chart1.render();
        } else {
            chart1.redraw();
        }
    };

    $scope.updateAttributes(true);
}]);
