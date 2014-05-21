/**
 * GeoProjection
 */
angular.module('charts.geo').factory('GeoProjection', function () {

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
     * Zoom the projection to the width and height
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
    GeoProjection.prototype.zoom = function (path, feature, width, height, scale) {
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
     * Zoom the projection to the width and height
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
    Conic.prototype.zoom = function (path, feature, width, height, scale) {
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
    // GeoProjectionFactory.types[AlbersUSA.type] = AlbersUSA;
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
}])
.factory('GeoProjectionFactory2', ['Airy', 'Aitoff', 'Armadillo', 'August', 'Baker', 'BerghausStar', 'BoggsEumorphic',
    'Bonne', 'Bromley', 'Chamberlin', 'Collignon', 'Craig', 'Craster', 'CylindricalEqualArea',
    'CylindricalStereographic', 'Eckert1', 'Eckert2', 'Eckert3', 'Eckert4', 'Eckert5', 'Eckert6', 'Eisenlohr', 'Fahey',
    'Foucaut', 'Ginzburg4', 'Ginzbug5', 'Ginzbug6', 'Ginzburg8', 'Ginzburg9', 'Gringorten', 'Guyou',
    'Hammer', 'HammerRetroazimuthal', 'HEALPix', 'Hill', 'Homolosine', 'Kavrayskiy7', 'Lagrange', 'Larrivee',
    'Laskowski', 'Littrow', 'Loximuthal', 'Miller', 'ModifiedStereoGraphic', 'Mollweide', 'MtFlatPolarParabolic',
    'MtFlatPolarQuartic', 'MtFlatPolarSinusoidal', 'NaturalEarth', 'NellHammer', 'PericeQuincuncial', 'PolyConic',
    'RectangularPolyconic', 'Robinson', 'Satellite', 'Sinusoidal', 'SinuMollweide', 'Times', 'TwoPointAzimuthal',
    'TwoPointEquidistant', 'VanDerGrinten', 'VanDerGrinten2', 'VanDerGrinten3', 'VanDerGrinten4', 'Wagner4', 'Wagner6',
    'Wagner7', 'Wiechel', 'Winkel3',
    function (Airy, Aitoff, Armadillo, August, Baker, BerghausStar, BoggsEumorphic, Bonne, Bromley, Chamberlin,
        Collignon, Craig, Craster, CylindricalEqualArea, CylindricalStereographic, Eckert1, Eckert2, Eckert3, Eckert4,
        Eckert5, Eckert6, Eisenlohr, Fahey, Foucaut, Ginzburg4, Ginzbug5, Ginzbug6, Ginzburg8, Ginzburg9,
        Gringorten, Guyou, Hammer, HammerRetroazimuthal, HEALPix, Hill, Homolosine, Kavrayskiy7, Lagrange, Larrivee,
        Laskowski, Littrow, Loximuthal, Miller, ModifiedStereoGraphic, Mollweide, MtFlatPolarParabolic,
        MtFlatPolarQuartic, MtFlatPolarSinusoidal, NaturalEarth, NellHammer, PericeQuincuncial, PolyConic,
        RectangularPolyconic, Robinson, Satellite, Sinusoidal, SinuMollweide, Times, TwoPointAzimuthal,
        TwoPointEquidistant, VanDerGrinten, VanDerGrinten2, VanDerGrinten3, VanDerGrinten4, Wagner4, Wagner6, Wagner7,
        Wiechel, Winkel3) {

    var GeoProjectionFactory2 = function (data) {};

    GeoProjectionFactory2.types = {};
    GeoProjectionFactory2.types[Airy.type] = Airy;
    GeoProjectionFactory2.types[Aitoff.type] = Aitoff;
    GeoProjectionFactory2.types[Armadillo.type] = Armadillo;
    GeoProjectionFactory2.types[August.type] = August;
    GeoProjectionFactory2.types[Baker.type] = Baker;
    GeoProjectionFactory2.types[BerghausStar.type] = BerghausStar;
    GeoProjectionFactory2.types[BoggsEumorphic.type] = BoggsEumorphic;
    GeoProjectionFactory2.types[Bonne.type] = Bonne;
    GeoProjectionFactory2.types[Bromley.type] = Bromley;
    GeoProjectionFactory2.types[Chamberlin.type] = Chamberlin;
    GeoProjectionFactory2.types[Collignon.type] = Collignon;
    GeoProjectionFactory2.types[Craig.type] = Craig;
    GeoProjectionFactory2.types[Craster.type] = Craster;
    GeoProjectionFactory2.types[CylindricalEqualArea.type] = CylindricalEqualArea;
    GeoProjectionFactory2.types[CylindricalStereographic.type] = CylindricalStereographic;
    GeoProjectionFactory2.types[Eckert1.type] = Eckert1;
    GeoProjectionFactory2.types[Eckert2.type] = Eckert2;
    GeoProjectionFactory2.types[Eckert3.type] = Eckert3;
    GeoProjectionFactory2.types[Eckert4.type] = Eckert4;
    GeoProjectionFactory2.types[Eckert5.type] = Eckert5;
    GeoProjectionFactory2.types[Eckert6.type] = Eckert6;
    GeoProjectionFactory2.types[Eisenlohr.type] = Eisenlohr;
    GeoProjectionFactory2.types[Fahey.type] = Fahey;
    GeoProjectionFactory2.types[Foucaut.type] = Foucaut;
    // GeoProjectionFactory2.types[Gilbert.type] = Gilbert;
    GeoProjectionFactory2.types[Ginzburg4.type] = Ginzburg4;
    GeoProjectionFactory2.types[Ginzbug5.type] = Ginzbug5;
    GeoProjectionFactory2.types[Ginzbug6.type] = Ginzbug6;
    GeoProjectionFactory2.types[Ginzburg8.type] = Ginzburg8;
    GeoProjectionFactory2.types[Ginzburg9.type] = Ginzburg9;
    GeoProjectionFactory2.types[Gringorten.type] = Gringorten;
    GeoProjectionFactory2.types[Guyou.type] = Guyou;
    GeoProjectionFactory2.types[Hammer.type] = Hammer;
    GeoProjectionFactory2.types[HammerRetroazimuthal.type] = HammerRetroazimuthal;
    GeoProjectionFactory2.types[HEALPix.type] = HEALPix;
    GeoProjectionFactory2.types[Hill.type] = Hill;
    GeoProjectionFactory2.types[Homolosine.type] = Homolosine;
    GeoProjectionFactory2.types[Kavrayskiy7.type] = Kavrayskiy7;
    GeoProjectionFactory2.types[Lagrange.type] = Lagrange;
    GeoProjectionFactory2.types[Larrivee.type] = Larrivee;
    GeoProjectionFactory2.types[Laskowski.type] = Laskowski;
    GeoProjectionFactory2.types[Littrow.type] = Littrow;
    GeoProjectionFactory2.types[Loximuthal.type] = Loximuthal;
    GeoProjectionFactory2.types[Miller.type] = Miller;
    GeoProjectionFactory2.types[ModifiedStereoGraphic.type] = ModifiedStereoGraphic;
    GeoProjectionFactory2.types[Mollweide.type] = Mollweide;
    GeoProjectionFactory2.types[MtFlatPolarParabolic.type] = MtFlatPolarParabolic;
    GeoProjectionFactory2.types[MtFlatPolarQuartic.type] = MtFlatPolarQuartic;
    GeoProjectionFactory2.types[MtFlatPolarSinusoidal.type] = MtFlatPolarSinusoidal;
    GeoProjectionFactory2.types[NaturalEarth.type] = NaturalEarth;
    GeoProjectionFactory2.types[NellHammer.type] = NellHammer;
    GeoProjectionFactory2.types[PericeQuincuncial.type] = PericeQuincuncial;
    GeoProjectionFactory2.types[PolyConic.type] = PolyConic;
    GeoProjectionFactory2.types[RectangularPolyconic.type] = RectangularPolyconic;
    GeoProjectionFactory2.types[Robinson.type] = Robinson;
    GeoProjectionFactory2.types[Satellite.type] = Satellite;
    GeoProjectionFactory2.types[Sinusoidal.type] = Sinusoidal;
    GeoProjectionFactory2.types[SinuMollweide.type] = SinuMollweide;
    GeoProjectionFactory2.types[Times.type] = Times;
    GeoProjectionFactory2.types[TwoPointAzimuthal.type] = TwoPointAzimuthal;
    GeoProjectionFactory2.types[TwoPointEquidistant.type] = TwoPointEquidistant;
    GeoProjectionFactory2.types[VanDerGrinten.type] = VanDerGrinten;
    GeoProjectionFactory2.types[VanDerGrinten2.type] = VanDerGrinten2;
    GeoProjectionFactory2.types[VanDerGrinten3.type] = VanDerGrinten3;
    GeoProjectionFactory2.types[VanDerGrinten4.type] = VanDerGrinten4;
    GeoProjectionFactory2.types[Wagner4.type] = Wagner4;
    GeoProjectionFactory2.types[Wagner6.type] = Wagner6;
    GeoProjectionFactory2.types[Wagner7.type] = Wagner7;
    GeoProjectionFactory2.types[Wiechel.type] = Wiechel;
    GeoProjectionFactory2.types[Winkel3.type] = Winkel3;

    GeoProjectionFactory2.create = function (data) {
        if (data.type in GeoProjectionFactory2.types) {
            return new GeoProjectionFactory2.types[data.type](data);
        }
        return new Airy(data);
    };

    return GeoProjectionFactory2;
}]);