module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    // Configurable paths for the application
    var appConfig = {
        app: 'app',
        dist: 'dist',
        pkg: require('./package.json'),
        banner: '/*\n' +
            ' * <%= conf.pkg.title || conf.pkg.name %> - v<%= conf.pkg.version %> -' +
            ' <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= conf.pkg.author %>.' +
            ' All rights reserved.\n */\n'
    };

    grunt.initConfig({

        conf: appConfig,

        watch: {
            maven: {
                files: ['<%= conf.app %>'],
                tasks : [ 'default' ]
            }
        },

        clean : {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= conf.dist %>'
                    ]
                }]
            }
        },

        jshint : {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            files : [
                'Gruntfile.js',
                '<%= conf.app %>/scripts/**/*.js'
            ]
        },

        html2js : {
            app : {
                options : {
                    base : '<%= conf.app %>/scripts',
                    htmlmin: {
                        collapseWhitespace: true,
                        removeComments: true
                    }
                },
                src : [ '<%= conf.app %>/scripts/**/*.tpl.html' ],
                dest : '.tmp/templates/app.js',
                module : 'charts.templates'
            }
        },

        copy: {
            assets: {
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= conf.app %>',
                    dest: '<%= conf.dist %>',
                    src: [
                        '*.ico',
                        'fonts/*',
                        'images/*',
                        'data/**/*'
                    ]
                }, {
                    expand: true,
                    cwd: 'bower_components/natural-earth-topo',
                    src: [
                        'topojson/ne_50m_admin_1_states_provinces_lakes_shp.json',
                        'topojson/ne_110m_admin_0_countries_lakes.json',
                        'topojson/ne_10m_time_zones.json'
                    ],
                    dest: '<%= conf.dist %>/assets'
                }]
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'bower_components/bootstrap/dist',
                    src: 'fonts/*',
                    dest: '<%= conf.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/font-awesome',
                    src: 'fonts/*',
                    dest: '<%= conf.dist %>'
                }, {
                    expand: true,
                    cwd: 'bower_components/select2',
                    src: [ '*.png', '*.gif' ],
                    dest: '<%= conf.dist %>/styles'
                }, {
                    expand: true,
                    cwd: 'bower_components/slickgrid',
                    src: [ 'images/*' ],
                    dest: '<%= conf.dist %>/styles'
                }]
            }
        },

        concat : {
            dist: {
                options : {
                    banner : '<%= conf.banner %>'
                },
                src: [ '<%= conf.app %>/scripts/**/*.js', '.tmp/templates/**/*.js' ],
                dest: '<%= conf.dist %>/scripts/<%= conf.pkg.name %>.js'
            },
            index: {
                options : {
                    process: true,
                },
                src: [ '<%= conf.app %>/index.html' ],
                dest: '<%= conf.dist %>/index.html'
            }
        },

        less : {
            dist : {
                files : {
                    '<%= conf.dist %>/styles/<%= conf.pkg.name %>.css' : [ '<%= conf.app %>/less/stylesheet.less' ]
                }
            }
        },

        wiredep: {
            options: {
                cwd: '<%= conf.dist %>'
            },
            app: {
                src: ['<%= conf.dist %>/index.html'],
                ignorePath:  /..\//
            }
        },

        filerev: {
            dist: {
                src: [
                    '<%= conf.dist %>/scripts/**/*.js',
                    '<%= conf.dist %>/styles/**/*.css',
                    '<%= conf.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
                    '<%= conf.dist %>/styles/fonts/*'
                ]
            }
        },

        useminPrepare: {
            html: '<%= conf.dist %>/index.html',
            options: {
                dest: '<%= conf.dist %>'
            }
        },

        usemin: {
            html: ['<%= conf.dist %>/**/*.html'],
            css: ['<%= conf.dist %>/styles/**/*.css'],
            options: {
                assetsDirs: ['<%= conf.dist %>', '<%= conf.dist %>/images']
            }
        },

        uglify : {
            options : {
                banner : '<%= conf.banner %>'
            },
            dist: {
                src: [ '<%= conf.dist %>/scripts/<%= conf.pkg.name %>.js' ],
                dest: '<%= conf.dist %>/scripts/<%= conf.pkg.name %>.js'
            }
        },

        cssmin: {
            dist: {
                src: [ '<%= conf.dist %>/styles/<%= conf.pkg.name %>.css' ],
                dest: '<%= conf.dist %>/styles/<%= conf.pkg.name %>.css'
            }
        },

        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= conf.dist %>',
                    src: ['*.html'],
                    dest: '<%= conf.dist %>'
                }]
            }
        },

        connect: {
            options: {
                port: 3000,
                hostname: 'localhost',
                open: true
            },
            server: {
                options: {
                    middleware: function (connect) {
                        return [
                            connect().use('/bower_components', connect.static('./bower_components')),
                            connect.static(appConfig.dist)
                        ];
                    }
                }
            }
        }
    });

    // Default task.
    grunt.registerTask('default', [
        'timestamp',
        'clean',
        'jshint',
        'html2js',
        'less',
        'concat:dist',
        'concat:index',
        'wiredep',
        'copy:assets'
    ]);

    grunt.registerTask('release', [
        'default',
        'useminPrepare',
        'concat:generated',
        'uglify',
        'cssmin',
        'filerev',
        'usemin',
        'htmlmin',
        'copy:dist'
    ]);

    grunt.registerTask('serve', [
        'default',
        'connect:server',
        'watch'
    ]);

    grunt.registerTask('timestamp', function () {
        grunt.log.subhead(Date());
    });
};
