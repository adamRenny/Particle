define(function(require, module, exports) {
    'use strict';

    function assert(condition, message) {
        if (!condition) {
            throw new Error(message);
        }
    }

    function assertParam(condition, message) {
        if (!condition) {
            throw new TypeError(message);
        }
    }

    assert.param = assertParam;

    return assert;
});