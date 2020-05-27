var gulp = require('gulp'),
    postcss = require('gulp-postcss'),
    sourcemaps = require('gulp-sourcemaps'),
    nested = require('postcss-nested'),
    mediaMinmax = require('postcss-media-minmax'),
    customMedia = require('postcss-custom-media'),
    browserSync = require("browser-sync").create();

function style() {
  return gulp
    .src('styles.css')
    .pipe(sourcemaps.init())
    .pipe(postcss([
      nested(),
      mediaMinmax(),
      customMedia()
    ]))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('./post'))
    .pipe(browserSync.stream());
}

function reload() {
  browserSync.reload();
}

function watch() {
  browserSync.init({
    server: {
      baseDir: './'
    }
  });
  gulp.watch('styles.css', style);
  gulp.watch('index.html').on('change', browserSync.reload);
}

exports.watch = watch;
exports.style = style;

var run = gulp.parallel(style, watch);

gulp.task('default', run);
