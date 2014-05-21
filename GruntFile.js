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
    grunt.registerTask('server', [ 'default', 'express:dev', 'watch:default' ]);

    // Coffee versions
    grunt.registerTask('caffeine', [ 'clean', 'html2js', 'coffeelint', 'coffee', 'concat:coffee', 'concat:index',
        'clean:coffee', 'clean:templates', 'less:build', 'copy', 'bowercopy:build' ]);
    grunt.registerTask('caffeine-server', [ 'caffeine', 'express:dev', 'watch:coffee' ]);

    // Print a timestamp (useful for when watching)
    grunt.registerTask('timestamp', function () {
        grunt.log.subhead(Date());
    });

    // Project configuration.
    grunt.initConfig({
        bower: grunt.file.readJSON('bower.json'),
        distdir : 'dist',
        pkg : grunt.file.readJSON('package.json'),
        banner:
            '/*\n' +
            ' * <%= pkg.title || pkg.name %> - v<%= pkg.version %> -' +
            ' <%= grunt.template.today("dddd, mmmm dS, yyyy, h:MM:ss TT") %>\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>;\n' +
            ' * Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %>\n */\n',
        src : {
            coffee: ['src/coffee/**/*.coffee'],
            js : [ 'src/js/**/*.js' ],
            jsTpl : [ '<%= distdir %>/templates/**/*.js' ],
            html : [ 'index.html' ],
            tpl : [ 'src/js/**/*.tpl.html' ],
            less : [ 'less/stylesheet.less' ],
            lessWatch : [ 'less/**/*.less' ]
        },
        bowercopy: {
            options: {
                destPrefix: '<%= distdir %>/vendor'
            },
            build: {
                files: '<%= bower.copy.js %>'
            },
            release: {
                files: '<%= bower.copy.min %>'
            }
        },
        clean : {
            build: {
                src: [ '<%= distdir %>/*' ]
            },
            coffee: {
                src: [ '<%= distdir %>/coffee' ]
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
                    base : './src/js/'
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
            default: {
                files: ['<%= src.js %>', '<%= src.tpl %>', '<%= src.html %>', '<%= src.lessWatch %>'],
                tasks: ['html2js', 'jshint', 'concat:dist', 'concat:index', 'clean:templates', 'less:build', 'copy',
                    'timestamp']
            },
            coffee: {
                files: ['<%= src.coffee %>', '<%= src.tpl %>', '<%= src.html %>', '<%= src.lessWatch %>'],
                tasks: ['html2js', 'coffeelint', 'coffee', 'concat:coffee', 'concat:index', 'clean:coffee',
                    'clean:templates', 'less:build', 'copy', 'timestamp']
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
            options : grunt.file.readJSON('.coffee-lint')
        },
        jshint : {
            files : [ 'GruntFile.js', '<%= src.js %>' ],
            options : grunt.file.readJSON('.jshintrc')
        }
    });
};
