import * as _ from 'underscore';

export class LayeredModalManager {

    #params : object = {};

    constructor({params} : {params : object}) {

        this.#params = _.isObject(params) ? params : {};

    }

}