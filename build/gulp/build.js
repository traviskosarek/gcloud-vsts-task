'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var sourceMaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');
var webpack = require('webpack-stream');

var webpackConfig = require('./../webpack/webpack.config');
var gulpConfig = require('./../gulp-config');

gulp.task('build', stream => {
    runSequence(
        'clean',
        'lint',
        'transpile',
        'bundle',
        'copy-other-files',
        stream);
    return stream;
});

gulp.task('transpile', function() {
    var project = typescript.createProject(gulpConfig.tsconfig);
    var tsResult = gulp.src(gulpConfig.transpile_source)
        .pipe(project())
        .on('error', gulpConfig.swallowError);

    return tsResult.js
        .pipe(gulp.dest(gulpConfig.test_output));
});

gulp.task('bundle', function() {
    return gulp.src(gulpConfig.bundle_entry_point)
        .pipe(webpack(webpackConfig, require('webpack')))
        .on('error', gulpConfig.swallowError)
        .pipe(gulp.dest(webpackConfig.output.path));
});

gulp.task('copy-other-files', function() {
    var stream = gulp.src(gulpConfig.other_source_files)
        .pipe(gulp.dest(gulpConfig.release_output));
    return stream;
});

gulp.task('build-test', stream => {
    runSequence(
        'clean-test',
        'transpile-sourcemaps',
        'transpile-tests',
        stream);
    return stream;
});

gulp.task('transpile-sourcemaps', function() {
    var project = typescript.createProject(gulpConfig.tsconfig, { removeComments: false });
    var tsResult = gulp.src(gulpConfig.transpile_source)
        .pipe(sourceMaps.init())
        .pipe(project())
        .on('error', gulpConfig.swallowError);

    return tsResult.js
        .pipe(sourceMaps.write(gulpConfig.sourcemaps_output))
        .pipe(gulp.dest(gulpConfig.test_output));
});

gulp.task('transpile-tests', function() {
    var project = typescript.createProject(gulpConfig.tsconfig);
    var tsResult = gulp.src(gulpConfig.transpile_tests)
        .pipe(sourceMaps.init())
        .pipe(project())
        .on('error', gulpConfig.swallowError);

    return tsResult.js
        .pipe(sourceMaps.write(gulpConfig.sourcemaps_test_output))
        .pipe(gulp.dest(gulpConfig.test_output));
});