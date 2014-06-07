var gulp = require('gulp');
var es6transpiler = require('gulp-es6-transpiler');

var paths = {
  scriptsSrc: ['src/*.js'],
  scriptsTest: ['test/*.js']
};

gulp.task('scripts-src', function() {
  return gulp.src(paths.scriptsSrc)
    .pipe(es6transpiler())
    .pipe(gulp.dest('dist/src'));
});

gulp.task('scripts-test', function() {
  return gulp.src(paths.scriptsTest)
    .pipe(es6transpiler())
    .pipe(gulp.dest('dist/test'));
});

gulp.task('scripts', ['scripts-src', 'scripts-test']);

gulp.task('watch', function() {
  gulp.watch(paths.scriptsSrc, ['scripts-src']);
  gulp.watch(paths.scriptsTest, ['scripts-test']);
});

gulp.task('default', ['scripts', 'watch']);
