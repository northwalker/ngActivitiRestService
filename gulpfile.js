

/* global require */

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

var del = require('del');




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
  gulp.src('./src/**/*.js')                 // 指定要處理的原始 JavaScript 檔案目錄
    .pipe($.uglify())                       // 將 JavaScript 做最小化
    .pipe(gulp.dest('dist/ng-activiti-rest-service.min.js'));  // 指定最小化後的 JavaScript 檔案目錄
});

gulp.task('non-uglify-script', function () {
  gulp.src('./src/**/*.js')                             // 指定要處理的原始 JavaScript 檔案目錄
    .pipe(gulp.dest('dist/ng-activiti-rest-service.js'));  // 指定最小化後的 JavaScript 檔案目錄
});

gulp.task('default', [
  // 'eslint
  'uglify-script',
  'non-uglify-script'
]);

gulp.task('watch', function () {
  gulp.watch('./src/**/*', ['default']);
});
