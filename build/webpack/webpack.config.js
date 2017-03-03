'use strict';

var webpack = require('webpack');
var helpers = require('./helpers');

module.exports = {
    entry: {
        'docker/docker-task': './.release/docker/docker-task.js'
    },

    target: 'node',

    output: {
        path: helpers.root('.release'),
        filename: '[name].js'
    },

    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
    ],
};