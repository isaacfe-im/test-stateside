module.exports = function(grunt) {

    grunt.initConfig({

        twigRender: {
            dist: {
                files: [{
                    data: './data/data.json',
                    expand: true,
                    cwd: './views/',
                    src: ['**/*.html.twig', '!**/_*.html.twig', '!**/layout.html.twig'], // Match twig templates but not partials
                    dest: './tempo/',
                    ext: '.html' // index.twig + datafile.json => index.html
                }]
            }
        },

        htmlmin: { // Task
            dist: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: './tempo', // Src matches are relative to this path.
                    src: ['**/*.html'], // Actual pattern(s) to match.
                    dest: './dev'
                }]
            },
            prod: { // Target
                options: { // Target options
                    removeComments: true,
                    collapseWhitespace: true
                },
                files: [{
                    expand: true, // Enable dynamic expansion.
                    cwd: './tempo', // Src matches are relative to this path.
                    src: ['**/*.html'], // Actual pattern(s) to match.
                    dest: './web'
                }]
            }
        },

        clean: {
            dist: {
                src: ["./tempo/*", './dev/*']
            },
            prod: {
                src: ["./tempo/*", './web/*']
            }
        },

        copy: {
            dist: {
                cwd: './assets',
                src: ['**/*', '**/.*'],
                dest: './dev',
                expand: true
            },
            prod: {
                cwd: './assets', // set working folder / root to copy
                src: ['**/*', '**/.*'], // copy all files and subfolders
                dest: './web', // destination folder
                expand: true // required when using cwd
            }
        },

        compass: {
            dist: {
                options: {
                    config: './config.rb'
                }
            }
        },

        concat: {
            dist: {
                src: [
                    './assets/js/vendor/bootstrap.min.js',
                    './assets/js/vendor/slick.min.js',
                    './assets/js/vendor/mmenu-all.min.js',
                    './assets/js/plugins.js',
                    './assets/js/main.js'
                ],
                dest: './tempo-js/app.js',
            }
        },

        uglify: {
            bundle: {
                files: {
                    './assets/js/app.min.js': './tempo-js/app.js'
                }
            }
        },

        watch: {
            twig: {
                files: ['./views/**/*', './assets/**/*'],
                tasks: ['clean:dist', 'twigRender', 'copy:dist', 'htmlmin:dist'],
                options: {
                    spawn: false
                }
            },
            sass: {
                files: ['./sass/**/*.scss'],
                tasks: ['compass', 'copy:dist'],
                options: {
                    spawn: false
                }
            },
            js: {
                files: ['./assets/js/**/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false
                }
            },
            assets: {
                files: ['./assets/**/*'],
                tasks: ['copy:dist'],
                options: {
                    spawn: false
                }
            }
        }





    });

    grunt.loadNpmTasks('grunt-twig-render');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['watch']);
    grunt.registerTask('prod', ['clean:prod', 'twigRender:dist', 'copy:prod', 'htmlmin:prod']);


};
