/**
 * GeoService
 */
angular.module('charts').service('GeoService', ['GeoConfig', 'GeoProjection',
    function (GeoConfig, GeoProjection) {

    // All geo configs
    var configs = d3.map({
        usStates: new GeoConfig({
            name: 'US States',
            fileName: 'vendor/topojsonexports/world-atlas/topo/ne_50m_us_states_lakes.json',
            featureAccessor : function (d) { return d.objects.states; },
            keyAccessor: function (d) { return d.id }
        }),
        usStates1: new GeoConfig({
            name: 'US States 1',
            fileName: 'vendor/natural-earth-topo/topojson/ne_50m_admin_1_states_provinces_lakes_shp.json',
            featureAccessor : function (d) {
                d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries =
                    d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries.filter(function (geo) {
                        return geo.properties.admin === "United States of America";
                    });
                return d.objects['ne_50m_admin_1_states_provinces_lakes_shp'];
            },
            keyAccessor: function (d) { return d.properties.name }
        }),
        canada: new GeoConfig({
            name: 'Canada',
            fileName: 'vendor/natural-earth-topo/topojson/ne_50m_admin_1_states_provinces_lakes_shp.json',
            featureAccessor : function (d) {
                d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries =
                    d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries.filter(function (geo) {
                        return geo.properties.admin === "Canada";
                    });
                return d.objects['ne_50m_admin_1_states_provinces_lakes_shp'];
            },
            keyAccessor: function (d) { return d.properties.name }
        }),
        australia: new GeoConfig({
            name: 'Australia',
            fileName: 'vendor/natural-earth-topo/topojson/ne_50m_admin_1_states_provinces_lakes_shp.json',
            featureAccessor : function (d) {
                d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries =
                    d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries.filter(function (geo) {
                        return geo.properties.admin === "Australia";
                    });
                return d.objects['ne_50m_admin_1_states_provinces_lakes_shp'];
            },
            keyAccessor: function (d) { return d.properties.name }
        })
    });

    /**
     * Load a GeoConfig
     * @param  {GeoConfig} geoConfig
     * @param  {Function} successcb
     * @param  {Function} errorcb
    */
    this.loadConfig = function (geoConfig, successcb, errorcb) {
        if (typeof geoConfig.getFeatures() !== 'undefined') {
            successcb(geoConfig)
            return;
        }
        d3.json(geoConfig.getFileName(), function (data) {
            geoConfig.setFeatures(topojson.feature(data, geoConfig.getFeatureAccessor()(data)));
            successcb(geoConfig);
        });
    };

    /**
     * Get all the configs
     * @return {GeoConfig[]}
     */
    this.getConfigs = function () {
        return configs;
    };

    /**
     * Get a specific configs projection
     * @param  {String} configName
     * @return {GeoConfig}
     */
    this.getConfig = function (configName) {
        var p = configs.get(configName);
        return p || configs.get("usStates");
    };
}]);