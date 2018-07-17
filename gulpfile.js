//Modules you need!
var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require('gulp-rename');
    browserSync = require('browser-sync');

const {src, task} = require('gulp');
const eslint = require('gulp-eslint');

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
    .watch(['build/js/*.js', '*.html'])
    .on('change', browserSync.reload);
});

gulp.task("watch", function(){
    gulp.watch("js/*.js", gulp.series("scripts"));
});


gulp.task("default", gulp.parallel("browser-sync", "watch"))
