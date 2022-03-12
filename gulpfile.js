const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const rename = require("gulp-rename");
const uglify = require('gulp-uglify-es').default;
const cleanCSS = require('gulp-clean-css');
const replace = require('gulp-replace');
const readlineSync = require('readline-sync');

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

// Minify JS
gulp.task('minify-js', function(){
    return gulp.src(['src/*.js'])
        .pipe(rename({extname: '.min.js'}))
        .pipe(uglify(/* options */))
        .pipe(gulp.dest("dist"));
});

// Minify CSS
gulp.task('minify-css', () => {
    return gulp.src('src/*.css')
        .pipe(rename({extname: '.min.css'}))
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`Original ${details.name}: ${details.stats.originalSize}`);
            console.log(`Minified ${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest('dist'));
});

// Replace version
let oldVersion = '0.0.0', newVersion = '0.0.1', count = 1;
const replaceFiles = ['index.html', 'README.md', 'src/*'];
gulp.task('replace', function(){
    return gulp.src(replaceFiles)
        .pipe(replace(oldVersion, function handleReplace(match){
            console.log(`[${count}] Found "${oldVersion}", replace with "${newVersion}"`);
            count++;
            return newVersion;
        }))
        .pipe(gulp.dest(function(file){
            console.log(file.base)
            return file.base;
        }, {overwrite: true}));
});

// gulp release
gulp.task('release', gulp.series(
    function(done){
        oldVersion = readlineSync.question('Enter the current version to replace: ');
        return done();
    },
    function(done){
        newVersion = readlineSync.question('New version: ');
        return done();
    },
    function(done){
        if(readlineSync.keyInYN(`Do you want to replace "${oldVersion}" with "${newVersion}" in [${replaceFiles}]?`)){
            return done();
        }
        console.log('Ok, not replace, stop releasing.');
        process.exit(1);
    },
    'replace',
    'minify-css',
    'minify-js',
));