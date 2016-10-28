var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var gutil = require('gulp-util');
var uglify = require('gulp-uglifyjs');

gulp.task('es6', function() {
  browserify({
      entries: 'src/client/app.js',
      debug: false
    })
    .transform(babelify, { presets: ['es2015'] })
    .on('error',gutil.log)
    .bundle()
    .on('error',gutil.log)
    .pipe(source('client.js'))
    .pipe(buffer())
    .pipe(uglify('client.js', {
      mangle: true,
      compress: {
        sequences: true,
        dead_code: true,
        conditionals: true,
        booleans: true,
        unused: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        warnings: false
      }
    }))
    .pipe(gulp.dest('dist/'));
});

gulp.task('watch',function() {
  gulp.watch('src/**/*.js', ['es6'])
});

gulp.task('default', ['es6', 'watch']);
