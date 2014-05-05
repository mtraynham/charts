/**
 * GeoConfig
 */
angular.module('charts').factory('GeoConfig', function () {

    var GeoConfig = function (data) {
        this.name = "location";

        angular.extend(this, data);
    };

    /**
     * Get name
     * @return {String}
     */
    GeoConfig.prototype.getName = function () {
        return this.name;
    };

    /**
     * Get fileName
     * @return {String}
     */
    GeoConfig.prototype.getFileName = function () {
        return this.fileName;
    };

    /**
     * Get geomerty accessor
     * @return {Function}
     */
    GeoConfig.prototype.getFeatureAccessor = function () {
        return this.featureAccessor;
    };

    /**
     * Get key accessor
     * @return {Function}
     */
    GeoConfig.prototype.getKeyAccessor = function () {
        return this.keyAccessor;
    };

    /**
     * Set features
     * @param {[*]}
     */
    GeoConfig.prototype.setFeatures = function (features) {
        this.features = features;
    };

    /**
     * Get features
     * @return {[*]}
     */
    GeoConfig.prototype.getFeatures = function () {
        return this.features;
    };

    return GeoConfig;
});