module.exports = function (grunt) {

    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        babel: {
            options: {
                sourceMap: false,
                presets: ['es2015']
            },
            dist: {
                files: [{
                    expand: true,
                    cwd: 'js/src',
                    src: ['script_es6.js'],
                    dest: 'js/dist',
                    ext: '.js',
                    extDot: 'first'
                }]
            }
        },
        watch: {
            babel: {
                files: 'js/src/script_es6.js',
                tasks: ['babel']
            },
        },
        jasmine: {
            test: {
                options: {
                    // добавляем ссылку на стороннюю библиотеку
                    vendor: [
                        'node_modules/jquery/dist/jquery.js',
                        'node_modules/jasmine-jquery/lib/jasmine-jquery.js'
                    ],
                    // конец изменений
                    specs: 'spec/*[sS]pec.js'
                }
            }
        },

    });

    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['babel', 'jasmine']);
    grunt.registerTask('js', ['jasmine']);
}