var gulp = require('gulp');
var stylus = require('gulp-stylus');
var browserSync = require('browser-sync');
var reload = browserSync.reload;
var concat = require('gulp-concat');
var babel = require('gulp-babel');
const autoprefixer = require('gulp-autoprefixer');
var paths = {
  html:['./index.html'],
  css:['./src/css/style.styl'],
  js:['./src/script.js']
};
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: "./"
    },
    port: 8080,
    open: true,
    notify: false
  });
});
gulp.task('html', function(){
  gulp.src(paths.html)
  .pipe(reload({stream:true}));
});
gulp.task('js:libs', function(){
  gulp.src(['node_modules/jquery/dist/jquery.min.js',
          'node_modules/slick-carousel/slick/slick.min.js'])
  .pipe(concat('js_libs.js'))
  .pipe(gulp.dest('./dist'));
});
gulp.task('js', function(){
  return gulp.src(paths.js)
    .pipe(babel({
        presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist'))
    .pipe(reload({stream:true}));
});
gulp.task('stylus', function () {
  return gulp.src(paths.css)
    .pipe(stylus({
      'include css' : true
    }))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream:true}));
});
gulp.task('watch',function(){
  gulp.watch(paths.html, gulp.series('html'));
  gulp.watch(paths.css, gulp.series('stylus'));
  gulp.watch(paths.js, gulp.series('js'));
});
gulp.task('default',gulp.parallel('stylus', 'watch', 'js:libs', 'browserSync'));