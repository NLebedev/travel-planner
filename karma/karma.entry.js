Error.stackTraceLimit = Infinity;

require('es6-shim');
require('reflect-metadata');
require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/async-test');
require('zone.js/dist/fake-async-test');
require('zone.js/dist/sync-test');
require('zone.js/dist/proxy');
require('zone.js/dist/jasmine-patch');

const browserTesting = require('@angular/platform-browser-dynamic/testing');
const coreTesting = require('@angular/core/testing');
const context = require.context('../assets/', true, /\.spec\.ts$/);

Error.stackTraceLimit = Infinity;
jasmine.DEFAULT_TIMEOUT_INTERVAL = 2000;

coreTesting.TestBed.resetTestEnvironment();
coreTesting.TestBed.initTestEnvironment(
    browserTesting.BrowserDynamicTestingModule,
    browserTesting.platformBrowserDynamicTesting()
);

context.keys().forEach(context);

// ALTERNATIVA CONFIG:
// Error.stackTraceLimit = Infinity;

// require('core-js/client/shim');
// require('reflect-metadata');

// require('ts-helpers');

// require('zone.js/dist/zone');
// require('zone.js/dist/long-stack-trace-zone');
// require('zone.js/dist/proxy');
// require('zone.js/dist/sync-test');
// require('zone.js/dist/jasmine-patch');
// require('zone.js/dist/async-test');
// require('zone.js/dist/fake-async-test');


//  Ok, this is kinda crazy. We can use the the context method on
//  require that webpack created in order to tell webpack
//  what files we actually want to require or import.
//  Below, context will be a function/object with file names as keys.
//  using that regex we are saying look in client/app and find
//  any file that ends with '.spec.ts' and get its path. By passing in true
//  we say do this recursively
 
// var appContext = require.context('../assets', true, /\.spec\.ts/);

// // get all the files, for each file, call the context function
// // that will require the file and load it up here. Context will
// // loop and require those spec files here
// appContext.keys().forEach(appContext);

// // Select BrowserDomAdapter.
// // see https://github.com/AngularClass/angular2-webpack-starter/issues/124
// // Somewhere in the test setup
// var testing = require('@angular/core/testing');
// var browser = require('@angular/platform-browser-dynamic/testing');

// testing.TestBed.initTestEnvironment(browser.BrowserDynamicTestingModule, browser.platformBrowserDynamicTesting());