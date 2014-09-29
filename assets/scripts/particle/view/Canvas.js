define(function(require, module, exports) {
    'use strict';

    var $ = require('jquery');
    var _ = require('lodash');

    var $window = $(window);

    function Canvas(element) {
        this.element = element;

        this.setUp();

        this.pushDimensions();
    }

    function setUp() {
        this.onWindowResize =
            _.debounce(
                this.onWindowResize.bind(this),
                200
            );

        this.width = parseInt($window.outerWidth(), 10);
        this.height = parseInt($window.outerHeight(), 10);

        $window.on('resize', this.onWindowResize);
    }

    function tearDown() {
        $window.off('resize', this.onWindowResize);
    }

    function onWindowResize(event) {
        this.width = $window.outerWidth();
        this.height = $window.outerHeight();
        this.pushDimensions();
    }

    function pushDimensions() {
        this._element.setAttribute('width', this.width);
        this._element.setAttribute('height', this.height);
    }

    Canvas.prototype = {
        constructor: Canvas,

        _element: null,

        get element() {
            return this._element;
        },

        set element(val) {
            this._element = val;
            if (!val) {
                return;
            }

            this.pushDimensions();
        },

        _context: null,

        get context() {
            if (!this._context) {
                this._context = this.element.getContext('2d');
            }

            return this._context;
        },

        set context(val) {},

        width: 0,
        height: 0,

        pushDimensions: pushDimensions,

        setUp: setUp,
        tearDown: tearDown,

        onWindowResize: onWindowResize
    };

    return Canvas;
});