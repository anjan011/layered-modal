import _ from "underscore";

/**
 * Underscore extensions ...
 */

_.mixin({

    /**
     * Is the value passed a true javascript object?
     * @param o
     * @returns {boolean}
     */

    isPlainObject: function (o) {

        return this.isObject(o) && !this.isFunction(o) && !this.isArray(o);

    },

    /**
     * Makes sure the value is an object, if not returns default value
     * @param v
     * @param d
     *
     * @return {Object}
     */

    asObject: function (v, d) {

        if (!this.isPlainObject(d)) {
            d = {};
        }

        return this.isPlainObject(v) ? v : d;
    },

    /**
     * Get string value
     *
     * @param v Value as string
     * @param d default value
     * @returns {*}
     */

    asString: function (v, d) {

        if (this.isUndefined(d) || this.isNull(d)) {
            d = '';
        }

        if (!v || this.isUndefined(v) || this.isNull(v)) {
            v = d;
        }

        if (!this.isString(v)) {
            return d;
        }

        return v;
    },

    /**
     * get int value
     *
     * @param v Value as string
     * @param d default value
     * @returns {*}
     */

    asInt: function (v, d) {

        if (this.isUndefined(d) || this.isNull(d)) {
            d = 0;
        }

        v = parseInt(v);

        if (isNaN(v)) {
            return d;
        }

        return v;
    },

    /**
     * get int value
     *
     * @param v Value as string
     * @param d default value
     * @returns {*}
     */

    asFloat: function (v, d) {

        if (this.isUndefined(d) || this.isNull(d)) {
            d = 0.0;
        }

        v = parseFloat(v);

        if (isNaN(v)) {
            return d;
        }

        return v;
    },

    /**
     * get array value
     *
     * @param v Value as string
     * @param d default value
     * @returns {*}
     */

    asArray: function (v, d) {

        if (!this.isArray(d)) {
            d = [];
        }

        return this.isArray(v) ? v : d;
    },

    /**
     * Gets a value from an object using a key.
     * @returns {*}
     * @param o
     * @param k
     * @param d
     */

    objOwnValue: function (o, k, d) {
        return this.isPlainObject(o) && this.has(o, k) ? o[k] : d;
    },

    /**
     * Gets a value from an object using a key.
     * @returns {*}
     * @param o
     * @param k
     * @param d
     */

    objValue: function (o, k, d) {
        return this.isPlainObject(o) && this.hasProperty(o, k) ? o[k] : d;
    },

    /**
     * Gets a value from an object as string
     * @param o
     * @param k
     * @param d
     * @returns {*}
     */

    objValueAsString: function (o, k, d) {

        if (this.isUndefined(d) || this.isNull(d)) {
            d = '';
        }

        let val = this.objValue(o, k, d);

        return this.isString(val) ? val : d;

    },

    /**
     * Gets a value from an object as object
     * @param o
     * @param k
     * @param d
     * @returns {*}
     */

    objValueAsObject: function (o, k, d) {

        if (this.isUndefined(d) || this.isNull(d)) {
            d = {};
        }

        if (!this.isPlainObject(o)) {
            return d;
        }

        let val = this.objValue(o, k, d);

        return this.isPlainObject(val) ? val : d;

    },

    /**
     * Gets object's key value as float
     *
     * @param o The source object
     * @param k The key
     * @param d Default value, if key doesn't exist
     *
     * @returns {Number}
     */

    objValueAsInt: function (o, k, d) {

        let val = this.objValue(o, k, d);

        val = parseInt(val);

        if (isNaN(val)) {
            val = 0;
        }

        return val;
    },

    objValueAsIntFlag: function (o, k, d = 0) {

        let val = this.objValue(o, k, d);

        val = parseInt(val);

        if (isNaN(val)) {
            val = d;
        }

        return val > 0 ? 1 : 0;
    },

    /**
     * Gets object's key value as float
     *
     * @param o The source object
     * @param k The key
     * @param d Default value, if key doesn't exist
     *
     * @returns {Number}
     */

    objValueAsFloat: function (o, k, d) {

        let val = this.objValue(o, k, d);

        val = parseFloat(val);

        if (isNaN(val)) {
            val = 0.0;
        }

        return val;
    },

    /**
     * Gets object's key value as boolean
     *
     * @param o The source object
     * @param k The key
     * @param d Default value, if key doesn't exist
     *
     * @returns {boolean}
     */

    objValueAsBool: function (o, k, d) {

        return !!(this.objValue(o, k, d));

    },

    /**
     * Gets object's key value as array
     *
     * @param o The source object
     * @param k The key
     * @param d Default value, if key doesn't exist
     *
     * @returns {Object}
     */

    objValueAsArray: function (o, k, d) {

        d = this.isArray(d) ? d : [];

        let val = this.objValue(o, k, d);

        return this.isArray(val) ? val : d;
    },

    /**
     * Checks if object has the given method on its own or in prototype chain
     *
     * @param o The source object
     * @param m The method name
     *
     * @returns {boolean}
     */

    hasMethod: function (o, m) {

        return this.isPlainObject(o) && (this.functions(o).indexOf(m) >= 0);

    },

    /**
     * Checks if a property (either value of function) exists in object itself or in its prototype chain
     *
     * @param o The object
     * @param k The key
     *
     * @returns {boolean}
     */

    hasProperty: function (o, k) {

        return this.isPlainObject(o) && this.allKeys(o).indexOf(k) >= 0;

    },

    /**
     * Generates a guid
     *
     * @returns {string}
     */

    guid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);

            return v.toString(16);
        });
    }

});

export default _;