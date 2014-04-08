module.exports = function(grunt) {

    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-express-server');

    // Default task.
    grunt.registerTask('default', [ 'clean', 'html2js', 'jshint', 'concat', 'clean:templates', 'less:build',
        'copy', 'bowercopy:build' ]);
    grunt.registerTask('release', [ 'clean', 'html2js', 'jshint', 'concat', 'clean:templates', 'uglify', 'less:min',
        'copy', 'bowercopy:release' ]);
    grunt.registerTask('server', [ 'default', 'express:dev', 'watch' ]);

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function() {
        grunt.log.subhead(Date());
    });

    // Project configuration.
    grunt.initConfig({
        distdir : 'dist',
        pkg : grunt.file.readJSON('package.json'),
        banner:
            '/*\n' +
            ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> -' +
            ' <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
            ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        src : {
            js : [ 'js/**/*.js' ],
            jsTpl : [ '<%= distdir %>/templates/**/*.js' ],
            html : [ 'index.html' ],
            tpl : [ 'js/**/*.tpl.html' ],
            less : [ 'less/stylesheet.less' ],
            lessWatch : [ 'less/**/*.less' ]
        },
        bowercopy: {
            options: {
                destPrefix: '<%= distdir %>/vendor'
            },
            build: {
                files: {
                    // Angular
                    'angular/angular.js' : 'angular/angular.js',
                    // Angular Bootstrap
                    'angular-bootstrap/ui-bootstrap-tpls.js' : 'angular-bootstrap/ui-bootstrap-tpls.js',
                    // Angular UI Router
                    'angular-ui-router/release/angular-ui-router.js' :
                        'angular-ui-router/release/angular-ui-router.js',
                    // Boostrap
                    'bootstrap/dist/css/bootstrap.css' : 'bootstrap/dist/css/bootstrap.css',
                    'bootstrap/dist/fonts' : 'bootstrap/dist/fonts',
                    // ColorBrewer
                    'colorbrewer/colorbrewer.js' : 'colorbrewer/colorbrewer.js',
                    // Crossfilter
                    'crossfilter/crossfilter.js' : 'crossfilter/crossfilter.js',
                    // D3
                    'd3/d3.js' : 'd3/d3.js',
                    // DC
                    'dc/dc.js' : 'dc/dc.js',
                    'dc/dc.css' : 'dc/dc.css',
                    // JQuery
                    'jquery/dist/jquery.js' : 'jquery/dist/jquery.js',
                    // JQuery UI
                    'jquery-ui/ui/jquery-ui.js' : 'jquery-ui/ui/jquery-ui.js',
                    'jquery-ui/themes/base/jquery.ui.core.css' : 'jquery-ui/themes/base/jquery.ui.core.css',
                    'jquery-ui/themes/base/jquery.ui.resizable.css' : 'jquery-ui/themes/base/jquery.ui.resizable.css',
                    // Math JS
                    'mathjs/dist/math.js' : 'mathjs/dist/math.js',
                    // Moment JS
                    'momentjs/moment.js' : 'momentjs/moment.js',
                    // Queue
                    'queue-async/queue.js' : 'queue-async/queue.js',
                    // Sprint F
                    'sprintf/src/sprintf.js' : 'sprintf/src/sprintf.js',
                    // TopoJson
                    'topojson/topojson.js' : 'topojson/topojson.js',
                    // TopoJson Exports
                    'topojsonexports/world-atlas/topo/ne_50m_admin_0_countries_lakes.json' :
                        'topojsonexports/world-atlas/topo/ne_50m_admin_0_countries_lakes.json',
                    'topojsonexports/world-atlas/topo/ne_50m_us_states_lakes.json' :
                        'topojsonexports/world-atlas/topo/ne_50m_us_states_lakes.json',
                    // Underscore
                    'underscore/underscore.js' : 'underscore/underscore.js'
                }
            },
            release: {
                files: {
                    // Angular
                    'angular/angular.js' : 'angular/angular.min.js',
                    // Angular Bootstrap
                    'angular-bootstrap/ui-bootstrap-tpls.js' : 'angular-bootstrap/ui-bootstrap-tpls.min.js',
                    // Angular UI Router
                    'angular-ui-router/release/angular-ui-router.js' :
                        'angular-ui-router/release/angular-ui-router.min.js',
                    // Boostrap
                    'bootstrap/dist/css/bootstrap.css' : 'bootstrap/dist/css/bootstrap.min.css',
                    'bootstrap/dist/fonts' : 'bootstrap/dist/fonts',
                    // ColorBrewer
                    'colorbrewer/colorbrewer.js' : 'colorbrewer/colorbrewer.js',
                    // Crossfilter
                    'crossfilter/crossfilter.js' : 'crossfilter/crossfilter.min.js',
                    // D3
                    'd3/d3.js' : 'd3/d3.min.js',
                    // DC
                    'dc/dc.js' : 'dc/dc.min.js',
                    'dc/dc.css' : 'dc/dc.css',
                    // JQuery
                    'jquery/dist/jquery.js' : 'jquery/dist/jquery.min.js',
                    // JQuery UI
                    'jquery-ui/ui/jquery-ui.js' : 'jquery-ui/ui/minified/jquery-ui.min.js',
                    'jquery-ui/themes/base/jquery.ui.core.css' :
                        'jquery-ui/themes/base/minified/jquery.ui.core.min.css',
                    'jquery-ui/themes/base/jquery.ui.resizable.css' :
                        'jquery-ui/themes/base/minified/jquery.ui.resizable.min.css',
                    // Math JS
                    'mathjs/dist/math.js' : 'mathjs/dist/math.min.js',
                    // Moment JS
                    'momentjs/moment.js' : 'momentjs/min/moment.min.js',
                    // Queue
                    'queue-async/queue.js' : 'queue-async/queue.min.js',
                    // Sprint F
                    'sprintf/src/sprintf.js' : 'sprintf/src/sprintf.min.js',
                    // TopoJson
                    'topojson/topojson.js' : 'topojson/topojson.js',
                    // TopoJson Exports
                    'topojsonexports/world-atlas/topo/ne_50m_admin_0_countries_lakes.json' :
                        'topojsonexports/world-atlas/topo/ne_50m_admin_0_countries_lakes.json',
                    'topojsonexports/world-atlas/topo/ne_50m_us_states_lakes.json' :
                        'topojsonexports/world-atlas/topo/ne_50m_us_states_lakes.json',
                    // Underscore
                    'underscore/underscore.js' : 'underscore/underscore.js'
                }
            }
        },
        clean : {
            build: {
                src: [ '<%= distdir %>/*' ]
            },
            templates: {
                src: [ '<%= distdir %>/templates' ]
            }
        },
        copy : {
            assets : {
                files : [ {
                    dest : '<%= distdir %>/assets',
                    src : '**',
                    expand : true,
                    cwd : 'assets/'
                }, {
                    dest : '<%= distdir %>/data',
                    src : '**',
                    expand : true,
                    cwd : 'data/'
                } ]
            }
        },
        concat : {
            dist : {
                options : {
                    banner : "<%= banner %>"
                },
                src : [ '<%= src.js %>', '<%= distdir %>/templates/app.js' ],
                dest : '<%= distdir %>/<%= pkg.name %>.js'
            },
            index : {
                options : {
                    process : true
                },
                src : [ 'index.html' ],
                dest : '<%= distdir %>/index.html'
            }
        },
        html2js : {
            chart : {
                options : {
                    base : './js/'
                },
                src : [ '<%= src.tpl %>' ],
                dest : '<%= distdir %>/templates/app.js',
                module : 'charts.templates'
            }
        },
        less : {
            build : {
                files : {
                    '<%= distdir %>/css/<%= pkg.name %>.css' : [ '<%= src.less %>' ]
                }
            },
            min : {
                options: {
                    cleancss: true,
                },
                files : {
                    '<%= distdir %>/css/<%= pkg.name %>.css' : [ '<%= src.less %>' ]
                }
            }
        },
        uglify: {
            jsmin: {
                options: {
                    mangle: true,
                    compress: true,
                    sourceMap: '<%= distdir %>/<%= pkg.name %>.min.js.map'
                },
                src: '<%= distdir %>/<%= pkg.name %>.js',
                dest: '<%= distdir %>/<%= pkg.name %>.min.js'
            }
        },
        watch:{
            build: {
                files:['<%= src.js %>', '<%= src.tpl %>', '<%= src.html %>', '<%= src.lessWatch %>'],
                tasks:['default', 'timestamp']
            }
        },
        express : {
            dev : {
                options : {
                    args : [ '<%= distdir %>', '3000' ],
                    script : 'server.js'
                }
            }
        },
        jshint : {
            files : [ 'GruntFile.js', '<%= src.js %>' ],
            options : {
                indent:4,
                camelcase: true,
                maxlen: 120,
                multistr: true,
                undef: true,
                funcscope: true,
                loopfunc: true,
                asi: true,
                curly : true,
                eqeqeq : true,
                immed : true,
                latedef : true,
                newcap : true,
                noarg : true,
                sub : true,
                boss : true,
                eqnull : true,
                globals : {
                    "angular": false,
                    "colorbrewer": false,
                    "crossfilter": false,
                    "d3": false,
                    "dc": false,
                    "grunt": false,
                    "module": false,
                    "moment": false,
                    "queue": false,
                    "sprintf": false,
                    "topojson": false,
                    "_": false
                }
            }
        }
    });
};
