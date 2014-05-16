module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-bowercopy');
    grunt.loadNpmTasks('grunt-coffeelint');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express-server');
    grunt.loadNpmTasks('grunt-html2js');

    // Default task.
    grunt.registerTask('default', [ 'clean', 'html2js', 'jshint', 'concat:dist', 'concat:index', 'clean:templates',
        'less:build', 'copy', 'bowercopy:build' ]);
    grunt.registerTask('release', [ 'clean', 'html2js', 'jshint', 'concat:dist', 'concat:index', 'clean:templates',
        'uglify', 'less:min', 'copy', 'bowercopy:release' ]);
    grunt.registerTask('server', [ 'default', 'express:dev', 'watch' ]);

    // Coffee versions
    grunt.registerTask('caffeine', [ 'clean', 'html2js', 'coffeelint', 'coffee', 'concat:coffee', 'concat:index',
        'clean:templates', 'less:build', 'copy', 'bowercopy:build' ]);
    grunt.registerTask('caffeine-server', [ 'caffeine', 'express:dev', 'watch' ]);

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function () {
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
            coffee: ['coffee/**/*.coffee'],
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
                    // D3 Geo Projection
                    'd3-geo-projection/d3.geo.projection.js' : 'd3-geo-projection/d3.geo.projection.js',
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
                    // Topojson Exports
                    'topojsonexports/world-atlas/topo' : 'topojsonexports/world-atlas/topo',
                    // Natural Earth Topojson
                    'natural-earth-topo/topojson' : 'natural-earth-topo/topojson',
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
                    // D3 Geo Projection
                    'd3-geo-projection/d3.geo.projection.js' : 'd3-geo-projection/d3.geo.projection.min.js',
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
                    // Topojson Exports
                    'topojsonexports/world-atlas/topo' : 'topojsonexports/world-atlas/topo',
                    // Natural Earth Topojson
                    'natural-earth-topo/topojson' : 'natural-earth-topo/topojson',
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
        coffee : {
            build: {
                options: {
                    bare: true
                },
                files: {
                    '<%= distdir %>/coffee/app.js': ['<%= src.coffee %>'],
                }
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
            coffee : {
                options : {
                    banner : "<%= banner %>"
                },
                src : [ '<%= distdir %>/coffee/app.js', '<%= distdir %>/templates/app.js' ],
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
        watch: {
            build: {
                files: ['<%= src.js %>', '<%= src.tpl %>', '<%= src.html %>', '<%= src.lessWatch %>'],
                tasks: ['default', 'timestamp']
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
        coffeelint: {
            files : ['<%= src.coffee %>'],
            options : grunt.file.readJSON('conf/coffee-lint.json')
        },
        jshint : {
            files : [ 'GruntFile.js', '<%= src.js %>' ],
            options : grunt.file.readJSON('conf/jshint.json')
        }
    });
};
