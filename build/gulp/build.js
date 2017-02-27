'use strict';

var gulp = require('gulp');
var runSequence = require('run-sequence');
var sourceMaps = require('gulp-sourcemaps');
var typescript = require('gulp-typescript');

var gulpConfig = require('./../gulp-config');

gulp.task('build', stream => {
    runSequence(
        'clean-release',
        'lint',
        'transpile',
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
        .pipe(gulp.dest(gulpConfig.release_output));
});

gulp.task('copy-other-files', function() {
    var stream = gulp.src(gulpConfig.other_source_files)
        .pipe(gulp.dest(gulpConfig.release_output));
    return stream;
});

gulp.task('build-test', stream => {
    runSequence(
        'clean-test',
        'transpile-source-test',
        'transpile-commit-tests',
        stream);
    return stream;
});

gulp.task('transpile-source-test', function() {
    var project = typescript.createProject(gulpConfig.tsconfig, { removeComments: false });
    var tsResult = gulp.src(gulpConfig.transpile_source)
        .pipe(sourceMaps.init())
        .pipe(project())
        .on('error', gulpConfig.swallowError);

    return tsResult.js
        .pipe(sourceMaps.write(gulpConfig.sourcemaps_output))
        .pipe(gulp.dest(gulpConfig.test_output));
});

gulp.task('transpile-commit-tests', function() {
    var project = typescript.createProject(gulpConfig.tsconfig);
    var tsResult = gulp.src(gulpConfig.transpile_commit_tests)
        .pipe(sourceMaps.init())
        .pipe(project())
        .on('error', gulpConfig.swallowError);

    return tsResult.js
        .pipe(sourceMaps.write(gulpConfig.sourcemaps_test_output))
        .pipe(gulp.dest(gulpConfig.test_output));
});