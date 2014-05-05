/**
 * GeoProjection
 */
angular.module('charts').factory('GeoProjection', function () {

    var GeoProjection = function (data) {
        angular.extend(this, data);
    };

    /**
     * Get type
     * @return {String}
     */
    GeoProjection.prototype.getType = function () {
        return this.type;
    };

    /**
     * Get name
     * @return {String}
     */
    GeoProjection.prototype.getName = function () {
        return this.name;
    };

    /**
     * Get the type of projection
     * @return {d3.geo.projection}
     */
    GeoProjection.prototype.getProjection = function () {
        return this.projection;
    };

    /**
     * Scale the projection to the width and height
     *
     * Based on:
     * http://stackoverflow.com/questions/14492284/center-a-map-in-d3-given-a-geojson-object
     *
     *
     * @param {*} feature (topojson)
     * @param {Integer} width
     * #param {Integer} height
     * @param {Float} scale
     * @return {d3.geo.projection}
     */
    GeoProjection.prototype.scale = function (path, feature, width, height, scale) {
        // Reset scale & translate
        path.projection().scale(1).translate([0, 0]);
        // Calculate new position
        var b = path.bounds(feature),
            s = (scale || 0.95) / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height),
            t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];
        return path.projection().scale(s).translate(t);
    };

    return GeoProjection;

})
.factory('Conic', ['GeoProjection', function (GeoProjection) {

    var Conic = function (data) {
        GeoProjection.call(this, data);
    };
    Conic.prototype = Object.create(GeoProjection.prototype);

    /**
     * Scale the projection to the width and height
     * @param {*} feature (topojson)
     * @param {Integer} width
     * #param {Integer} height
     * @param {Float} scale
     * @return {d3.geo.projection}
     */
    Conic.prototype.scale = function (path, feature, width, height, scale) {
        // Reset scale & translate
        path.projection().scale(1).translate([0, 0]);
        // Calculate new position
        var bounds = d3.geo.bounds(feature),
            b = path.bounds(feature),
            s = (scale || 0.95) / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
        return path.projection()
            .rotate([-(bounds[0][0] + bounds[1][0]) / 2, 0])
            .center([0, (bounds[0][1] + bounds[1][1]) / 2])
            .translate([width / 2, height / 2])
            .scale(s);
    };

    return Conic;
}])
.factory('GeoProjectionFactory', ['Albers', 'AlbersUSA', 'AzimuthalEqualArea', 'AzimuthalEquiDistant', 'ConicConformal',
    'ConicEqualArea', 'ConicEquiDistant', 'EquiRectangular', 'Gnomonic', 'Mercator', 'Orthographic', 'Stereographic',
    'TransverseMercator',
    function (Albers, AlbersUSA, AzimuthalEqualArea, AzimuthalEquiDistant, ConicConformal, ConicEqualArea,
        ConicEquiDistant, EquiRectangular, Gnomonic, Mercator, Orthographic, Stereographic, TransverseMercator) {

    var GeoProjectionFactory = function (data) {};

    GeoProjectionFactory.types = {};
    GeoProjectionFactory.types[Mercator.type] = Mercator;
    GeoProjectionFactory.types[AlbersUSA.type] = AlbersUSA;
    GeoProjectionFactory.types[Albers.type] = Albers;
    GeoProjectionFactory.types[AzimuthalEqualArea.type] = AzimuthalEqualArea;
    GeoProjectionFactory.types[AzimuthalEquiDistant.type] = AzimuthalEquiDistant;
    GeoProjectionFactory.types[ConicConformal.type] = ConicConformal;
    GeoProjectionFactory.types[ConicEqualArea.type] = ConicEqualArea;
    GeoProjectionFactory.types[ConicEquiDistant.type] = ConicEquiDistant;
    GeoProjectionFactory.types[EquiRectangular.type] = EquiRectangular;
    GeoProjectionFactory.types[Gnomonic.type] = Gnomonic;
    GeoProjectionFactory.types[Orthographic.type] = Orthographic;
    GeoProjectionFactory.types[Stereographic.type] = Stereographic;
    GeoProjectionFactory.types[TransverseMercator.type] = TransverseMercator;

    GeoProjectionFactory.create = function (data) {
        if (data.type in GeoProjectionFactory.types) {
            return new GeoProjectionFactory.types[data.type](data);
        }
        return new Mercator(data);
    };

    return GeoProjectionFactory;
}]);