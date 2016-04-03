var build_path = 'build/', //установимм пути
    src = 'src/',
    build = {
        root: build_path,
        html: build_path,
        js: build_path + 'js/',
        css: build_path + 'css/',
        img: build_path + 'img/',
        fonts: build_path + 'fonts/'
    },
    src_path = {
        root: 'src',
        html: src,
        js: src + 'js/',
        css: src + 'css/',
        img: src + 'img/',
        fonts: src + 'fonts/'
    }
var mozjpeg = require('imagemin-mozjpeg');                   // для imagemin нужно установить npm install imagemin-mozjpeg

module.exports = function (grunt) {
    grunt.initConfig({
        concat: {
            js: {
                options: {
                    separator: ';'
                },
                src: [src_path.js + 'jquery-1.7.js', src_path.js + 'owl.carousel.min.js', src_path.js + 'script.js'],
                dest: src_path.js + 'script.main.js'

            },
            css: {
                dest: src_path.css + 'style.main.css',
                src: [src_path.css + 'reset.css', src_path.css + 'style.css', src_path.css + 'owl.carousel.css', src_path.css + 'owl.theme.css', src_path.css + 'owl.transitions.css'],

            }
        },
        uglify: {                                           // минимизация js
            dist: {
                src: [src_path.js + 'script.main.js'],         //путь к исходному файлу (полученному в результате конкатенации)
                dest: build.js + 'script.main.min.js'       // путь к созданному файлу
            },
        },
        sass: {                                             //конвертация sass в css
            dist: {
                files: [{
                    expand: true,
                    cwd: src_path.css,                      // папка с файлом scss
                    src: ['*.scss'],                        // выбор файлов scss
                    dest: src_path.css,                     // путь к созданным файлам css
                    ext: '.css'                             // расширение новых файлов
                }]
            }
        },
        watch: {                                            // вотч
            sass: {
                // We watch and compile sass files as normal but don't live reload here
                files: [src_path.css + '*.scss', src_path.js + '*.js'], //путь к наблюдаемым файлам
                tasks: ['sass', 'uglify'],                              //перечtнь задач для вотча
            },
        },
        cssmin: {                                                               //описываем работу плагина минификации и конкатенации css
            dist: {
                src: [src_path.css + 'style.main.css'],                      //путь к файлу style.css, полученному из sass
                dest: build.css + 'style.min.css'                       // путь к минимизированному файлу min.css
            },
        },
        copy: {                                                         //копирование файлов в build
            main: {
                files: [
                    /* {expand: true, cwd: '' + src_path.img, src: ['**'], dest: build.img, filter: 'isFile'},*/ //рисунки не копируем, т.к. они сжимаются imagemin
                    {expand: true, cwd: '' + src_path.fonts, src: ['**'], dest: build.fonts, filter: 'isFile'}, // копируем шрифты
                    {expand: true, cwd: '' + src_path.js, src: ['*.min.js'], dest: build.js, filter: 'isFile'}, // копируем плагины js (min.js)
                    {expand: true, cwd: '' + src_path.html, src: ['index.html'], dest: build.html, filter: 'isFile'}, // копирование файла index.html в build
                ]
            }
        },
        imagemin: {                          // Task                                                сжатие картинок
            dynamic: {                         // Another target                                    динамическое дает возможность использовать маску *.*
                files: [{
                    expand: true,                  // Enable dynamic expansion
                    cwd: src_path.img,                   // Src matches are relative to this path   адрес папки с картинками
                    src: ['**/*.{png,jpg,gif}'],   // Actual patterns to match                      указание файлом для сжатия
                    dest: build.img                  // Destination path prefix                     папка с сжатыми файлами
                }]
            }
        }
    })

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-imagemin');


    grunt.registerTask('default', ['concat', 'uglify', 'sass', 'cssmin', 'copy', 'imagemin']);

    //grunt.registerTask('sass', ['sass']);

};