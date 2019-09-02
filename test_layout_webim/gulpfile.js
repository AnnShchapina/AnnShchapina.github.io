var gulp = require('gulp'), // Подключаем Gulp
    sass = require('gulp-sass'), //Подключаем Sass пакет
		svgstore = require('gulp-svgstore');
		svgmin = require('gulp-svgmin');
		path = require('path');

gulp.task('sass', function(){ // Создаем таск "sass"
    return gulp.src('app/sass/main.sass') // Берем источник
        .pipe(sass()) // Преобразуем Sass в CSS посредством gulp-sass
        .pipe(gulp.dest('app/css')) // Выгружаем результата в папку app/css
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



// gulp.task('default', gulp.parallel('img', 'styles', 'scripts', 'browser-sync', 'watch'));
