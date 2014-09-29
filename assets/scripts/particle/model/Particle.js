define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');

    function Particle() {}

    $.extend(Particle.prototype, {
        constructor: Particle,

        life: 0
    });

    return Particle;
});