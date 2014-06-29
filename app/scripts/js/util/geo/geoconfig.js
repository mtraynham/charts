/**
 * GeoConfig
 */
angular.module('charts.geo').factory('GeoConfig', function () {

    var GeoConfig = function (data) {
        this.name = 'location';

        angular.extend(this, data);
    };

    /**
     * Get id
     * @return {String}
     */
    GeoConfig.prototype.getId = function () {
        return this.id;
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
     * Get title accessor
     * @return {Function}
     */
    GeoConfig.prototype.getTitleAccessor = function () {
        return this.titleAccessor;
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