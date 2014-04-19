/*globals require*/
require.config({
    shim: {

    },
    paths: {
        famous: '../lib/famous',
        requirejs: '../lib/requirejs/require',
        almond: '../lib/almond/almond',
        src: '../src',
        'famous-polyfills': '../lib/famous-polyfills/index'
    }
});
require(['main']);
