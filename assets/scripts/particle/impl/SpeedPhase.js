define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');
    var assert = require('assert/assert');
    var Phase = require('particle/model/Phase');

    // pixels / milliseconds
    var VELOCITY = 75 / 1000;

    function SpeedPhase() {
        Phase.call(this);
    }

    function extendParticle(ParticleClass) {
        assert.param(typeof ParticleClass === 'function', 'Expected Particle to be a valid class');

        $.extend(ParticleClass.prototype, {
            life: 1,
            x: 0,
            y: 0,
            vx: 0,
            vy: 0
        });
    }

    function phaseStep(elapsed, particle) {
        if (particle.life === 0) {
            // Setup velocity
            var angle = (Math.random() * 100) - 50;

            particle.vx = (Math.random() * VELOCITY) * Math.cos(angle);
            particle.vy = (Math.random() * VELOCITY) * Math.sin(angle);
        }

        // Apply velocity
        particle.x = particle.x + (particle.vx * elapsed);
        particle.y = particle.y + (particle.vy * elapsed);
    }

    SpeedPhase.prototype = new Phase();

    $.extend(SpeedPhase.prototype, {
        constructor: SpeedPhase,

        extendParticle: extendParticle,
        phaseStep: phaseStep
    });

    return SpeedPhase;
});