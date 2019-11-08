var syntax = 'sass'; // Syntax: sass or scss;

var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет
    svgstore = require('gulp-svgstore');
    svgmin = require('gulp-svgmin');
    path = require('path');
    browserSync = require('browser-sync'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cleancss = require('gulp-clean-css'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    notify = require("gulp-notify");
    svgSprite = require("gulp-svg-sprite");

gulp.task('serve', function() {
 browserSync.init({
        server: "app"
    });

  gulp.watch('app/'+syntax+'/**/*.'+syntax+'', gulp.series('styles'));
  gulp.watch(['app/libs/**/*.js', 'app/js/common.js'], gulp.series('js'));
  gulp.watch("app/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
 return gulp.src('app/'+syntax+'/**/*.'+syntax+'')
 .pipe(sass({ outputStyle: 'expanded' }).on("error", notify.onError()))
 .pipe(rename({ suffix: '.min', prefix : '' }))
 .pipe(autoprefixer(['last 15 versions']))
 .pipe(cleancss( {level: { 1: { specialComments: 0 } } })) // Opt., comment out when debugging
 .pipe(gulp.dest('app/css'))
 .pipe(browserSync.stream())
});


gulp.task('js', function() {
 return gulp.src([
  'app/libs/jquery/dist/jquery.min.js',
  'app/libs/owlCarousel/dist/assets/owl.carousel.min.js',
  'app/js/common.js', // Always at the end
  ])

 .pipe(concat('scripts.min.js'))
 // .pipe(uglify()) // Mifify js (opt.)
 .pipe(gulp.dest('app/js'))
 .pipe(browserSync.reload({ stream: true }))
});


gulp.task('svgstore', function () {
    return gulp
        .src('app/img/**/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = path.basename(file.relative, path.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('app/images'));
});

gulp.task('default', gulp.series('js', 'styles', 'serve'));
