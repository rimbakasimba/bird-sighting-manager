var gulp = require('gulp'),
concat = require('gulp-concat'),
uglify = require('gulp-uglify'),
$=require('gulp-load-plugins')();

gulp.task('init-mech', function() {
    console.log("Initialized the gulp mechanism");
})

gulp.task('default', function() {
    // Get the required files
    gulp.src('src/app/**/*.js')
    // prevent
  //  .pipe($.ngAnnotate())

  //  .pipe($.sourcemaps.init())
// Bundle all js into a single file
    .pipe(concat('bundle.js'))
    
// Minify all js
.pipe(uglify())
//.pipe($.sourcemaps.write())
.pipe(gulp.dest('src/app'));


})