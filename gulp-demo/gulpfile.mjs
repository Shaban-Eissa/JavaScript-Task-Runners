import gulp from 'gulp';
import pug from 'gulp-pug';
import * as Sass from 'sass';
import gulpSass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import browserSync from 'browser-sync';
import eslint from 'gulp-eslint';
import sourcemaps from 'gulp-sourcemaps';

const sass = gulpSass(Sass);

// Compile Pug to HTML
gulp.task('pug', () => {
  return gulp.src('src/pug/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
});


// Compile SCSS to CSS, add prefixes, generate sourcemaps, and minify
gulp.task('sass', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cleanCSS())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
});

// Lint JavaScript
gulp.task('lint-js', () => {
  return gulp.src('src/js/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

// Concatenate and minify JS, generate sourcemaps
gulp.task('js', () => {
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
});


// Serve and live reload
gulp.task('serve', () => {
  browserSync.init({
    server: './dist'
  });

  gulp.watch('src/pug/*.pug', gulp.series('pug'));
  gulp.watch('src/scss/*.scss', gulp.series('sass'));
  gulp.watch('src/js/*.js', gulp.series('lint-js', 'js'));
});


// Default task
gulp.task('default', gulp.series('pug', 'sass', 'lint-js', 'js'));

// Build for production
gulp.task('build', gulp.series('pug','sass', 'lint-js', 'js'));
