

/* global require */
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

/* gulp-load-plugins ($.xxx) instead of below */
// var uglify = require('gulp-uglify');
// var concat = require('gulp-concat');
// var clean = require('gulp-clean');
// var notify = require('gulp-notify');

var del = require('del');


gulp.task('clean', function () {
  return gulp.src(['dist/'], { read: false })
    .pipe($.clean());
});

gulp.task('eslint', function () {
  return gulp.src('src/**/*.js')
    .pipe($.eslint())
    .pipe($.eslint.format())
});


// Lint JavaScript
gulp.task('jshint', function () {
  return gulp.src('src/**/*.js')
    //.pipe(reload({stream: true, once: true}))
    .pipe($.jshint())
    .pipe($.jshint.reporter('jshint-stylish'));
    //.pipe($.if(!browserSync.active, $.jshint.reporter('fail')));
});


gulp.task('uglify-script', function () {
  gulp.src('./src/**/*.js')
    .pipe($.concat('ng-activiti-rest-service.min.js'))
    .pipe($.uglify())
    .pipe(gulp.dest('./'))
    .pipe($.notify({ message: 'Task "uglify-script" complete.' }));
});

gulp.task('non-uglify-script', function () {
  gulp.src('./src/**/*.js')
    .pipe($.concat('ng-activiti-rest-service.js'))
    .pipe(gulp.dest('./'));
});

gulp.task('default', [
  // 'eslint
  'uglify-script',
  'non-uglify-script'
]);

gulp.task('watch', function () {
  // gulp.watch('./src/**/*.js', ['default']);
});
