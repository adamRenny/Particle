define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');
    var assert = require('assert/assert');
    var Canvas = require('particle/view/Canvas');
    var Phase = require('particle/model/Phase');

    var TWO_PI = Math.PI * 2;

    function CanvasRenderPhase(canvas) {
        Phase.call(this);

        assert.param(canvas instanceof Canvas, 'Expected proper canvas object');

        this.canvas = canvas;
        this.context = canvas.context;
    }

    function extendParticle(ParticleClass) {
        assert.param(typeof ParticleClass === 'function', 'Expected Particle to be a valid class');

        $.extend(ParticleClass.prototype, {
            x: 0,
            y: 0,
            radius: 4,
            life: 0
        });
    }

    function willStep() {
        this.context.clearRect(
            0, 0,
            this.canvas.width, this.canvas.height
        );

        this.context.strokeStyle = 'rgba(0, 55, 66, 0.2)';
        this.context.lineWidth = 3;
    }

    function phaseStep(elapsed, particle) {
        this.context.beginPath();
        this.context.arc(particle.x, particle.y, particle.radius, 0, TWO_PI);
        this.context.stroke();
    }

    CanvasRenderPhase.prototype = new Phase();

    $.extend(CanvasRenderPhase.prototype, {
        constructor: CanvasRenderPhase,

        container: null,
        width: 0,
        height: 0,

        extendParticle: extendParticle,
        willStep: willStep,
        phaseStep: phaseStep
    });

    return CanvasRenderPhase;
});