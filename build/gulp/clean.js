'use strict';

var gulp = require('gulp');
var del = require('del');
var runSequence = require('run-sequence');

var gulpConfig = require('./../gulp-config');

gulp.task('clean', stream => {
    runSequence(
        'clean-test',
        'clean-release',
        stream);
    return stream;
});

gulp.task('clean-test', function(cb) {
    return del(gulpConfig.test_output, cb);
});

gulp.task('clean-release', function(cb) {
    return del(gulpConfig.release_output, cb);
});