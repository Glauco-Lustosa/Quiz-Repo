var gulp = require('gulp');
var sass = require('gulp-sass');
var uglifycss = require('gulp-uglifycss');
var imagemin = require('gulp-imagemin');
var uglify = require('gulp-uglify');
sass.compiler = require('node-sass');
 


gulp.task('compress', gulp.series(function () {
    return gulp.src('./js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./js-compressed/'))
}));

gulp.task ('image', gulp.series(function () {
    gulp.src('./img/*')
        .pipe(imagemin())
        .pipe(gulp.dest('img-compressed/img/'));
}));


gulp.task('sass', gulp.series(function () {
  return gulp.src('./sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'));
}));
  

gulp.task('css', gulp.series(function () {
  gulp.src('./css/*.css')
    .pipe(uglifycss({
      "uglyComments": true
    }))
    .pipe(gulp.dest('./dist/'));
}));

gulp.task('run', gulp.parallel(['sass', 'css']));


gulp.task('watch', gulp.series(function () {
    gulp.watch('./sass/*.scss', gulp.parallel(['sass']));
    gulp.watch('./css/*.css', gulp.parallel(['css']));
  }));
  
  gulp.task('default', gulp.parallel(['sass', 'watch', 'compress']));

   