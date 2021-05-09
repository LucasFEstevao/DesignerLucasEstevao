const gulp = require('gulp');
const pump = require('pump');
const del = require('del');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync');
const sass = require('gulp-sass');
const runSequence = require('run-sequence');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');

const pathInTheme = './src/';
const pathOutTheme = './dist';

const watchScss = pathInTheme + '/scss/**/*.scss';
const pathInCss = pathInTheme + '/scss/style.scss';
const pathOutCss = pathOutTheme + '/css';

const pathInJs = pathInTheme + '/js/**/*.js';
const pathOutJs = pathOutTheme + '/js';

const pathInLibs = [pathInTheme + '/lib/**/*.js', pathInTheme + '/lib/**/*.json'];
const pathOutLibs = pathOutTheme + '/lib';

const pathInImgs = pathInTheme + '/images/**/*.';
const pathOutImgs = pathOutTheme + '/images';

const pathIconsIn = [pathInTheme + '/icons/*.svg'];
const pathIconsOut = pathInTheme + '/fonts/icon-font/';
const pathTemplateIcons = pathInTheme + '/assets/icon_template.scss';

gulp.task('style', function () {
    return gulp.src(pathInCss)
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(pathOutCss))
    .pipe(browserSync.stream());
});

gulp.task('moveJs', function () {
    return pump([
        gulp.src(pathInJs),
        gulp.dest(pathOutJs),
        browserSync.stream()
    ]);
});

gulp.task('libraries', function () {
    return pump([
        gulp.src(pathInLibs),
        gulp.dest(pathOutLibs),
    ]);
});

gulp.task('clean', function () {
    return del.sync(['./dist']);
});

gulp.task('images', function () {
    return pump([
        gulp.src(pathInImgs + '+(png|jpg|gif|svg|ico)'),
        gulp.dest(pathOutImgs)
    ]);
});

gulp.task('default', function () {
    runSequence('clean', 'libraries', 'images', 'style', 'moveJs');
});


gulp.task('watch', function () {
    livereload.listen();
    gulp.watch(watchScss, ['style']);
    gulp.watch(pathInJs, ['watchJS']);
});

gulp.task('start', function () {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
    
    gulp.watch(watchScss, ['style']);
    gulp.watch(pathInJs, ['moveJs']);
    gulp.watch(['*.html', 'src/**/*.html']).on('change', browserSync.reload);
});

