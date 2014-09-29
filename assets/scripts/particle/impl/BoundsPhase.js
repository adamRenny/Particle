define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');
    var assert = require('assert/assert');
    var Phase = require('particle/model/Phase');

    function BoundsPhase(container) {
        Phase.call(this);

        assert.param(typeof container !== 'undefined', 'Expected container with BoundsPhase constructor');
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
        var isOOB = particle.x - particle.radius > this.width || particle.x + particle.radius < 0 ||
            particle.y + particle.radius < 0 || particle.y - particle.radius > this.height;

        if (isOOB) {
            particle.life = 0;
        } else {
            particle.life = 1;
        }
    }

    BoundsPhase.prototype = new Phase();

    $.extend(BoundsPhase.prototype, {
        constructor: BoundsPhase,

        container: null,
        width: 0,
        height: 0,

        extendParticle: extendParticle,
        willStep: willStep,
        phaseStep: phaseStep
    });

    return BoundsPhase;
});