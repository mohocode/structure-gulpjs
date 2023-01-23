const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const minifyJs = require('gulp-uglify');
const concat = require('gulp-concat');
var sourceMaps = require('gulp-sourcemaps');
const { src, dest } = require('gulp');
const browserSync = require('browser-sync').create();


// Compile scss into css
function style() {
    // 1. Where is my scss file
    return gulp.src('./src/scss/**/*.scss')
        // 2. pass that file through saa compiler
        .pipe(sass())
        // 3. Where do I save the compiled CSS?
        .pipe(gulp.dest('./assets/css/'))
        // 4. Streams changes to all browsers
        .pipe(browserSync.stream());
}

const jsFiles = ['./src/bootstrap/js/alert.js' ,'./src/bootstrap/js/button.js']

function bundleJs() {
    return src(jsFiles)
        .pipe(sourceMaps.init())
        // .pipe(minifyJs())
        .pipe(concat('bundle.js'))
        .pipe(sourceMaps.write())
        .pipe(dest('./dist/assets/js/'))

}

function watch() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });

    gulp.watch('./scss/**/*.scss', style);
    gulp.watch('./js/**/*.js', style);
    gulp.watch('./*.html').on('change', browserSync.reload);
    gulp.watch('./views/*.html').on('change', browserSync.reload);
    gulp.watch('./js/**/*.js').on('change', browserSync.reload);

}


exports.style = style;
exports.bundleJs = bundleJs;
exports.watch = watch; 