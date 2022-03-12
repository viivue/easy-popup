const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');

// Static server
gulp.task('serve', function(){
    // Watch for all files change and reload
    gulp.watch('**').on('change', () => {
        browserSync.reload();
    });


    browserSync.init({
        // serve files from root directory
        server: {baseDir: "./"}
    });
});

// uglify JS
gulp.task('minify-js', function(){
    return gulp.src(['src/*.js'])
        .pipe(rename({extname: '.min.js'}))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("dist"));
});

gulp.task('minify-css', () => {
    return gulp.src('src/*.css')
        .pipe(rename({extname: '.min.css'}))
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest('dist'));
});

// gulp release
gulp.task('release', gulp.series('minify-css', 'minify-js'));