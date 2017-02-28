'use strict';

var gulp = require('gulp');
var istanbul = require('gulp-istanbul');
var mocha = require('gulp-mocha');
var runSequence = require('run-sequence');

var env = require('gulp-env');

var gulpConfig = require('./../gulp-config');

gulp.task('pre-test', ['build-test'], function() {
    return gulp.src(gulpConfig.test_output_source)
        .pipe(istanbul({
            includeUntested: true
        }))
        .pipe(istanbul.hookRequire());
});

gulp.task('test', ['pre-test'], function() {
    // cross platform method of setting reporter options for mocha-multi
    env.set({
        multi: 'spec=- xunit=./.test/.results/test-results.xml'
    });
    return gulp.src(gulpConfig.test_output_source_tests)
        .pipe(mocha({
            ui: "tdd",
            reporter: 'mocha-multi',
            timeout: '2000'
        }).on('error', gulpConfig.swallowError))

    .pipe(istanbul.writeReports({
        dir: gulpConfig.output_test_coverage,
        reporters: ['cobertura', 'text', 'text-summary']
    }));
});