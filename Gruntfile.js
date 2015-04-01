module.exports = function (grunt) {

    // tasks
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        scsslint: {
            files: [
                'styles/*.scss'
            ],
            options: {
                config: '.scss-lint.yml',
                reporterOutput: '.sasslintreport.xml',
                colorizeOutput: false,
                emitError: true,
                maxBuffer: 600*1024
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'none'
                },
                files: {
                    'styles/site.css': 'styles/site.scss'
                }
            }
        },
        watch: {
            css: {
                files: '**/*.scss',
                tasks: ['sass']
            }
        }
    });

    // dependencies
    grunt.loadNpmTasks('grunt-scss-lint');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // init tasks
    grunt.registerTask('default', ['scsslint','watch']);
}