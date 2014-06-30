angular.module('charts').controller('Example3Ctrl', ['$scope', function ($scope) {

    var Attribute = function (data) {
        this.update = angular.noop;
        angular.extend(this, data);
    };
    Attribute.prototype.getValueOrDefault = function () {
        return this.value !== null && typeof this.value !== 'undefined' ? this.value : this.defaultValue;
    };
    Attribute.prototype.updateChart = function (chart) {
        this.update(chart);
    }

    $scope.attributes = {
        gap : new Attribute({
            name : 'Gap',
            defaultValue : 5,
            min : 0,
            type: 'number',
            update: function (chart) { chart.gap(this.getValueOrDefault()); }
        }),
        externalRadiusPadding : new Attribute({
            name : 'External Radius Padding',
            defaultValue : 30,
            type: 'number',
            update: function (chart) { chart.externalRadiusPadding(this.getValueOrDefault()); }
        }),
        innerRadiusPercentage : new Attribute({
            name : 'Inner Radius Percentage',
            defaultValue : 0.9,
            min: 0,
            max: 1,
            step: 0.05,
            type: 'number',
            update: function (chart) { chart.innerRadiusPercentage(this.getValueOrDefault()); }
        }),
        domainMax : new Attribute({
            name : 'Maximum Value',
            defaultValue : 100,
            type: 'number',
            update: function (chart) { chart.domain()[1] = this.getValueOrDefault(); }
        }),
        domainMin : new Attribute({
            name : 'Minimum Value',
            defaultValue : 0,
            type: 'number',
            update: function (chart) { chart.domain()[0] = this.getValueOrDefault(); }
        }),
        labelPadding : new Attribute({
            name : 'Label Padding',
            defaultValue : 3,
            type: 'number',
            update: function (chart) { chart.labelPadding(this.getValueOrDefault()); }
        }),
        marginTop : new Attribute({
            name : 'Margin Top',
            defaultValue : 0,
            type: 'number',
            update: function (chart) { chart.margins().top = this.getValueOrDefault(); }
        }),
        marginBottom : new Attribute({
            name : 'Margin Bottom',
            defaultValue : 35,
            type: 'number',
            update: function (chart) { chart.margins().bottom = this.getValueOrDefault(); }
        }),
        marginLeft : new Attribute({
            name : 'Margin Left',
            defaultValue : 0,
            type: 'number',
            update: function (chart) { chart.margins().left = this.getValueOrDefault(); }
        }),
        marginRight : new Attribute({
            name : 'Margin Right',
            defaultValue : 0,
            type: 'number',
            update: function (chart) { chart.margins().right = this.getValueOrDefault(); }
        }),
        maxAngle : new Attribute({
            name : 'Maximum Angle',
            defaultValue : 90,
            type: 'number',
            update: function (chart) { chart.maxAngle(this.getValueOrDefault()); }
        }),
        minAngle : new Attribute({
            name : 'Minimum Angle',
            defaultValue : -90,
            type: 'number',
            update: function (chart) { chart.minAngle(this.getValueOrDefault()); }
        }),
        needleLengthPercentage : new Attribute({
            name : 'Needle Length (% of Radius)',
            defaultValue : 0.9,
            min: 0,
            max: 1,
            step: 0.05,
            type: 'number',
            update: function (chart) { chart.needleLengthPercentage(this.getValueOrDefault()); }
        }),
        needleRadius : new Attribute({
            name : 'Needle Radius',
            defaultValue : 15,
            min: 0,
            type: 'number',
            update: function (chart) { chart.needleRadius(this.getValueOrDefault()); }
        }),
        renderLabel : new Attribute({
            name : 'Render Labels',
            defaultValue : true,
            type: 'checkbox',
            update: function (chart) { chart.renderLabel(this.getValueOrDefault()); }
        }),
        slices : new Attribute({
            name : 'Slices',
            defaultValue : 5,
            min : 0,
            type: 'number',
            update: function (chart) { chart.slices(this.getValueOrDefault()); }
        }),
        text : new Attribute({
            name : 'Text',
            defaultValue : 'Foo Bar',
            type: 'text',
            update: function (chart) { chart.text(this.getValueOrDefault()); }
        }),
        textX : new Attribute({
            name : 'Text X',
            defaultValue : 0,
            type: 'number',
            update: function (chart) { chart.textX(this.getValueOrDefault()); }
        }),
        textY : new Attribute({
            name : 'Text Y',
            defaultValue : 30,
            type: 'number',
            update: function (chart) { chart.textY(this.getValueOrDefault()); }
        }),
        textRotation : new Attribute({
            name : 'Text Rotation',
            defaultValue : 0,
            type: 'number',
            update: function (chart) { chart.textRotation(this.getValueOrDefault()); }
        }),
        value : new Attribute({
            name : 'Value',
            defaultValue : 50,
            type: 'number',
            update: function (chart) { chart.needleValue(this.getValueOrDefault()); }
        })
    };

    // Chart 1
    var index = crossfilter([]);
    var dimension1 = index,
        group1 = dimension1.groupAll(),
        chart1 = dc.gauge('#chart1')
        .width(700)
        .height(600)
        .dimension(dimension1)
        .group(group1);

    $scope.updateAttributes = function (attribute, render) {
        if (attribute) {
            attribute.updateChart(chart1);
        } else {
            for (var key in $scope.attributes) {
                $scope.attributes[key].updateChart(chart1);
            }
        }

        if (render) {
            chart1.render();
        } else {
            chart1.redraw();
        }
    };

    $scope.updateAttributes(null, true);
}]);
