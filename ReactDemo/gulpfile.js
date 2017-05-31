var gulp = require("gulp"),
    gutil = require("gulp-util"),
    replace = require('gulp-replace'),
    webpack = require("webpack"),
    webpackConfig = require("./webpack.build"),
    del = require('del'),
    zip = require('gulp-zip')

var env = process.env.NODE_ENV
console.log('--------', env)

gulp.task('clean', function () {
    del(['assets', 'output']);
})

gulp.task("html", function () {
    gulp.src('src/*.html')
        .pipe(replace('env="dev"', 'env="'+ env +'"'))
        .pipe(gulp.dest('assets'))
})

gulp.task("scripts", function(){
    var myConfig = Object.create(webpackConfig);

    webpack(myConfig, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            colors: true
        }));
    });
})

gulp.task("zip", function () {

    return gulp.src('assets/**/*')
        .pipe(zip('tjyc-h5-'+ env +'.zip'))
        .pipe(gulp.dest('./output'))
})

// gulp.task("default", ["html", "scripts"])
gulp.task("default", ["scripts"])