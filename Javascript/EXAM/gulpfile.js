
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var styl = require('gulp-styl');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');
var copy = require('gulp-copy');
var uglify = require('gulp-uglify');

gulp.task('copy', function () {  //copy
    return gulp.src(['src/font/**'])
        .pipe(gulp.dest('build/font'));
});

gulp.task('scripts', function() { //concat and min js
    return gulp.src(['src/js/jquery-1.7.min.js', 'src/js/jcarousel-0.3.4/dist/jquery.jcarousel.min.js', 'src/js/html5shiv.js', 'src/js/isotope.pkgd.js', 'src/js/script.js'])
        .pipe(concat('script.main.js'))
        .pipe(gulp.dest('build/js/'));
});

gulp.task('css', function() {  // concat css
    return gulp.src(['src/css/reset.css', 'src/css/jcarousel.responsive.css', 'src/css/styles.css'])
        .pipe(concat('styles.main.css'))
        .pipe(gulp.dest('src/css'));
});

gulp.task('styles', function() { //min css
    gulp.src(['src/css/ie8.css'])
        .pipe(styl({compress : true}))
        .pipe(gulp.dest('build/css/'))
        .pipe(refresh(server))
});

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});

// Using gulp-sass

gulp.task('sass', function(){
    return gulp.src('src/css/**/styles.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
});

gulp.task('sassie', function(){
    return gulp.src('src/css/**/ie8.scss')
        .pipe(sass())
        .pipe(gulp.dest('src/css'))
});


// Compress Task

gulp.task('compress', function() {
    gulp.src('src/img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('build/img'))
});

gulp.task('watch', function() {
    gulp.watch('src/img/*', ['compress']);
});

//default

gulp.task('default', function() {
    gulp.run('lr-server', 'scripts', 'styles', 'compress', ['sass']);

    gulp.watch('src/js/**', function(event) {
        gulp.run('scripts');
    })

    gulp.watch('src/css/**/*.scss', ['sass']);

    gulp.watch('src/css/**', function(event) {
        gulp.run('styles');
    })

    gulp.watch('src/img/*', ['compress']);

})
