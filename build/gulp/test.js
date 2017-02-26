'use strict';

var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');

var gulpConfig = require('./../gulp-config');

gulp.task('pre-test', ['build-test'], function() {
    return gulp.src(gulpConfig.test_output_source)
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
    return gulp.src(gulpConfig.test_output_source_tests)
        .pipe(mocha({
            // reporter: 'spec',
            reporter: 'mocha-junit-reporter',
            reporterOptions: {
                mochaFile: './commit-test-results.xml',
                // mochaFile: gulpConfig.output_test_results_commit
            },
            timeout: '2000'
        }).on('error', gulpConfig.swallowError))

    .pipe(istanbul.writeReports({
        dir: gulpConfig.output_test_coverage
    }));
});