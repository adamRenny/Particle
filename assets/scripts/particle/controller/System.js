define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');
    var Canvas = require('particle/view/Canvas');
    var Particle = require('particle/model/Particle');

    var RandomPhase = require('particle/impl/RandomPhase');
    var SpeedPhase = require('particle/impl/SpeedPhase');
    var BoundsPhase = require('particle/impl/BoundsPhase');
    var CanvasRenderPhase = require('particle/impl/CanvasRenderPhase');

    var NUMBER_OF_PARTICLES = 200;
    var THRESHOLD = 300;

    function System() {
        this.particles = [];
        this.phases = [];

        this.setUp();
    }

    var PHASES = {
        RANDOM: 0,
        SPEED: 1,
        BOUNDS: 2,
        RENDER: 3
    };

    function setUp() {
        this.step = this.step.bind(this);

        this.canvas = new Canvas(
            $(document.body).find('canvas').get(0)
        );

        this.phases.push(
            new RandomPhase(this.canvas),
            new SpeedPhase(),
            new BoundsPhase(this.canvas),
            new CanvasRenderPhase(this.canvas)
        );

        this.phases[PHASES.RANDOM].extendParticle(Particle);
        this.phases[PHASES.SPEED].extendParticle(Particle);
        this.phases[PHASES.BOUNDS].extendParticle(Particle);
        this.phases[PHASES.RENDER].extendParticle(Particle);

        for (var i = 0; i < NUMBER_OF_PARTICLES; i++) {
            var particle = new Particle();
            this.phases[PHASES.RANDOM].addParticle(particle);
            this.phases[PHASES.SPEED].addParticle(particle);
            this.phases[PHASES.BOUNDS].addParticle(particle);
            this.phases[PHASES.RENDER].addParticle(particle);
            this.particles.push(particle);
        }
    }

    function tearDown() {

    }

    function start() {
        this.timestamp = Date.now();
        this.gpuRequest = requestAnimationFrame(this.step);
    }

    function stop() {
        cancelRequestAnimationFrame(this.gpuRequest);
    }

    function step() {
        var now = Date.now();
        var elapsed = now - this.timestamp;
        this.timestamp = now;

        if (elapsed > THRESHOLD) {
            return;
        }

        this.phases[PHASES.RANDOM].step(elapsed);
        this.phases[PHASES.SPEED].step(elapsed);
        this.phases[PHASES.BOUNDS].step(elapsed);
        this.phases[PHASES.RENDER].step(elapsed);

        requestAnimationFrame(this.step);
    }

    $.extend(System.prototype, {
        constructor: System,

        particles: [],
        timestamp: 0,
        gpuRequest: 0,

        setUp: setUp,
        tearDown: tearDown,

        start: start,
        stop: stop,

        step: step
    });

    return System;
});