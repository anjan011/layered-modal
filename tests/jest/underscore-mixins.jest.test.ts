import _ from "../../src/ts/app/utils/mixins"
import targetObject from '../data/person';

class Test {

}

function green(text: string): string {
    return `\x1b[32m${text}\x1b[0m`;
}

function red(text: string): string {
    return `\x1b[31m${text}\x1b[0m`;
}

describe('Converting data to different types', () => {

    let object = {a: 10, b: [1, 2, 3]};

    test(`Converting {a : 10, b : [1,2,3]} to object `, () => {
        expect(_.asObject(object)).toEqual(object);
    })

    test(`Converting [1,2,3] to object with default value {a:'?'} will return default value`, () => {
        expect(_.asObject([1, 2, 3], {a: '?'})).toEqual({a: '?'});
    })

    test(`Converting "Anjan" to object with no default value will return {}`, () => {
        expect(_.asObject('Anjan')).toEqual({});
    })


    let intNumberList = [
        {value : '-10',expected : -10},
        {value : '+10',expected : 10},
        {value : '  10  ',expected : 10},
        {value : '  1.10',expected : 0},
        {value : '  -1.10',expected : 0},
        {value : '--1.10',expected : 0},
        {value : '1.10++',expected : 0},

        {value: {a: 10}, expected: 0},
        {value: [1, 2, 3], expected: 0},
        {
            value: () => {
                return 1;
            }, expected: 0
        },
    ];

    intNumberList.forEach(function (item, index, itemList) {

        test(`_.asInt(${item.value}) === ${item.expected}`, () => {
            expect(_.asInt(item.value)).toEqual(item.expected);
        })

    });

    let floatNumberList = [
        {value: '-10', expected: -10},
        {value: '+10', expected: 10},
        {value: '  10  ', expected: 10},
        {value: '  .10  ', expected: .1},
        {value: '  10.  ', expected: 10},
        {value: '  -.0010  ', expected: -0.001},
        {value: '  1.10', expected: 1.1},
        {value: '  -1.10', expected: -1.1},
        {value: '--1.10', expected: 0},
        {value: '1.10++', expected: 0},
        {value: 100, expected: 100},
        {value: 100., expected: 100},
        {value: .100, expected: 0.1},
        {value: 5.100, expected: 5.1},
        {value: -5.100, expected: -5.1},
        {value: "-000005.100", expected: -5.1},

        {value : {a : 10},expected: 0},
        {value : [1,2,3],expected: 0},
        {value : () => {return 1;},expected: 0},
    ];

    floatNumberList.forEach(function (item, index, itemList) {

        let val = '';

        if(_.isString(item.value)) {
            val = `"${item.value}"`;
        } else if(_.isNumber(item.value)) {
            val = `${item.value}`;
        } else if(_.isPlainObject(item.value) || _.isArray(item.value)){
            val = `${JSON.stringify(item.value)}`;
        } else if(_.isFunction(item.value)) {
            val = `[function]`;
        }

        test(`_.asFloat(${val}) === ${item.expected}`, () => {
            expect(_.asFloat(item.value)).toEqual(item.expected);
        })

    });

});

describe('Is plain object test', () => {

    /**
     * _.isPlainObject() tests ...
     */

    let plainObjectTests = [

        {
            value: {a: 10, b: {c: new Date()}},
            label: `Testing if {a : 10, b : {c : new Date()}} ${green('IS')} a plain object`,
            expected: true
        },

        {
            value: [1, 2, 3],
            label: `'Testing if [1,2,3] ${red('IS NOT')} a plain object'`,
            expected: false
        },

        {
            value: null,
            label: `Testing if null ${red('IS NOT')} a plain object`,
            expected: false
        },
        {
            value: undefined,
            label: `Testing if undefined ${red('IS NOT')} a plain object`,
            expected: false
        },

        {
            value: "A string",
            label: `Testing if "A string" ${red('IS NOT')} a plain object`,
            expected: false
        },

        {
            value: new Test(),
            label: `Testing if new Test() ${red('IS NOT')} a plain object`,
            expected: false
        },

        {
            value: function () {
            },
            label: `Testing if function() {} ${red('IS NOT')} a plain object`,
            expected: false
        },

        {
            value: -19.5,
            label: `Testing if -19.5 ${red('IS NOT')} a plain object`,
            expected: false
        },

        {
            value: 10E3,
            label: `Testing if 10E3 ${red('IS NOT')} a plain object`,
            expected: false
        },

        {
            value: true,
            label: `Testing if true ${red('IS NOT')} a plain object`,
            expected: false
        },

        {
            value: JSON.parse(JSON.stringify(new Test())),
            label: `Testing if JSON.parse(JSON.stringify(new Test())) ${green('IS')} a plain object`,
            expected: true
        },
    ];

    plainObjectTests.forEach((item) => {


        test(item.label, () => {

            expect(_.isPlainObject(item.value)).toBe(item.expected);

        })

    });

});

describe('Object value retrieval methods', () => {

    /**
     * Object value tests ...
     */



    let objValueTests = [

        {
            key: 'name',
            method: 'objValueAsString',
            label: `_.objValueAsString(targetObject,'name') === 'Anjan'`,
            value: 'Anjan',
        },

        {
            key: 'age',
            method: 'objValueAsInt',
            label: `_.objValueAsInt(targetObject,'age') === 42'`,
            value: 42,
        },

        {
            key: 'weight',
            method: 'objValueAsFloat',
            label: `_.objValueAsFloat(targetObject,'weight') === 82.5'`,
            value: 82.5,
        },

        {
            key: 'skills',
            method: 'objValueAsArray',
            label: `_.objValueAsArray(targetObject,'skills') === ${JSON.stringify(targetObject.skills)}`,
            value: ['php', 'laravel', 'backend'],
        },

        {
            key: 'greet',
            method: 'objValueAsMethod',
            label: `typeof _.objValueAsMethod(targetObject,'greet') === 'function'`,
            value: null,
        },

        {
            key: 'shout',
            method: 'objValueAsMethod',
            label: `typeof _.objValueAsMethod(targetObject,'shout') !== 'function'`,
            value: null,
            not: true,
        },

        {
            key: 'company',
            method: 'objValueAsObject',
            label: `_.objValueAsObject(targetObject,'company') === ${JSON.stringify(targetObject.company)}`,
            value: null,
        },


    ];

    objValueTests.forEach((item) => {

        test(item.label, () => {

            switch (item.method) {
                case 'objValueAsString':
                    expect(_.objValueAsString(targetObject, item.key)).toBe(item.value);
                    break;
                case 'objValueAsInt':
                    expect(_.objValueAsInt(targetObject, item.key)).toBe(item.value);
                    break;
                case 'objValueAsFloat':
                    expect(_.objValueAsFloat(targetObject, item.key)).toBe(item.value);
                    break;
                case 'objValueAsArray':
                    expect(_.objValueAsArray(targetObject, item.key)).toEqual(item.value);
                    break;
                case 'objValueAsMethod':

                    if (_.objValueAsBool(item, 'not')) {
                        expect(typeof _.objValueAsMethod(targetObject, item.key)).not.toBe('function');
                    } else {
                        expect(typeof _.objValueAsMethod(targetObject, item.key)).toBe('function');
                    }


                    break;
                case 'objValueAsObject':
                    expect(_.objValueAsObject(targetObject, item.key)).toEqual(targetObject[item.key]);


                    break;

            }


        })

    });


});