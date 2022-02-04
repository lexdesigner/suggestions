const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Scripts & JS Libraries
gulp.task('scripts', () => {
  return gulp
    .src(['app/js/common.js'])
    .pipe(concat('common.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

// Local Server
gulp.task('browser-sync', () => {
  browserSync({
    server: {
      baseDir: 'app',
    },
    notify: false,
  });
});

// Custom Styles
gulp.task('styles', () => {
  return gulp
    .src('app/sass/**/*.sass')
    .pipe(
      sass({
        outputStyle: 'expand',
      }).on('error', notify.onError())
    )
    .pipe(
      rename({
        suffix: '.min',
        prefix: '',
      })
    )
    .pipe(autoprefixer(['last 15 versions']))
    .pipe(gulp.dest('app/css'))
    .pipe(
      browserSync.reload({
        stream: true,
      })
    );
});

// Code & Reload
gulp.task('code', () => {
  return gulp.src('app/**/*.html').pipe(
    browserSync.reload({
      stream: true,
    })
  );
});
gulp.task('js', () => {
  return gulp.src('app/**/*.js').pipe(
    browserSync.reload({
      stream: true,
    })
  );
});

gulp.task('watch', () => {
  gulp.watch('app/sass/**/*.sass', gulp.parallel('styles'));
  gulp.watch('app/*.html', gulp.parallel('code'));
  gulp.watch('app/js/*.js', gulp.parallel('js'));
  gulp.watch('app/js/common.js', gulp.parallel('scripts'));
});

gulp.task('default', gulp.parallel('browser-sync', 'watch'));
