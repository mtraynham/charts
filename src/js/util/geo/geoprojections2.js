/**
 * Airy Projection
 */
angular.module('charts.geo').factory('Airy', ['GeoProjection', function (GeoProjection) {

    var Airy = function (data) {
        GeoProjection.call(this, data);
    };
    Airy.prototype = Object.create(GeoProjection.prototype);

    Airy.type = Airy.prototype.type = "airy";
    Airy.prototype.name = "Airy";
    Airy.prototype.projection = d3.geo.airy();

    return Airy;
}]);

/**
 * Aitoff Projection
 */
angular.module('charts.geo').factory('Aitoff', ['GeoProjection', function (GeoProjection) {

    var Aitoff = function (data) {
        GeoProjection.call(this, data);
    };
    Aitoff.prototype = Object.create(GeoProjection.prototype);

    Aitoff.type = Aitoff.prototype.type = "aitoff";
    Aitoff.prototype.name = "Aitoff";
    Aitoff.prototype.projection = d3.geo.aitoff();

    return Aitoff;
}]);

/**
 * Armadillo Projection
 */
angular.module('charts.geo').factory('Armadillo', ['GeoProjection', function (GeoProjection) {

    var Armadillo = function (data) {
        GeoProjection.call(this, data);
    };
    Armadillo.prototype = Object.create(GeoProjection.prototype);

    Armadillo.type = Armadillo.prototype.type = "armadillo";
    Armadillo.prototype.name = "Armadillo";
    Armadillo.prototype.projection = d3.geo.armadillo();

    return Armadillo;
}]);

/**
 * August Projection
 */
angular.module('charts.geo').factory('August', ['GeoProjection', function (GeoProjection) {

    var August = function (data) {
        GeoProjection.call(this, data);
    };
    August.prototype = Object.create(GeoProjection.prototype);

    August.type = August.prototype.type = "august";
    August.prototype.name = "August";
    August.prototype.projection = d3.geo.august();

    return August;
}]);

/**
 * Baker Projection
 */
angular.module('charts.geo').factory('Baker', ['GeoProjection', function (GeoProjection) {

    var Baker = function (data) {
        GeoProjection.call(this, data);
    };
    Baker.prototype = Object.create(GeoProjection.prototype);

    Baker.type = Baker.prototype.type = "baker";
    Baker.prototype.name = "Baker";
    Baker.prototype.projection = d3.geo.baker();

    return Baker;
}]);

/**
 * BerghausStar Projection
 */
angular.module('charts.geo').factory('BerghausStar', ['GeoProjection', function (GeoProjection) {

    var BerghausStar = function (data) {
        GeoProjection.call(this, data);
    };
    BerghausStar.prototype = Object.create(GeoProjection.prototype);

    BerghausStar.type = BerghausStar.prototype.type = "berghaus";
    BerghausStar.prototype.name = "Berghaus Star";
    BerghausStar.prototype.projection = d3.geo.berghaus();

    return BerghausStar;
}]);

/**
 * BoggsEumorphic Projection
 */
angular.module('charts.geo').factory('BoggsEumorphic', ['GeoProjection', function (GeoProjection) {

    var BoggsEumorphic = function (data) {
        GeoProjection.call(this, data);
    };
    BoggsEumorphic.prototype = Object.create(GeoProjection.prototype);

    BoggsEumorphic.type = BoggsEumorphic.prototype.type = "boggs";
    BoggsEumorphic.prototype.name = "Boggs Eumorphic";
    BoggsEumorphic.prototype.projection = d3.geo.boggs();

    return BoggsEumorphic;
}]);

/**
 * Bonne Projection
 */
angular.module('charts.geo').factory('Bonne', ['GeoProjection', function (GeoProjection) {

    var Bonne = function (data) {
        GeoProjection.call(this, data);
    };
    Bonne.prototype = Object.create(GeoProjection.prototype);

    Bonne.type = Bonne.prototype.type = "bonne";
    Bonne.prototype.name = "Bonne";
    Bonne.prototype.projection = d3.geo.bonne();

    return Bonne;
}]);

/**
 * Bromley Projection
 */
angular.module('charts.geo').factory('Bromley', ['GeoProjection', function (GeoProjection) {

    var Bromley = function (data) {
        GeoProjection.call(this, data);
    };
    Bromley.prototype = Object.create(GeoProjection.prototype);

    Bromley.type = Bromley.prototype.type = "bromley";
    Bromley.prototype.name = "Bromley";
    Bromley.prototype.projection = d3.geo.bromley();

    return Bromley;
}]);

/**
 * Chamberlin Projection
 */
angular.module('charts.geo').factory('Chamberlin', ['GeoProjection', function (GeoProjection) {

    var Chamberlin = function (data) {
        GeoProjection.call(this, data);
    };
    Chamberlin.prototype = Object.create(GeoProjection.prototype);

    Chamberlin.type = Chamberlin.prototype.type = "chamberlin";
    Chamberlin.prototype.name = "Chamberlin";
    Chamberlin.prototype.projection = d3.geo.chamberlin();

    return Chamberlin;
}]);

/**
 * Collignon Projection
 */
angular.module('charts.geo').factory('Collignon', ['GeoProjection', function (GeoProjection) {

    var Collignon = function (data) {
        GeoProjection.call(this, data);
    };
    Collignon.prototype = Object.create(GeoProjection.prototype);

    Collignon.type = Collignon.prototype.type = "collignon";
    Collignon.prototype.name = "Collignon";
    Collignon.prototype.projection = d3.geo.collignon();

    return Collignon;
}]);

/**
 * Craig Projection
 */
angular.module('charts.geo').factory('Craig', ['GeoProjection', function (GeoProjection) {

    var Craig = function (data) {
        GeoProjection.call(this, data);
    };
    Craig.prototype = Object.create(GeoProjection.prototype);

    Craig.type = Craig.prototype.type = "craig";
    Craig.prototype.name = "Craig Retroazimuthal";
    Craig.prototype.projection = d3.geo.craig();

    return Craig;
}]);

/**
 * Craster Projection
 */
angular.module('charts.geo').factory('Craster', ['GeoProjection', function (GeoProjection) {

    var Craster = function (data) {
        GeoProjection.call(this, data);
    };
    Craster.prototype = Object.create(GeoProjection.prototype);

    Craster.type = Craster.prototype.type = "craster";
    Craster.prototype.name = "Craster Parabolic";
    Craster.prototype.projection = d3.geo.craster();

    return Craster;
}]);

/**
 * CylindricalEqualArea Projection
 */
angular.module('charts.geo').factory('CylindricalEqualArea', ['GeoProjection', function (GeoProjection) {

    var CylindricalEqualArea = function (data) {
        GeoProjection.call(this, data);
    };
    CylindricalEqualArea.prototype = Object.create(GeoProjection.prototype);

    CylindricalEqualArea.type = CylindricalEqualArea.prototype.type = "cylindricalEqualArea";
    CylindricalEqualArea.prototype.name = "Cylindrical Equal Area";
    CylindricalEqualArea.prototype.projection = d3.geo.cylindricalEqualArea();

    return CylindricalEqualArea;
}]);

/**
 * CylindricalStereographic Projection
 */
angular.module('charts.geo').factory('CylindricalStereographic', ['GeoProjection', function (GeoProjection) {

    var CylindricalStereographic = function (data) {
        GeoProjection.call(this, data);
    };
    CylindricalStereographic.prototype = Object.create(GeoProjection.prototype);

    CylindricalStereographic.type = CylindricalStereographic.prototype.type = "cylindricalStereographic";
    CylindricalStereographic.prototype.name = "Cylindrical Stereographic";
    CylindricalStereographic.prototype.projection = d3.geo.cylindricalStereographic();

    return CylindricalStereographic;
}]);

/**
 * Eckert1 Projection
 */
angular.module('charts.geo').factory('Eckert1', ['GeoProjection', function (GeoProjection) {

    var Eckert1 = function (data) {
        GeoProjection.call(this, data);
    };
    Eckert1.prototype = Object.create(GeoProjection.prototype);

    Eckert1.type = Eckert1.prototype.type = "eckert1";
    Eckert1.prototype.name = "Eckert1";
    Eckert1.prototype.projection = d3.geo.eckert1();

    return Eckert1;
}]);

/**
 * Eckert2 Projection
 */
angular.module('charts.geo').factory('Eckert2', ['GeoProjection', function (GeoProjection) {

    var Eckert2 = function (data) {
        GeoProjection.call(this, data);
    };
    Eckert2.prototype = Object.create(GeoProjection.prototype);

    Eckert2.type = Eckert2.prototype.type = "eckert2";
    Eckert2.prototype.name = "Eckert2";
    Eckert2.prototype.projection = d3.geo.eckert2();

    return Eckert2;
}]);

/**
 * Eckert3 Projection
 */
angular.module('charts.geo').factory('Eckert3', ['GeoProjection', function (GeoProjection) {

    var Eckert3 = function (data) {
        GeoProjection.call(this, data);
    };
    Eckert3.prototype = Object.create(GeoProjection.prototype);

    Eckert3.type = Eckert3.prototype.type = "eckert3";
    Eckert3.prototype.name = "Eckert3";
    Eckert3.prototype.projection = d3.geo.eckert3();

    return Eckert3;
}]);

/**
 * Eckert4 Projection
 */
angular.module('charts.geo').factory('Eckert4', ['GeoProjection', function (GeoProjection) {

    var Eckert4 = function (data) {
        GeoProjection.call(this, data);
    };
    Eckert4.prototype = Object.create(GeoProjection.prototype);

    Eckert4.type = Eckert4.prototype.type = "eckert4";
    Eckert4.prototype.name = "Eckert4";
    Eckert4.prototype.projection = d3.geo.eckert4();

    return Eckert4;
}]);

/**
 * Eckert5 Projection
 */
angular.module('charts.geo').factory('Eckert5', ['GeoProjection', function (GeoProjection) {

    var Eckert5 = function (data) {
        GeoProjection.call(this, data);
    };
    Eckert5.prototype = Object.create(GeoProjection.prototype);

    Eckert5.type = Eckert5.prototype.type = "eckert5";
    Eckert5.prototype.name = "Eckert5";
    Eckert5.prototype.projection = d3.geo.eckert5();

    return Eckert5;
}]);

/**
 * Eckert6 Projection
 */
angular.module('charts.geo').factory('Eckert6', ['GeoProjection', function (GeoProjection) {

    var Eckert6 = function (data) {
        GeoProjection.call(this, data);
    };
    Eckert6.prototype = Object.create(GeoProjection.prototype);

    Eckert6.type = Eckert6.prototype.type = "eckert6";
    Eckert6.prototype.name = "Eckert6";
    Eckert6.prototype.projection = d3.geo.eckert6();

    return Eckert6;
}]);

/**
 * Eisenlohr Projection
 */
angular.module('charts.geo').factory('Eisenlohr', ['GeoProjection', function (GeoProjection) {

    var Eisenlohr = function (data) {
        GeoProjection.call(this, data);
    };
    Eisenlohr.prototype = Object.create(GeoProjection.prototype);

    Eisenlohr.type = Eisenlohr.prototype.type = "eisenlohr";
    Eisenlohr.prototype.name = "Eisenlohr";
    Eisenlohr.prototype.projection = d3.geo.eisenlohr();

    return Eisenlohr;
}]);

/**
 * Fahey Projection
 */
angular.module('charts.geo').factory('Fahey', ['GeoProjection', function (GeoProjection) {

    var Fahey = function (data) {
        GeoProjection.call(this, data);
    };
    Fahey.prototype = Object.create(GeoProjection.prototype);

    Fahey.type = Fahey.prototype.type = "fahey";
    Fahey.prototype.name = "Fahey";
    Fahey.prototype.projection = d3.geo.fahey();

    return Fahey;
}]);

/**
 * Foucaut Projection
 */
angular.module('charts.geo').factory('Foucaut', ['GeoProjection', function (GeoProjection) {

    var Foucaut = function (data) {
        GeoProjection.call(this, data);
    };
    Foucaut.prototype = Object.create(GeoProjection.prototype);

    Foucaut.type = Foucaut.prototype.type = "foucaut";
    Foucaut.prototype.name = "Foucaut";
    Foucaut.prototype.projection = d3.geo.foucaut();

    return Foucaut;
}]);

/**
 * Gilbert Projection
 */
angular.module('charts.geo').factory('Gilbert', ['GeoProjection', function (GeoProjection) {

    var Gilbert = function (data) {
        GeoProjection.call(this, data);
    };
    Gilbert.prototype = Object.create(GeoProjection.prototype);

    Gilbert.type = Gilbert.prototype.type = "gilbert";
    Gilbert.prototype.name = "Gilbert";
    Gilbert.prototype.projection = d3.geo.gilbert();

    return Gilbert;
}]);

/**
 * Ginzburg4 Projection
 */
angular.module('charts.geo').factory('Ginzburg4', ['GeoProjection', function (GeoProjection) {

    var Ginzburg4 = function (data) {
        GeoProjection.call(this, data);
    };
    Ginzburg4.prototype = Object.create(GeoProjection.prototype);

    Ginzburg4.type = Ginzburg4.prototype.type = "ginzburg4";
    Ginzburg4.prototype.name = "Ginzburg4";
    Ginzburg4.prototype.projection = d3.geo.ginzburg4();

    return Ginzburg4;
}]);

/**
 * Ginzbug5 Projection
 */
angular.module('charts.geo').factory('Ginzbug5', ['GeoProjection', function (GeoProjection) {

    var Ginzbug5 = function (data) {
        GeoProjection.call(this, data);
    };
    Ginzbug5.prototype = Object.create(GeoProjection.prototype);

    Ginzbug5.type = Ginzbug5.prototype.type = "ginzburg5";
    Ginzbug5.prototype.name = "Ginzbug5";
    Ginzbug5.prototype.projection = d3.geo.ginzburg5();

    return Ginzbug5;
}]);

/**
 * Ginzbug6 Projection
 */
angular.module('charts.geo').factory('Ginzbug6', ['GeoProjection', function (GeoProjection) {

    var Ginzbug6 = function (data) {
        GeoProjection.call(this, data);
    };
    Ginzbug6.prototype = Object.create(GeoProjection.prototype);

    Ginzbug6.type = Ginzbug6.prototype.type = "ginzburg6";
    Ginzbug6.prototype.name = "Ginzburg6";
    Ginzbug6.prototype.projection = d3.geo.ginzburg6();

    return Ginzbug6;
}]);

/**
 * Ginzburg8 Projection
 */
angular.module('charts.geo').factory('Ginzburg8', ['GeoProjection', function (GeoProjection) {

    var Ginzburg8 = function (data) {
        GeoProjection.call(this, data);
    };
    Ginzburg8.prototype = Object.create(GeoProjection.prototype);

    Ginzburg8.type = Ginzburg8.prototype.type = "ginzburg8";
    Ginzburg8.prototype.name = "Ginzburg8";
    Ginzburg8.prototype.projection = d3.geo.ginzburg8();

    return Ginzburg8;
}]);

/**
 * Ginzburg9 Projection
 */
angular.module('charts.geo').factory('Ginzburg9', ['GeoProjection', function (GeoProjection) {

    var Ginzburg9 = function (data) {
        GeoProjection.call(this, data);
    };
    Ginzburg9.prototype = Object.create(GeoProjection.prototype);

    Ginzburg9.type = Ginzburg9.prototype.type = "ginzburg9";
    Ginzburg9.prototype.name = "Ginzburg9";
    Ginzburg9.prototype.projection = d3.geo.ginzburg9();

    return Ginzburg9;
}]);

/**
 * Gringorten Projection
 */
angular.module('charts.geo').factory('Gringorten', ['GeoProjection', function (GeoProjection) {

    var Gringorten = function (data) {
        GeoProjection.call(this, data);
    };
    Gringorten.prototype = Object.create(GeoProjection.prototype);

    Gringorten.type = Gringorten.prototype.type = "gringorten";
    Gringorten.prototype.name = "Gringorten";
    Gringorten.prototype.projection = d3.geo.gringorten();

    return Gringorten;
}]);

/**
 * Guyou Projection
 */
angular.module('charts.geo').factory('Guyou', ['GeoProjection', function (GeoProjection) {

    var Guyou = function (data) {
        GeoProjection.call(this, data);
    };
    Guyou.prototype = Object.create(GeoProjection.prototype);

    Guyou.type = Guyou.prototype.type = "guyou";
    Guyou.prototype.name = "Guyou";
    Guyou.prototype.projection = d3.geo.guyou();

    return Guyou;
}]);

/**
 * Hammer Projection
 */
angular.module('charts.geo').factory('Hammer', ['GeoProjection', function (GeoProjection) {

    var Hammer = function (data) {
        GeoProjection.call(this, data);
    };
    Hammer.prototype = Object.create(GeoProjection.prototype);

    Hammer.type = Hammer.prototype.type = "hammer";
    Hammer.prototype.name = "Hammer";
    Hammer.prototype.projection = d3.geo.hammer();

    return Hammer;
}]);

/**
 * HammerRetroazimuthal Projection
 */
angular.module('charts.geo').factory('HammerRetroazimuthal', ['GeoProjection', function (GeoProjection) {

    var HammerRetroazimuthal = function (data) {
        GeoProjection.call(this, data);
    };
    HammerRetroazimuthal.prototype = Object.create(GeoProjection.prototype);

    HammerRetroazimuthal.type = HammerRetroazimuthal.prototype.type = "hammerRetroazimuthal";
    HammerRetroazimuthal.prototype.name = "Hammer Retroazimuthal";
    HammerRetroazimuthal.prototype.projection = d3.geo.hammerRetroazimuthal();

    return HammerRetroazimuthal;
}]);

/**
 * HEALPix Projection
 */
angular.module('charts.geo').factory('HEALPix', ['GeoProjection', function (GeoProjection) {

    var HEALPix = function (data) {
        GeoProjection.call(this, data);
    };
    HEALPix.prototype = Object.create(GeoProjection.prototype);

    HEALPix.type = HEALPix.prototype.type = "healpix";
    HEALPix.prototype.name = "HEALPix";
    HEALPix.prototype.projection = d3.geo.healpix();

    return HEALPix;
}]);

/**
 * Hill Projection
 */
angular.module('charts.geo').factory('Hill', ['GeoProjection', function (GeoProjection) {

    var Hill = function (data) {
        GeoProjection.call(this, data);
    };
    Hill.prototype = Object.create(GeoProjection.prototype);

    Hill.type = Hill.prototype.type = "hill";
    Hill.prototype.name = "Hill";
    Hill.prototype.projection = d3.geo.hill();

    return Hill;
}]);

/**
 * Homolosine Projection
 */
angular.module('charts.geo').factory('Homolosine', ['GeoProjection', function (GeoProjection) {

    var Homolosine = function (data) {
        GeoProjection.call(this, data);
    };
    Homolosine.prototype = Object.create(GeoProjection.prototype);

    Homolosine.type = Homolosine.prototype.type = "homolosine";
    Homolosine.prototype.name = "Homolosine";
    Homolosine.prototype.projection = d3.geo.homolosine();

    return Homolosine;
}]);

/**
 * Kavrayskiy7 Projection
 */
angular.module('charts.geo').factory('Kavrayskiy7', ['GeoProjection', function (GeoProjection) {

    var Kavrayskiy7 = function (data) {
        GeoProjection.call(this, data);
    };
    Kavrayskiy7.prototype = Object.create(GeoProjection.prototype);

    Kavrayskiy7.type = Kavrayskiy7.prototype.type = "kavrayskiy7";
    Kavrayskiy7.prototype.name = "Kavrayskiy7";
    Kavrayskiy7.prototype.projection = d3.geo.kavrayskiy7();

    return Kavrayskiy7;
}]);

/**
 * Lagrange Projection
 */
angular.module('charts.geo').factory('Lagrange', ['GeoProjection', function (GeoProjection) {

    var Lagrange = function (data) {
        GeoProjection.call(this, data);
    };
    Lagrange.prototype = Object.create(GeoProjection.prototype);

    Lagrange.type = Lagrange.prototype.type = "lagrange";
    Lagrange.prototype.name = "Lagrange";
    Lagrange.prototype.projection = d3.geo.lagrange();

    return Lagrange;
}]);

/**
 * Larrivee Projection
 */
angular.module('charts.geo').factory('Larrivee', ['GeoProjection', function (GeoProjection) {

    var Larrivee = function (data) {
        GeoProjection.call(this, data);
    };
    Larrivee.prototype = Object.create(GeoProjection.prototype);

    Larrivee.type = Larrivee.prototype.type = "larrivee";
    Larrivee.prototype.name = "Larrivee";
    Larrivee.prototype.projection = d3.geo.larrivee();

    return Larrivee;
}]);

/**
 * Laskowski Projection
 */
angular.module('charts.geo').factory('Laskowski', ['GeoProjection', function (GeoProjection) {

    var Laskowski = function (data) {
        GeoProjection.call(this, data);
    };
    Laskowski.prototype = Object.create(GeoProjection.prototype);

    Laskowski.type = Laskowski.prototype.type = "laskowski";
    Laskowski.prototype.name = "Laskowski";
    Laskowski.prototype.projection = d3.geo.laskowski();

    return Laskowski;
}]);

/**
 * Littrow Projection
 */
angular.module('charts.geo').factory('Littrow', ['GeoProjection', function (GeoProjection) {

    var Littrow = function (data) {
        GeoProjection.call(this, data);
    };
    Littrow.prototype = Object.create(GeoProjection.prototype);

    Littrow.type = Littrow.prototype.type = "littrow";
    Littrow.prototype.name = "Littrow";
    Littrow.prototype.projection = d3.geo.littrow();

    return Littrow;
}]);

/**
 * Loximuthal Projection
 */
angular.module('charts.geo').factory('Loximuthal', ['GeoProjection', function (GeoProjection) {

    var Loximuthal = function (data) {
        GeoProjection.call(this, data);
    };
    Loximuthal.prototype = Object.create(GeoProjection.prototype);

    Loximuthal.type = Loximuthal.prototype.type = "loximuthal";
    Loximuthal.prototype.name = "Loximuthal";
    Loximuthal.prototype.projection = d3.geo.loximuthal();

    return Loximuthal;
}]);

/**
 * Miller Projection
 */
angular.module('charts.geo').factory('Miller', ['GeoProjection', function (GeoProjection) {

    var Miller = function (data) {
        GeoProjection.call(this, data);
    };
    Miller.prototype = Object.create(GeoProjection.prototype);

    Miller.type = Miller.prototype.type = "miller";
    Miller.prototype.name = "Miller";
    Miller.prototype.projection = d3.geo.miller();

    return Miller;
}]);

/**
 * ModifiedStereoGraphic Projection
 */
angular.module('charts.geo').factory('ModifiedStereoGraphic', ['GeoProjection', function (GeoProjection) {

    var ModifiedStereoGraphic = function (data) {
        GeoProjection.call(this, data);
    };
    ModifiedStereoGraphic.prototype = Object.create(GeoProjection.prototype);

    ModifiedStereoGraphic.type = ModifiedStereoGraphic.prototype.type = "modifiedStereographic";
    ModifiedStereoGraphic.prototype.name = "Modified Stereographic";
    ModifiedStereoGraphic.prototype.projection = d3.geo.modifiedStereographic();

    return ModifiedStereoGraphic;
}]);

/**
 * Mollweide Projection
 */
angular.module('charts.geo').factory('Mollweide', ['GeoProjection', function (GeoProjection) {

    var Mollweide = function (data) {
        GeoProjection.call(this, data);
    };
    Mollweide.prototype = Object.create(GeoProjection.prototype);

    Mollweide.type = Mollweide.prototype.type = "mollweide";
    Mollweide.prototype.name = "Mollweide";
    Mollweide.prototype.projection = d3.geo.mollweide();

    return Mollweide;
}]);

/**
 * MtFlatPolarParabolic Projection
 */
angular.module('charts.geo').factory('MtFlatPolarParabolic', ['GeoProjection', function (GeoProjection) {

    var MtFlatPolarParabolic = function (data) {
        GeoProjection.call(this, data);
    };
    MtFlatPolarParabolic.prototype = Object.create(GeoProjection.prototype);

    MtFlatPolarParabolic.type = MtFlatPolarParabolic.prototype.type = "mtFlatPolarParabolic";
    MtFlatPolarParabolic.prototype.name = "Mt Flat Polar Parabolic";
    MtFlatPolarParabolic.prototype.projection = d3.geo.mtFlatPolarParabolic();

    return MtFlatPolarParabolic;
}]);

/**
 * MtFlatPolarQuartic Projection
 */
angular.module('charts.geo').factory('MtFlatPolarQuartic', ['GeoProjection', function (GeoProjection) {

    var MtFlatPolarQuartic = function (data) {
        GeoProjection.call(this, data);
    };
    MtFlatPolarQuartic.prototype = Object.create(GeoProjection.prototype);

    MtFlatPolarQuartic.type = MtFlatPolarQuartic.prototype.type = "mtFlatPolarQuartic";
    MtFlatPolarQuartic.prototype.name = "Mt Flat Polar Quartic";
    MtFlatPolarQuartic.prototype.projection = d3.geo.mtFlatPolarQuartic();

    return MtFlatPolarQuartic;
}]);

/**
 * MtFlatPolarSinusoidal Projection
 */
angular.module('charts.geo').factory('MtFlatPolarSinusoidal', ['GeoProjection', function (GeoProjection) {

    var MtFlatPolarSinusoidal = function (data) {
        GeoProjection.call(this, data);
    };
    MtFlatPolarSinusoidal.prototype = Object.create(GeoProjection.prototype);

    MtFlatPolarSinusoidal.type = MtFlatPolarSinusoidal.prototype.type = "mtFlatPolarSinusoidal";
    MtFlatPolarSinusoidal.prototype.name = "Mt Flat Polar sinusoidal";
    MtFlatPolarSinusoidal.prototype.projection = d3.geo.mtFlatPolarSinusoidal();

    return MtFlatPolarSinusoidal;
}]);

/**
 * NaturalEarth Projection
 */
angular.module('charts.geo').factory('NaturalEarth', ['GeoProjection', function (GeoProjection) {

    var NaturalEarth = function (data) {
        GeoProjection.call(this, data);
    };
    NaturalEarth.prototype = Object.create(GeoProjection.prototype);

    NaturalEarth.type = NaturalEarth.prototype.type = "naturalEarth";
    NaturalEarth.prototype.name = "Natural Earth";
    NaturalEarth.prototype.projection = d3.geo.naturalEarth();

    return NaturalEarth;
}]);

/**
 * NellHammer Projection
 */
angular.module('charts.geo').factory('NellHammer', ['GeoProjection', function (GeoProjection) {

    var NellHammer = function (data) {
        GeoProjection.call(this, data);
    };
    NellHammer.prototype = Object.create(GeoProjection.prototype);

    NellHammer.type = NellHammer.prototype.type = "nellHammer";
    NellHammer.prototype.name = "Nell Hammer";
    NellHammer.prototype.projection = d3.geo.nellHammer();

    return NellHammer;
}]);

/**
 * PericeQuincuncial Projection
 */
angular.module('charts.geo').factory('PericeQuincuncial', ['GeoProjection', function (GeoProjection) {

    var PericeQuincuncial = function (data) {
        GeoProjection.call(this, data);
    };
    PericeQuincuncial.prototype = Object.create(GeoProjection.prototype);

    PericeQuincuncial.type = PericeQuincuncial.prototype.type = "peirceQuincuncial";
    PericeQuincuncial.prototype.name = "Pierce Quincuncial";
    PericeQuincuncial.prototype.projection = d3.geo.peirceQuincuncial();

    return PericeQuincuncial;
}]);

/**
 * PolyConic Projection
 */
angular.module('charts.geo').factory('PolyConic', ['GeoProjection', function (GeoProjection) {

    var PolyConic = function (data) {
        GeoProjection.call(this, data);
    };
    PolyConic.prototype = Object.create(GeoProjection.prototype);

    PolyConic.type = PolyConic.prototype.type = "polyconic";
    PolyConic.prototype.name = "PolyConic";
    PolyConic.prototype.projection = d3.geo.polyconic();

    return PolyConic;
}]);

/**
 * RectangularPolyconic Projection
 */
angular.module('charts.geo').factory('RectangularPolyconic', ['GeoProjection', function (GeoProjection) {

    var RectangularPolyconic = function (data) {
        GeoProjection.call(this, data);
    };
    RectangularPolyconic.prototype = Object.create(GeoProjection.prototype);

    RectangularPolyconic.type = RectangularPolyconic.prototype.type = "rectangularPolyconic";
    RectangularPolyconic.prototype.name = "Rectangular Polyconic";
    RectangularPolyconic.prototype.projection = d3.geo.rectangularPolyconic();

    return RectangularPolyconic;
}]);

/**
 * Robinson Projection
 */
angular.module('charts.geo').factory('Robinson', ['GeoProjection', function (GeoProjection) {

    var Robinson = function (data) {
        GeoProjection.call(this, data);
    };
    Robinson.prototype = Object.create(GeoProjection.prototype);

    Robinson.type = Robinson.prototype.type = "robinson";
    Robinson.prototype.name = "Robinson";
    Robinson.prototype.projection = d3.geo.robinson();

    return Robinson;
}]);

/**
 * Satellite Projection
 */
angular.module('charts.geo').factory('Satellite', ['GeoProjection', function (GeoProjection) {

    var Satellite = function (data) {
        GeoProjection.call(this, data);
    };
    Satellite.prototype = Object.create(GeoProjection.prototype);

    Satellite.type = Satellite.prototype.type = "satellite";
    Satellite.prototype.name = "Satellite";
    Satellite.prototype.projection = d3.geo.satellite();

    return Satellite;
}]);

/**
 * Sinusoidal Projection
 */
angular.module('charts.geo').factory('Sinusoidal', ['GeoProjection', function (GeoProjection) {

    var Sinusoidal = function (data) {
        GeoProjection.call(this, data);
    };
    Sinusoidal.prototype = Object.create(GeoProjection.prototype);

    Sinusoidal.type = Sinusoidal.prototype.type = "sinusoidal";
    Sinusoidal.prototype.name = "Sinusoidal";
    Sinusoidal.prototype.projection = d3.geo.sinusoidal();

    return Sinusoidal;
}]);

/**
 * SinuMollweide Projection
 */
angular.module('charts.geo').factory('SinuMollweide', ['GeoProjection', function (GeoProjection) {

    var SinuMollweide = function (data) {
        GeoProjection.call(this, data);
    };
    SinuMollweide.prototype = Object.create(GeoProjection.prototype);

    SinuMollweide.type = SinuMollweide.prototype.type = "sinuMollweide";
    SinuMollweide.prototype.name = "Sinu-Mollweide";
    SinuMollweide.prototype.projection = d3.geo.sinuMollweide();

    return SinuMollweide;
}]);

/**
 * Times Projection
 */
angular.module('charts.geo').factory('Times', ['GeoProjection', function (GeoProjection) {

    var Times = function (data) {
        GeoProjection.call(this, data);
    };
    Times.prototype = Object.create(GeoProjection.prototype);

    Times.type = Times.prototype.type = "times";
    Times.prototype.name = "Times";
    Times.prototype.projection = d3.geo.times();

    return Times;
}]);

/**
 * TwoPointAzimuthal Projection
 */
angular.module('charts.geo').factory('TwoPointAzimuthal', ['GeoProjection', function (GeoProjection) {

    var TwoPointAzimuthal = function (data) {
        GeoProjection.call(this, data);
    };
    TwoPointAzimuthal.prototype = Object.create(GeoProjection.prototype);

    TwoPointAzimuthal.type = TwoPointAzimuthal.prototype.type = "twoPointAzimuthal";
    TwoPointAzimuthal.prototype.name = "Two-Point Azimuthal";
    TwoPointAzimuthal.prototype.projection = d3.geo.twoPointAzimuthal();

    return TwoPointAzimuthal;
}]);

/**
 * TwoPointEquidistant Projection
 */
angular.module('charts.geo').factory('TwoPointEquidistant', ['GeoProjection', function (GeoProjection) {

    var TwoPointEquidistant = function (data) {
        GeoProjection.call(this, data);
    };
    TwoPointEquidistant.prototype = Object.create(GeoProjection.prototype);

    TwoPointEquidistant.type = TwoPointEquidistant.prototype.type = "twoPointEquidistant";
    TwoPointEquidistant.prototype.name = "Two-Point Equidistant";
    TwoPointEquidistant.prototype.projection = d3.geo.twoPointEquidistant();

    return TwoPointEquidistant;
}]);

/**
 * VanDerGrinten Projection
 */
angular.module('charts.geo').factory('VanDerGrinten', ['GeoProjection', function (GeoProjection) {

    var VanDerGrinten = function (data) {
        GeoProjection.call(this, data);
    };
    VanDerGrinten.prototype = Object.create(GeoProjection.prototype);

    VanDerGrinten.type = VanDerGrinten.prototype.type = "vanDerGrinten";
    VanDerGrinten.prototype.name = "VanDerGrinten";
    VanDerGrinten.prototype.projection = d3.geo.vanDerGrinten();

    return VanDerGrinten;
}]);

/**
 * VanDerGrinten2 Projection
 */
angular.module('charts.geo').factory('VanDerGrinten2', ['GeoProjection', function (GeoProjection) {

    var VanDerGrinten2 = function (data) {
        GeoProjection.call(this, data);
    };
    VanDerGrinten2.prototype = Object.create(GeoProjection.prototype);

    VanDerGrinten2.type = VanDerGrinten2.prototype.type = "vanDerGrinten2";
    VanDerGrinten2.prototype.name = "VanDerGrinten2";
    VanDerGrinten2.prototype.projection = d3.geo.vanDerGrinten2();

    return VanDerGrinten2;
}]);

/**
 * VanDerGrinten3 Projection
 */
angular.module('charts.geo').factory('VanDerGrinten3', ['GeoProjection', function (GeoProjection) {

    var VanDerGrinten3 = function (data) {
        GeoProjection.call(this, data);
    };
    VanDerGrinten3.prototype = Object.create(GeoProjection.prototype);

    VanDerGrinten3.type = VanDerGrinten3.prototype.type = "vanDerGrinten3";
    VanDerGrinten3.prototype.name = "VanDerGrinten3";
    VanDerGrinten3.prototype.projection = d3.geo.vanDerGrinten3();

    return VanDerGrinten3;
}]);

/**
 * VanDerGrinten4 Projection
 */
angular.module('charts.geo').factory('VanDerGrinten4', ['GeoProjection', function (GeoProjection) {

    var VanDerGrinten4 = function (data) {
        GeoProjection.call(this, data);
    };
    VanDerGrinten4.prototype = Object.create(GeoProjection.prototype);

    VanDerGrinten4.type = VanDerGrinten4.prototype.type = "vanDerGrinten4";
    VanDerGrinten4.prototype.name = "VanDerGrinten4";
    VanDerGrinten4.prototype.projection = d3.geo.vanDerGrinten4();

    return VanDerGrinten4;
}]);

/**
 * Wagner4 Projection
 */
angular.module('charts.geo').factory('Wagner4', ['GeoProjection', function (GeoProjection) {

    var Wagner4 = function (data) {
        GeoProjection.call(this, data);
    };
    Wagner4.prototype = Object.create(GeoProjection.prototype);

    Wagner4.type = Wagner4.prototype.type = "wagner4";
    Wagner4.prototype.name = "Wagner4";
    Wagner4.prototype.projection = d3.geo.wagner4();

    return Wagner4;
}]);

/**
 * Wagner6 Projection
 */
angular.module('charts.geo').factory('Wagner6', ['GeoProjection', function (GeoProjection) {

    var Wagner6 = function (data) {
        GeoProjection.call(this, data);
    };
    Wagner6.prototype = Object.create(GeoProjection.prototype);

    Wagner6.type = Wagner6.prototype.type = "wagner6";
    Wagner6.prototype.name = "Wagner6";
    Wagner6.prototype.projection = d3.geo.wagner6();

    return Wagner6;
}]);

/**
 * Wagner7 Projection
 */
angular.module('charts.geo').factory('Wagner7', ['GeoProjection', function (GeoProjection) {

    var Wagner7 = function (data) {
        GeoProjection.call(this, data);
    };
    Wagner7.prototype = Object.create(GeoProjection.prototype);

    Wagner7.type = Wagner7.prototype.type = "wagner7";
    Wagner7.prototype.name = "Wagner7";
    Wagner7.prototype.projection = d3.geo.wagner7();

    return Wagner7;
}]);

/**
 * Wiechel Projection
 */
angular.module('charts.geo').factory('Wiechel', ['GeoProjection', function (GeoProjection) {

    var Wiechel = function (data) {
        GeoProjection.call(this, data);
    };
    Wiechel.prototype = Object.create(GeoProjection.prototype);

    Wiechel.type = Wiechel.prototype.type = "wiechel";
    Wiechel.prototype.name = "Wiechel";
    Wiechel.prototype.projection = d3.geo.wiechel();

    return Wiechel;
}]);

/**
 * Winkel3 Projection
 */
angular.module('charts.geo').factory('Winkel3', ['GeoProjection', function (GeoProjection) {

    var Winkel3 = function (data) {
        GeoProjection.call(this, data);
    };
    Winkel3.prototype = Object.create(GeoProjection.prototype);

    Winkel3.type = Winkel3.prototype.type = "winkel3";
    Winkel3.prototype.name = "Winkel3";
    Winkel3.prototype.projection = d3.geo.winkel3();

    return Winkel3;
}]);