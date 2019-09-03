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
  notify = require("gulp-notify"),

gulp.task('browser-sync', function() {
 browserSync({
  server: {
   baseDir: 'app'
  },
  notify: false,
  // open: false,
  // online: false, // Work Offline Without Internet Connection
  // tunnel: true, tunnel: "projectname", // Demonstration page: http://projectname.localtunnel.me
 })
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

gulp.task('sass', function() {
	return gulp.src('app/sass/*.sass')
	.pipe(sass({outputStyle: 'expand'}).on("error", notify.onError()))
	.pipe(rename({suffix: '.min', prefix : ''}))
	.pipe(autoprefixer(['last 15 versions']))
	.pipe(cleanCSS()) // Опционально, закомментировать при отладке
	.pipe(gulp.dest('app/css'))
	.pipe(browserSync.reload({stream: true}));
});

gulp.task('svgstore', function () {
    return gulp
        .src('app/img/*.svg')
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


gulp.task('js', function() {
 return gulp.src([
  'app/libs/jquery/dist/jquery.min.js',
  'app/js/common.js', // Always at the end
  ])

 .pipe(concat('scripts.min.js'))
 // .pipe(uglify()) // Mifify js (opt.)
 .pipe(gulp.dest('app/js'))
 .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', gulp.series('styles', 'js', 'browser-sync'), function() {
 gulp.watch('app/'+syntax+'/**/*.'+syntax+'', ['styles']);
 gulp.watch(['libs/**/*.js', 'app/js/common.js'], ['js']);
 gulp.watch('app/*.html', browserSync.reload)
});

gulp.task('default', gulp.series('watch'));
