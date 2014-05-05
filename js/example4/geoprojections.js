/**
 * Albers Projection
 */
angular.module('charts').factory('Albers', ['GeoProjection', function (GeoProjection) {

    var Albers = function (data) {
        GeoProjection.call(this, data);
    };
    Albers.prototype = Object.create(GeoProjection.prototype);

    Albers.type = Albers.prototype.type = "albers";
    Albers.prototype.name = "Albers";
    Albers.prototype.projection = d3.geo.albers();

    return Albers;
}]);

/**
 * AlbersUSA Projection
 */
angular.module('charts').factory('AlbersUSA', ['GeoProjection', function (GeoProjection) {

    var AlbersUSA = function (data) {
        GeoProjection.call(this, data);
    };
    AlbersUSA.prototype = Object.create(GeoProjection.prototype);

    AlbersUSA.type = AlbersUSA.prototype.type = "albersUsa";
    AlbersUSA.prototype.name = "Albers USA";
    AlbersUSA.prototype.projection = d3.geo.albersUsa();

    return AlbersUSA;
}]);

/**
 * AzimuthalEqualArea Projection
 */
angular.module('charts').factory('AzimuthalEqualArea', ['GeoProjection', function (GeoProjection) {

    var AzimuthalEqualArea = function (data) {
        GeoProjection.call(this, data);
    };
    AzimuthalEqualArea.prototype = Object.create(GeoProjection.prototype);

    AzimuthalEqualArea.type = AzimuthalEqualArea.prototype.type = "azimuthalEqualArea";
    AzimuthalEqualArea.prototype.name = "Azimuthal Equal Area";
    AzimuthalEqualArea.prototype.projection = d3.geo.azimuthalEqualArea();

    return AzimuthalEqualArea;
}]);

/**
 * AzimuthalEquiDistant Projection
 */
angular.module('charts').factory('AzimuthalEquiDistant', ['GeoProjection', function (GeoProjection) {

    var AzimuthalEquiDistant = function (data) {
        GeoProjection.call(this, data);
    };
    AzimuthalEquiDistant.prototype = Object.create(GeoProjection.prototype);

    AzimuthalEquiDistant.type = AzimuthalEquiDistant.prototype.type = "azimuthalEquidistant";
    AzimuthalEquiDistant.prototype.name = "Azimuthal Equi-Distant";
    AzimuthalEquiDistant.prototype.projection = d3.geo.azimuthalEquidistant();

    return AzimuthalEquiDistant;
}]);

/**
 * Conic Conformal Projection
 */
angular.module('charts').factory('ConicConformal', ['Conic', function (Conic) {

    var ConicConformal = function (data) {
        Conic.call(this, data);
    };
    ConicConformal.prototype = Object.create(Conic.prototype);

    ConicConformal.type = ConicConformal.prototype.type = "conicConformal";
    ConicConformal.prototype.name = "Conic Conformal";
    ConicConformal.prototype.projection = d3.geo.conicConformal();

    return ConicConformal;
}]);

/**
 * Conic Equal Area Projection
 */
angular.module('charts').factory('ConicEqualArea', ['Conic', function (Conic) {

    var ConicEqualArea = function (data) {
        Conic.call(this, data);
    };
    ConicEqualArea.prototype = Object.create(Conic.prototype);

    ConicEqualArea.type = ConicEqualArea.prototype.type = "conicEqualArea";
    ConicEqualArea.prototype.name = "Conic Equal Area";
    ConicEqualArea.prototype.projection = d3.geo.conicEqualArea();

    return ConicEqualArea;
}]);

/**
 * Conic Equi-Distant Projection
 */
angular.module('charts').factory('ConicEquiDistant', ['Conic', function (Conic) {

    var ConicEquiDistant = function (data) {
        Conic.call(this, data);
    };
    ConicEquiDistant.prototype = Object.create(Conic.prototype);

    ConicEquiDistant.type = ConicEquiDistant.prototype.type = "conicEquidistant";
    ConicEquiDistant.prototype.name = "Conic Equi-Distant";
    ConicEquiDistant.prototype.projection = d3.geo.conicEquidistant();

    return ConicEquiDistant;
}]);

/**
 * Equi-Rectangular Projection
 */
angular.module('charts').factory('EquiRectangular', ['GeoProjection', function (GeoProjection) {

    var EquiRectangular = function (data) {
        GeoProjection.call(this, data);
    };
    EquiRectangular.prototype = Object.create(GeoProjection.prototype);

    EquiRectangular.type = EquiRectangular.prototype.type = "equirectangular";
    EquiRectangular.prototype.name = "Equi-Rectangular";
    EquiRectangular.prototype.projection = d3.geo.equirectangular();

    return EquiRectangular;
}]);

/**
 * Gnomonic Projection
 */
angular.module('charts').factory('Gnomonic', ['GeoProjection', function (GeoProjection) {

    var Gnomonic = function (data) {
        GeoProjection.call(this, data);
    };
    Gnomonic.prototype = Object.create(GeoProjection.prototype);

    Gnomonic.type = Gnomonic.prototype.type = "gnomonic";
    Gnomonic.prototype.name = "Gnomonic";
    Gnomonic.prototype.projection = d3.geo.gnomonic();

    return Gnomonic;
}]);

/**
 * Mercator Projection
 */
angular.module('charts').factory('Mercator', ['GeoProjection', function (GeoProjection) {

    var Mercator = function (data) {
        GeoProjection.call(this, data);
    };
    Mercator.prototype = Object.create(GeoProjection.prototype);

    Mercator.type = Mercator.prototype.type = "mercator";
    Mercator.prototype.name = "Mercator";
    Mercator.prototype.projection = d3.geo.mercator();

    return Mercator;
}]);

/**
 * Orthographic Projection
 */
angular.module('charts').factory('Orthographic', ['GeoProjection', function (GeoProjection) {

    var Orthographic = function (data) {
        GeoProjection.call(this, data);
    };
    Orthographic.prototype = Object.create(GeoProjection.prototype);

    Orthographic.type = Orthographic.prototype.type = "orthographic";
    Orthographic.prototype.name = "Orthographic";
    Orthographic.prototype.projection = d3.geo.orthographic();

    return Orthographic;
}]);

/**
 * Stereographic Projection
 */
angular.module('analytics.core.geo').factory('Stereographic', ['GeoProjection', function (GeoProjection) {

    var Stereographic = function (data) {
        GeoProjection.call(this, data);
    };
    Stereographic.prototype = Object.create(GeoProjection.prototype);

    Stereographic.type = Stereographic.prototype.type = "stereographic";
    Stereographic.prototype.name = "Stereographic";
    Stereographic.prototype.projection = d3.geo.stereographic();

    return Stereographic;
}]);

/**
 * Transverse Mercator Projection
 */
angular.module('charts').factory('TransverseMercator', ['GeoProjection', function (GeoProjection) {

    var TransverseMercator = function (data) {
        GeoProjection.call(this, data);
    };
    TransverseMercator.prototype = Object.create(GeoProjection.prototype);

    TransverseMercator.type = TransverseMercator.prototype.type = "transverseMercator";
    TransverseMercator.prototype.name = "Transverse Mercator";
    TransverseMercator.prototype.projection = d3.geo.transverseMercator();

    return TransverseMercator;
}]);