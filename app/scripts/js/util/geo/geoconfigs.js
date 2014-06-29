/**
 * GeoService
 */
angular.module('charts.geo').service('GeoConfigs', ['GeoConfig',
    function (GeoConfig) {

    // All geo configs
    var configList = [
        new GeoConfig({
            id: 'usStates',
            name: 'US States',
            fileName: './assets/topojson/ne_50m_admin_1_states_provinces_lakes_shp.json',
            featureAccessor : function (d) {
                d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries =
                    d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries.filter(function (geo) {
                        return geo.properties.admin === 'United States of America';
                    });
                return d.objects['ne_50m_admin_1_states_provinces_lakes_shp'];
            },
            keyAccessor: function (d) { return d.properties.name },
            titleAccessor:  function (d) { return 'State: ' + d.properties.name }
        }),
        new GeoConfig({
            id: 'canada',
            name: 'Canada',
            fileName: './assets/topojson/ne_50m_admin_1_states_provinces_lakes_shp.json',
            featureAccessor : function (d) {
                d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries =
                    d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries.filter(function (geo) {
                        return geo.properties.admin === 'Canada';
                    });
                return d.objects['ne_50m_admin_1_states_provinces_lakes_shp'];
            },
            keyAccessor: function (d) { return d.properties.name },
            titleAccessor:  function (d) { return 'Province: ' + d.properties.name }
        }),
        new GeoConfig({
            id: 'australia',
            name: 'Australia',
            fileName: './assets/topojson/ne_50m_admin_1_states_provinces_lakes_shp.json',
            featureAccessor : function (d) {
                d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries =
                    d.objects['ne_50m_admin_1_states_provinces_lakes_shp'].geometries.filter(function (geo) {
                        return geo.properties.admin === 'Australia';
                    });
                return d.objects['ne_50m_admin_1_states_provinces_lakes_shp'];
            },
            keyAccessor: function (d) { return d.properties.name },
            titleAccessor:  function (d) { return 'Province: ' + d.properties.name }
        }),
        new GeoConfig({
            id: 'world',
            name: 'World',
            fileName: './assets/topojson/ne_110m_admin_0_countries_lakes.json',
            featureAccessor : function (d) {
                return d.objects['ne_110m_admin_0_countries_lakes'];
            },
            keyAccessor: function (d) { return d.properties.name },
            titleAccessor:  function (d) { return 'Country: ' + d.properties.name }
        }),
        new GeoConfig({
            id: 'northAmerica',
            name: 'North America',
            fileName: './assets/topojson/ne_110m_admin_0_countries_lakes.json',
            featureAccessor : function (d) {
                d.objects['ne_110m_admin_0_countries_lakes'].geometries =
                    d.objects['ne_110m_admin_0_countries_lakes'].geometries.filter(function (geo) {
                        return geo.properties.continent === 'North America';
                    });
                return d.objects['ne_110m_admin_0_countries_lakes'];
            },
            keyAccessor: function (d) { return d.properties.name },
            titleAccessor:  function (d) { return 'Country: ' + d.properties.name }
        }),
        new GeoConfig({
            id: 'southAmerica',
            name: 'South America',
            fileName: './assets/topojson/ne_110m_admin_0_countries_lakes.json',
            featureAccessor : function (d) {
                d.objects['ne_110m_admin_0_countries_lakes'].geometries =
                    d.objects['ne_110m_admin_0_countries_lakes'].geometries.filter(function (geo) {
                        return geo.properties.continent === 'South America';
                    });
                return d.objects['ne_110m_admin_0_countries_lakes'];
            },
            keyAccessor: function (d) { return d.properties.name },
            titleAccessor:  function (d) { return 'Country: ' + d.properties.name }
        }),
        new GeoConfig({
            id: 'europe',
            name: 'Europe',
            fileName: './assets/topojson/ne_110m_admin_0_countries_lakes.json',
            featureAccessor : function (d) {
                d.objects['ne_110m_admin_0_countries_lakes'].geometries =
                    d.objects['ne_110m_admin_0_countries_lakes'].geometries.filter(function (geo) {
                        return geo.properties.continent === 'Europe';
                    });
                return d.objects['ne_110m_admin_0_countries_lakes'];
            },
            keyAccessor: function (d) { return d.properties.name },
            titleAccessor:  function (d) { return 'Country: ' + d.properties.name }
        }),
        new GeoConfig({
            id: 'asia',
            name: 'Asia',
            fileName: './assets/topojson/ne_110m_admin_0_countries_lakes.json',
            featureAccessor : function (d) {
                d.objects['ne_110m_admin_0_countries_lakes'].geometries =
                    d.objects['ne_110m_admin_0_countries_lakes'].geometries.filter(function (geo) {
                        return geo.properties.continent === 'Asia';
                    });
                return d.objects['ne_110m_admin_0_countries_lakes'];
            },
            keyAccessor: function (d) { return d.properties.name },
            titleAccessor:  function (d) { return 'Country: ' + d.properties.name }
        }),
        new GeoConfig({
            id: 'africa',
            name: 'Africa',
            fileName: './assets/topojson/ne_110m_admin_0_countries_lakes.json',
            featureAccessor : function (d) {
                d.objects['ne_110m_admin_0_countries_lakes'].geometries =
                    d.objects['ne_110m_admin_0_countries_lakes'].geometries.filter(function (geo) {
                        return geo.properties.continent === 'Africa';
                    });
                return d.objects['ne_110m_admin_0_countries_lakes'];
            },
            keyAccessor: function (d) { return d.properties.name },
            titleAccessor:  function (d) { return 'Country: ' + d.properties.name }
        }),
        new GeoConfig({
            id: 'antarctica',
            name: 'Antarctica',
            fileName: './assets/topojson/ne_110m_admin_0_countries_lakes.json',
            featureAccessor : function (d) {
                d.objects['ne_110m_admin_0_countries_lakes'].geometries =
                    d.objects['ne_110m_admin_0_countries_lakes'].geometries.filter(function (geo) {
                        return geo.properties.continent === 'Antarctica';
                    });
                return d.objects['ne_110m_admin_0_countries_lakes'];
            },
            keyAccessor: function (d) { return d.properties.name },
            titleAccessor:  function (d) { return 'Country: ' + d.properties.name }
        }),
        new GeoConfig({
            id: 'timeZones',
            name: 'Time Zones',
            fileName: './assets/topojson/ne_10m_time_zones.json',
            featureAccessor : function (d) {
                return d.objects['ne_10m_time_zones'];
            },
            keyAccessor: function (d) { return d.properties.name },
            titleAccessor:  function (d) { return 'TimeZone: ' + d.properties['time_zone'] }
        })
    ];

    var configs = d3.map(configList.reduce(function (previous, current) {
        previous[current.getId()] = current;
        return previous;
    }, {}));

    /**
     * Load a GeoConfig
     * @param  {GeoConfig} geoConfig
     * @param  {Function} successcb
    */
    this.loadConfig = function (geoConfig, successcb) {
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
        return p || configs.get('usStates');
    };
}]);