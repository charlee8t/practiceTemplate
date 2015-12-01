//Gulpfile to make my life easier.

var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var gutil = require('gulp-util');
var connect = require('gulp-connect');

// Lets bring es6 to es5 with this.
// Babel - converts ES6 code to ES5 - however it doesn't handle imports.
// Browserify - crawls your code for dependencies and packages them up
// into one file. can have plugins.
// Babelify - a babel plugin for browserify, to make browserify
// handle es6 including imports.
gulp.task('es6', function() {
 browserify({
     entries: './app/src/app.js',
     debug: true
   })
   .transform(babelify)
   .on('error',gutil.log)
   .bundle()
   .on('error',gutil.log)
   .pipe(source('./app/build/bundle.js'))
   .pipe(gulp.dest(''))
   .pipe(connect.reload());
});

gulp.task('connect', function(){
  connect.server({
    root: 'app',
    port: 8000,
    livereload: true
  });
});

gulp.task('html', function () {
  gulp.src('./app/index.html')
    .pipe(connect.reload());
});

gulp.task('css', function () {
  gulp.src('./app/styles/main.css')
    .pipe(connect.reload());
});

gulp.task('watch',function() {
 gulp.watch('**/*.js',['es6']);
 gulp.watch('**/*.html',['html']);
 gulp.watch('**/*.css',['css']);
});

gulp.task('default', ['connect', 'watch']);
