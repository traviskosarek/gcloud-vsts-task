'use strict';

var sourceRoot = './src/';
var sourceFiles = sourceRoot + '**/*.*';
var sourceCode = sourceRoot + '**/*.ts';
var testIdentifier = '.spec';
var tests = sourceRoot + '**/*' + testIdentifier + '.ts';
var testOutputRoot = './.test/';
var testOutputAllCode = testOutputRoot + '**/*.js';
var testOutputAllTests = testOutputRoot + '**/*' + testIdentifier + '.js';
var testOutputCoverage = testOutputRoot + './.coverage/';
var testOutputCoverageCode = testOutputCoverage + '**/*.js';
var releaseRoot = './.release/';
var sourceMapsRoot = '../.test/.sourceMaps/';
var sourceMapsTestRoot = './.sourceMaps/';
var releaseSourceMaps = releaseRoot + sourceMapsRoot;
var testOutputSourceMaps = testOutputRoot + sourceMapsRoot;
var tsconfigFile = './tsconfig.json';

function swallowError(error) {
    console.log(error.toString());
    this.emit('end');
}

module.exports = {
    release_output: releaseRoot,
    test_output: testOutputRoot,
    sourcemaps_output: sourceMapsRoot,
    sourcemaps_test_output: sourceMapsTestRoot,
    code_source: sourceCode,
    transpile_source: [
        sourceCode,
        '!' + tests
    ],
    transpile_tests: [
        tests
    ],
    test_output_source: [
        testOutputAllCode,
        '!' + testOutputAllTests,
        '!' + testOutputCoverageCode,
        '!' + testOutputSourceMaps
    ],
    test_output_source_tests: [
        testOutputAllTests,
        '!' + testOutputCoverageCode,
        '!' + testOutputSourceMaps
    ],
    output_test_coverage: testOutputCoverage,
    tsconfig: tsconfigFile,
    swallowError: swallowError,
    other_source_files: [sourceFiles, '!' + sourceCode],
    bundle_entry_point: releaseRoot
};