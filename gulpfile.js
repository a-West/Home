/// <binding Clean='clean' />
'use strict';

var gulp = require('gulp'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    tsc = require('gulp-typescript'),
    cssmin = require('gulp-cssmin'),
    uglify = require('gulp-uglify'),
    sourcemaps = require('gulp-sourcemaps'),
    tsProject = tsc.createProject('tsconfig.json'),
    tslint = require('gulp-tslint');

var webroot = './wwwroot/';

var paths = {
    js: webroot + 'js/**/*.js',
    minJs: webroot + 'js/**/*.min.js',
    css: webroot + 'css/**/*.css',
    minCss: webroot + 'css/**/*.min.css',
    concatJsDest: webroot + 'js/site.min.js',
    concatCssDest: webroot + 'css/site.min.css',
    ts: ['./app/**/*.ts','./app/**/**/*.ts', './app/*.ts'],
    tsOutput: webroot + 'js/app',
    npm: './node_modules/',
    lib: webroot + 'js/lib'
};

var libs = [
    paths.npm + 'angular2/bundles/angular2.dev.js',
    paths.npm + 'angular2/bundles/router.dev.js',
    paths.npm + 'angular2/bundles/http.dev.js',
    paths.npm + 'angular2/bundles/angular2-polyfills.js',
    paths.npm + 'es6-shim/es6-shim.js',
    paths.npm + 'systemjs/dist/system.js',
    paths.npm + 'systemjs/dist/system-polyfills.js',
]

gulp.task('rxjs', function () {
    return gulp.src(paths.npm + 'rxjs/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(gulp.dest(paths.lib + 'rxjs/'))
        .pipe(sourcemaps.write('.'));
});

gulp.task('typescript', function () {
    var sourceTsFiles = paths.ts;


    var tsResult = gulp.src(sourceTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsc(tsProject));

    tsResult.dts.pipe(gulp.dest(paths.tsOutput));
    return tsResult.js
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(paths.tsOutput));
});

gulp.task('libs', ['rxjs'], function () {
    console.log(libs);
    return gulp.src(libs).
        pipe(gulp.dest(paths.lib));
});

gulp.task('tslint', function() {
  return gulp.src(paths.ts)
    .pipe(tslint())
    .pipe(tslint.report('verbose'));
});

gulp.task('clean:js', function (cb) {
    rimraf(paths.concatJsDest, cb);
});

gulp.task('clean:css', function (cb) {
    rimraf(paths.concatCssDest, cb);
});

gulp.task('clean', ['clean:js', 'clean:css']);

gulp.task('min:js', function () {
    return gulp.src([paths.js, '!' + paths.minJs], {
        base: '.'
    })
        .pipe(concat(paths.concatJsDest))
        .pipe(uglify())
        .pipe(gulp.dest('.'));
});

gulp.task('min:css', function () {
    return gulp.src([paths.css, '!' + paths.minCss])
        .pipe(concat(paths.concatCssDest))
        .pipe(cssmin())
        .pipe(gulp.dest('.'));
});

gulp.task('watch', function() {
    gulp.watch(paths.ts, ['tslint', 'typescript']);
});

gulp.task('min', ['min:js', 'min:css']);
