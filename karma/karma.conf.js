'use strict';

module.exports = config => {
    config.set({
        autoWatch: true,
        browsers: ['PhantomJS'],
        files: [
            '../node_modules/es6-shim/es6-shim.min.js',
            'karma.entry.js'
        ],
        frameworks: ['jasmine'],
        logLevel: config.LOG_INFO,
        phantomJsLauncher: {
            exitOnResourceError: true
        },
        port: 9876,
        preprocessors: {
            'karma.entry.js': ['webpack', 'sourcemap']
        },
        reporters: ['mocha'],
        singleRun: true,
        webpack: require('../webpack.config.common.js'),
        webpackServer: {
            noInfo: true
        },
        colors: true,
        

        typescriptPreprocessor: {
        // options passed to the typescript compiler
            options: {
                sourceMap: false, // (optional) Generates corresponding .map file.
                target: 'ES5', // (optional) Specify ECMAScript target version: 'ES3' (default), or 'ES5'
                module: 'amd', // (optional) Specify module code generation: 'commonjs' or 'amd'
                noImplicitAny: false, // (optional) Warn on expressions and declarations with an implied 'any' type.
                noResolve: false, // (optional) Skip resolution and preprocessing.
                removeComments: true, // (optional) Do not emit comments to output.
                typings: ['./jasmine.d.ts']
            },
           
        }
           
    });
};

// ALTERNATIVE CONFIG: 
// var path = require('path');

// var webpackConfig = require('../webpack.test');

// var ENV = process.env.npm_lifecycle_event;
// var isTestWatch = ENV === 'test-watch';

// module.exports = function (config) {
//   var _config = {

//     // base path that will be used to resolve all patterns (eg. files, exclude)
//     basePath: '',

   

//     // enable / disable watching file and executing tests whenever any file changes

//     // start these browsers
//     // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher

//     // Continuous Integration mode
//     // if true, Karma captures browsers, runs the tests and exits
//   };

//   if (!isTestWatch) {
//     _config.reporters.push("coverage");

//     _config.coverageReporter = {
//       dir: 'coverage/',
//       reporters: [{
//         type: 'json',
//         dir: 'coverage',
//         subdir: 'json',
//         file: 'coverage-final.json'
//       }]
//     };
//   }

//   config.set(_config);

// };