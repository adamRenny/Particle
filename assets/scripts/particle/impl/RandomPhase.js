define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');
    var assert = require('assert/assert');
    var Phase = require('particle/model/Phase');

    function RandomPhase(container) {
        Phase.call(this);

        assert.param(typeof container !== 'undefined', 'Expected container with RandomPhase constructor');
        assert.param(
            typeof container.width === 'number' && typeof container.height === 'number',
            'Expected container to have a width and height'
        );

        this.container = container;
        this.width = this.container.width;
        this.height = this.container.height;
    }

    function extendParticle(ParticleClass) {
        assert.param(typeof ParticleClass === 'function', 'Expected Particle to be a valid class');

        $.extend(ParticleClass.prototype, {
            x: 0,
            y: 0,
            life: 1
        });
    }

    function willStep() {
        this.width = this.container.width;
        this.height = this.container.height;
    }

    function phaseStep(elapsed, particle) {
        if (particle.life !== 0) {
            return;
        }

        particle.x = -particle.radius;
        particle.y = Math.round(Math.random() * (this.height + particle.radius));
    }

    RandomPhase.prototype = new Phase();

    $.extend(RandomPhase.prototype, {
        constructor: RandomPhase,

        container: null,
        width: 0,
        height: 0,

        extendParticle: extendParticle,
        willStep: willStep,
        phaseStep: phaseStep
    });

    return RandomPhase;
});