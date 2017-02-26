'use strict';

var gulp = require('gulp');
var tslint = require('gulp-tslint');

var gulpConfig = require('./../gulp-config');

gulp.task('lint', function() {
    var stream = gulp.src([gulpConfig.code_source])
        .pipe(tslint({
            formatter: 'prose'
        }))
        .pipe(tslint.report({
            emitError: false,
            summarizeFailureOutput: true,
            sort: true,
            bell: true
        }));
    return stream;
});