var gulp = require("gulp"),
    gutil = require("gulp-util"),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    rename = require('gulp-rename'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    // cache = require('gulp-cache'),
    concat = require('gulp-concat'),
    replace = require('gulp-replace'),
    del = require('del'),
    webpack = require("webpack"),
    webpackConfig = require("./webpack.config");

var DEBUG = process.env.NODE_ENV === 'DEBUG';

gulp.task('clean', function () {
    del(['dist']);
});

gulp.task('html', function(){
    var time = new Date().getTime();

    gulp.src('src/*.html')
        .pipe(replace('bundle.js', 'bundle.js?' + time))
        .pipe(replace('min.css', 'min.css?' + time))
        .pipe(gulp.dest('dist'));
});

gulp.task('images', function () {
    // return gulp.src('src/images/**/*')
    //     .pipe(cache(imagemin({optimizationLevel: 3, progressive: true, interlaced: true})))
    //     .pipe(gulp.dest('dist/images'));

    return gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('styles', function () {
    return gulp.src('src/scss/*')
        .pipe(concat('index'))
        .pipe(sass())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('dist/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist/css'));
});

gulp.task("scripts", function(){
    var myConfig = Object.create(webpackConfig);

    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
    });
});

gulp.task('watch', function () {
    gulp.watch('src/*.html', ['html']);
    gulp.watch('src/scss/**/*', ['styles', 'html']);
    gulp.watch('src/js/**/*', ['scripts', 'html']);
    gulp.watch('src/images/**/*', ['images']);
});

gulp.task('default', ['html', 'images', 'styles', 'scripts'].concat(DEBUG ? 'watch' : []));