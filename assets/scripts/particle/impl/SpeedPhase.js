define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');
    var assert = require('assert/assert');
    var Phase = require('particle/model/Phase');

    // pixels / milliseconds
    var VELOCITY = 25    / 1000;

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
            var isRight = particle.x >= this.width;
            var isLeft = particle.x <= 0;
            var isTop = particle.y <= 0;
            var isBottom = particle.y >= this.height;

            var horizontal = 0;
            var vertical = 0;
            if (isRight) {
                horizontal = -1;
            } else if (isLeft) {
                horizontal = 1;
            }

            if (isTop) {
                vertical = 1;
            } else if (isBottom) {
                vertical = -1;
            }

            if (horizontal !== 0) {
                particle.vx = horizontal * Math.random() * VELOCITY;
            }

            if (vertical !== 0) {
                particle.vy = vertical * Math.random() * VELOCITY;
            }
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