module.exports = function (grunt) {

    grunt.initConfig({
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                src: ['src/js/*.js'],
                dest: 'build/js/script.main.js'
            },
        },
        uglify: {
            dist: {
                src: ['build/js/script.main.js'],
                dest: 'build/js/script.main.min.js'
            },
        },
        sass: {
            dist: {
                files: [{
                    expand: true,
                    cwd: 'src/css',
                    src: ['*.scss'],
                    dest: 'src/css',
                    ext: '.css'
                }]
            }
        },
        watch: {
            sass: {
                // We watch and compile sass files as normal but don't live reload here
                files: ['src/css/*.scss'],
                tasks: ['sass'],
            },
        },
        cssmin: { //описываем работу плагина минификации и конкатенации css
            dist: {
                src: ['src/css/style.css'],
                dest: 'build/css/style.min.css'
            },
        },
        copy: {
            main: {
                files: [
                    {expand: true, cwd: 'src/img/', src: ['**'], dest: 'build/img', filter: 'isFile'},
                    {expand: true, cwd: 'src/fonts/', src: ['**'], dest: 'build/fonts', filter: 'isFile'},
                    {expand: true, cwd: 'src/js/', src: ['*.min.js'], dest: 'build/js', filter: 'isFile'},
                    {expand: true, cwd: 'src/css/', src: ['**/*.css', '*.css'], dest: 'build/css', filter: 'isFile'},
                    {expand: true, cwd: 'src', src: ['index.html'], dest: 'build', filter: 'isFile'},
                ]
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'copy']);

    //grunt.registerTask('sass', ['sass']);

};