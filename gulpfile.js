var
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    path = require('path'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat');

var paths = {
    appScss: [
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'app/scss/**/*.scss'
    ],
    appFonts: ['app/fonts/**/*'],
    appJs: ['app/js/**/*.js']
};

gulp.task('sass', function() {
    return gulp.src(paths.appScss)
        .pipe(concat('styles.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(function(file) {
            return path.join(file.base, '..', 'css');
        }))
        .pipe(gulp.dest('dist/css'));
});

gulp.task('fonts', function () {
    return gulp.src(paths.appFonts)
      .pipe(gulp.dest(function (file) {
          return path.join(file.base, '..', 'fonts');
      }))
      .pipe(gulp.dest('dist/fonts'));
});

gulp.task('build.dev', ['fonts', 'sass'], function(){
    return gulp
        .src([
            // dependencies
            'node_modules/angular/angular.min.js',

            // project source
            'app/js/**/*.js',
        ])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('app.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
        // include dist/app.js in index.html
});

gulp.task('build.prod', ['fonts', 'sass'], function(){
    return gulp
        .src([
            // dependencies
            'node_modules/angular/angular.min.js',

            // project source
            'app/js/**/*.js',
        ])
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(concat('app.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'));
        // include dist/app.js in index.html
});

gulp.task('watch.dev', ['build.dev'], function() {
    gulp.watch(paths.appScss, ['sass']);
    gulp.watch(paths.appJs, ['build.dev']);
});
