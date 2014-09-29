define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');
    var assert = require('assert/assert');
    var _ = require('lodash');
    var Particle = require('particle/model/Particle');

    function Phase() {
        this.particles = [];
    }

    function extendParticle(ParticleClass) {}

    function addParticle(particle) {
        var phaseIndex = this.particles.indexOf(particle);
        assert.param(particle instanceof Particle, 'Expected particle to be a valid particle object');
        assert.param(phaseIndex === -1, 'Particle is already a in the phase');

        this.particles.push(particle);
    }

    function removeParticle(particle) {
        var phaseIndex = this.particles.indexOf(particle);
        assert.param(particle instanceof Particle, 'Expected particle to be a valid particle object');
        assert.param(phaseIndex !== -1, 'Particle is not in the phase');

        this.particles.splice(phaseIndex, 1);
    }

    function willStep() {}
    function didStep() {}

    function step(elapsed) {
        var system = this;

        this.willStep();

        _(this.particles)
            .forEach(function(particle) {
                system.phaseStep(elapsed, particle);
            });

        this.didStep();
    }

    function phaseStep(elapsed, particle) {}

    $.extend(Phase.prototype, {
        constructor: Phase,

        particles: null,

        extendParticle: extendParticle,

        willStep: willStep,
        didStep: didStep,

        step: step,
        phaseStep: phaseStep,

        addParticle: addParticle,
        removeParticle: removeParticle
    });

    return Phase;
});