const _ = {

    has (obj : any, key : any) : boolean {
        return obj != null && Object.prototype.hasOwnProperty.call(obj, key);
    },

    isFunction(value: any): boolean {
        return typeof value === 'function';
    },

    isString(value: any): boolean {
        return typeof value === 'string';
    },

    isArray(value : any) : boolean {
        return Array.isArray(value);
    },

    isNumberOrString(value: any): boolean {

        return typeof value === 'string' || typeof value === 'number';

    },

    joinObjectPropertiesAsString(first: Record<string, any>, second: Record<string, any>, properties: string[], separator: string = ' ', trim: boolean = true): object {

        if (!properties.length) {
            return first;
        }

        properties.forEach((propName: string) => {

            first[propName] = _.objValueAsString(first, propName, '') + separator + _.objValueAsString(second, propName, '');

            if (trim) {
                first[propName] = first[propName].trim();
            }
        });

        return first;

    },

    /**
     * Is the value passed a true javascript object?
     * @param o
     * @returns {boolean}
     */

    isPlainObject: function (o: any): boolean {

        return this.isObject(o)
            && !this.isFunction(o)
            && !this.isArray(o)
            && (Object.getPrototypeOf(o) === Object.prototype);

    },

    /**
     * Makes sure the value is an object, if not returns default value
     * @param v
     * @param d
     *
     * @return {Object}
     */

    asObject: function (v: any, d: object): object {

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

    asString: function (v: any, d: string): string {

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

    asInt: function (v: any, d: number = 0): number {

        d = Number.isInteger(d) ? d : 0;

        if (_.isArray(v)) {
            return d;
        }

        if (typeof v === 'string') {

            v = v.trim();

            if (!/^[+-]?\d+$/.test(v)) {
                return d;
            }

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

    asFloat: function (v: any, d: number = 0.0): number {

        if (_.isArray(v)) {
            return d;
        }

        if (typeof v === 'string') {

            v = v.trim();

            if (!/^[+-]?(?:\d+|\.\d+)(?:\.\d*)?$/.test(v)) {
                return d;
            }
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

    asArray: function (v: any, d: unknown[]): unknown[] {

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

    objOwnValue: function (o: any, k: string, d: any= undefined): any {
        return this.isPlainObject(o) && this.has(o, k) ? o[k] : d;
    },

    /**
     * Gets a value from an object using a key.
     * @returns {*}
     * @param o
     * @param k
     * @param d
     */

    objValue: function (o: any, k: string, d: any = undefined): any {
        return this.isPlainObject(o) && this.hasProperty(o, k) ? o[k] : d;
    },

    /**
     * Gets a value from an object as string
     * @param o
     * @param k
     * @param d
     * @returns {*}
     */

    objValueAsString: function (o: unknown, k: string, d: string = ''): string {

        if (this.isUndefined(d) || this.isNull(d)) {
            d = '';
        }

        let val = this.objValue(o, k, d);

        return this.isNumberOrString(val) ? val : d;

    },

    /**
     * Gets a value from an object as object
     * @param o
     * @param k
     * @param d
     * @returns {*}
     */

    objValueAsObject: function (o: any, k: string, d: object = {}): object {


        if (!this.isPlainObject(o)) {
            return d;
        }

        if (!this.isPlainObject(d)) {
            d = {};
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

    objValueAsInt: function (o: object, k: string, d: number = 0): number {

        let val = this.objValue(o, k, d);

        val = parseInt(val);

        if (isNaN(val)) {
            val = 0;
        }

        return val;
    },

    objValueAsIntFlag: function (o: object, k: string, d: number = 0): number {

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

    objValueAsFloat: function (o: object, k: string, d: number = 0.0): number {

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

    objValueAsBool: function (o: object, k: string, d: boolean = false): boolean {

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

    objValueAsArray: function (o: object, k: string, d: unknown[] = []): unknown[] {

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

    hasMethod: function (o: object, m: string): boolean {

        return this.isPlainObject(o) && (this.functions(o).indexOf(m) >= 0);

    },

    isNull(value : any) : boolean {
        return value === null;
    },

    isUndefined(value: any): boolean {
        return value === void 0;
    },


    functions(obj : any) : string[] {
        let names = [];

        for (let key in obj) {
            if (_.isFunction(obj[key])) names.push(key);
        }
        return names.sort();
    },

    /**
     * Checks if a property (either value of function) exists in object itself or in its prototype chain
     *
     * @param o The object
     * @param k The key
     *
     * @returns {boolean}
     */

    hasProperty: function (o: object, k: string): boolean {

        return this.isPlainObject(o) && this.allKeys(o).indexOf(k) >= 0;

    },

    isObject(value : any) : boolean {
      return value !== null && (typeof value === 'object') && !Array.isArray(value);
    },

    allKeys(obj : any) {
        if (!_.isObject(obj)) return []; // Ensure obj is an object
        let keys = [];
        for (let key in obj) keys.push(key); // Loop through all properties (including inherited)
        return keys;
    },

    /**
     * Generates a guid
     *
     * @returns {string}
     */

    guid: function (): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            let r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);

            return v.toString(16);
        });
    },

    objValueAsMethod: function (o: any, k: string, d: unknown = null): unknown {

        let val = this.objValue(o, k, d);

        return this.isFunction(val) ? val : d;
    },

    isAlphanumeric(value: any): boolean {
        return typeof value === "string" && /^[a-z0-9]+$/i.test(value);
    },

    ensureSemicolon(str: string): string {
        return str.trim().endsWith(";") ? str.trim() : str.trim() + ";";
    },

    encodeHTML(html: string): string {
        return html
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#39;");
    },

    buildQueryParams(obj: Record<string, any>, prefix = ""): string {
        const queryString: string[] = [];

        for (const key in obj) {
            if (obj.hasOwnProperty(key)) {
                const value = obj[key];
                const fullKey = prefix ? `${prefix}[${key}]` : key;

                if (typeof value === "object" && value !== null) {
                    // Recursively flatten nested objects & arrays
                    queryString.push(this.buildQueryParams(value, fullKey));
                } else {
                    // Encode key-value pair
                    queryString.push(`${encodeURIComponent(fullKey)}=${encodeURIComponent(value)}`);
                }
            }
        }

        return queryString.join("&");
    },

    appendQueryParams(url: string, params: Record<string, any>): string {
        const urlObj = new URL(url);
        const newParams = this.buildQueryParams(params);

        // Preserve existing query params
        urlObj.search = urlObj.search ? `${urlObj.search}&${newParams}` : newParams;

        return urlObj.toString();
    },

    cssClassListToSelector(classList : string | string[]) : string {

        if(typeof classList === 'string' && classList.trim() !== '') {

            let parts: string[] = classList.split(' ');

            parts = parts.map((value: string) => {return value.trim()});

            parts = parts.filter((value : string) => {return value.trim() !== ''});

            return `.${parts.join('.')}`;

        } else if(_.isArray(classList) && classList.length) {

            let parts : string[] = (classList as any[]).filter((value) => {
                return _.isString(value) ? value : '';
            }).join(' ').split(' ');

            parts = parts.map((value: string) => {
                return _.isString(value) ? value.trim() : '';
            });

            parts = parts.filter((value: string) => {
                return value.trim() !== ''
            });

            return `.${parts.join('.')}`;

        }

        return '';

    }
}

export default _;