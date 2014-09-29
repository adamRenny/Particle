(function() {
    'use strict';

    var cacheBuster = (new Date()).getTime();
    requirejs.config({
        baseUrl: 'assets/scripts',

        paths: {
            jquery: '../vendor/jquery/dist/jquery',
            lodash: '../vendor/lodash/dist/lodash.compat'
        },

        shim: {
            jquery: {
                exports: 'jQuery'
            }
        },

        urlArgs: 'cb=' + cacheBuster
    });

    require([
        'jquery',
        'particle/controller/System'
    ], function(
        $,
        System
    ) {
        function setUpParticleSystem() {
            var particleSystem = new System();
            particleSystem.start();
        }

        $(document).ready(setUpParticleSystem);
    });
}());