var gulp = require('gulp'),
    concat = require('gulp-concat'),
    jshint = require('gulp-jshint'),
    path = require('path'),
    imagemin = require('gulp-imagemin');

var paths = {
  server_src: './src/server/',
  client_src: './src/static/',
  server_scripts: './src/server/**/*.js',
  client_scripts: './src/static/js/**/*.js',
  server_dist: './dist/server/',
  client_dist: './dist/static/'
};

gulp.task('js_hint', function() {
  gulp.src(paths.server_scripts)
    .pipe(jshint({
      node: true
    }))
    .pipe(jshint.reporter('default'))
    .on('error', function(error) {
      console.error(String(error));
    });

  gulp.src(paths.client_scripts)
    .pipe(jshint({
      predef: ['$', 'angular']
    }))
    .pipe(jshint.reporter('default'))
    .on('error', function(error) {
      console.error(String(error));
    });
});

gulp.task('build-server', function() {
  gulp.src(path.join(paths.server_src, 'app.js')) 
    .pipe(gulp.dest(paths.server_dist));
  gulp.src(path.join(paths.server_src, 'views/*'))
    .pipe(gulp.dest(path.join(paths.server_dist, 'views')));
});

gulp.task('build-client', function() {
  gulp.src(paths.client_scripts)
    .pipe(concat('mmhome.js'))
    .pipe(gulp.dest('./dist/static/js/'));
  gulp.src(path.join(paths.client_src, 'tpl/*'))
    .pipe(gulp.dest(path.join(paths.client_dist, 'tpl')));
  gulp.src(path.join(paths.client_src, 'img/*'))
    .pipe(imagemin({
      progressive: true,
      optimizationLevel: 1
    }))
    .pipe(gulp.dest(path.join(paths.client_dist, 'img')));
});

gulp.task('build', ['build-client', 'build-server']);

gulp.task('default', ['js_hint', 'build']);

