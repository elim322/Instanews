//Modules you need!
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
    browserSync = require('browser-sync');
    sass = require("gulp-sass"),
    autoprefixer = require("gulp-autoprefixer"),
    cssnano = require("gulp-cssnano"),
    prettyError = require("gulp-prettyerror"),
    {src, task} = require('gulp');
    eslint = require('gulp-eslint');

    gulp.task("sass", function() {
        return gulp
          .src("./sass/style.scss")
          .pipe(prettyError()) // ADD THIS LINE
          .pipe(sass())
          .pipe(
            autoprefixer({
              browsers: ["last 2 versions"]
            })
          )
          .pipe(gulp.dest("./build/css"))
          .pipe(cssnano())
          .pipe(rename("style.min.css"))
          .pipe(gulp.dest("./build/css"));
      });
//linting task 
gulp.task('lint', function() {
    return src(['scripts/*.js'])
        // eslint() attaches the lint output to the "eslint" property
        // of the file object so it can be used by other modules.
        .pipe(eslint())
        // eslint.format() outputs the lint results to the console.
        // Alternatively use eslint.formatEach() (see Docs).
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on
        // lint error, return the stream and pipe to failAfterError last.
        .pipe(eslint.failAfterError());
});

//tasks below/what do you want gulp to do
gulp.task("scripts", gulp.series( 'lint', function(){
    return gulp
        .src("./js/*.js") // these are files gulp will consume 
        .pipe( uglify() ) // call uglify function on these files
        .pipe( rename({ extname: ".min.js"}) ) // rename ugly file
        .pipe( gulp.dest( "./build/js")); 
    })
);

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });

gulp
    .watch(['build/**/*', '*.html'])
    .on('change', browserSync.reload);
});

gulp.task("watch", function(){
    gulp.watch("js/*.js", gulp.series("scripts") )
    gulp.watch("sass/**/*.scss" , gulp.series("sass"));
});


gulp.task("default", gulp.parallel("browser-sync", "watch"));

