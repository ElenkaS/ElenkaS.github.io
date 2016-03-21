
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var concat = require('gulp-concat');
var styl = require('gulp-styl');
var refresh = require('gulp-livereload');
var lr = require('tiny-lr');
var server = lr();
var sass = require('gulp-sass');
var imagemin = require('gulp-imagemin');

gulp.task('scripts', function() {
    gulp.src(['src/js/**/*.js'])
       // .pipe(browserify())
       // .pipe(concat('script.js'))
        .pipe(gulp.dest('build/js'))
        .pipe(refresh(server))
});

gulp.task('styles', function() {
    gulp.src(['src/css/styles.css'])
        .pipe(styl({compress : false}))
        .pipe(gulp.dest('build/css'))
        .pipe(refresh(server))
});

gulp.task('lr-server', function() {
    server.listen(35729, function(err) {
        if(err) return console.log(err);
    });
});

// Using gulp-sass

gulp.task('sass', function(){
    return gulp.src('src/css/**/*.scss')
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
