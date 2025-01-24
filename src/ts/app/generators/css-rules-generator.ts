import {Dimension} from "../interfaces/common";

export class CssRulesGenerator {

    /**
     * Generates css rules from a dimension type object and a css property name
     *
     * @param dimension
     * @param cssProperty
     */

    static generateDimensionCss(dimension?: Dimension, cssProperty : string = ''): string {

        if(!cssProperty.trim()) {
            return '';
        }

        if(typeof dimension === "undefined") {
            return '';
        }

        if(typeof dimension.value === "undefined") {
            return '';
        }

        let value = dimension.value;
        let unit = dimension.unit;

        if(!unit) {
            unit = 'px';
        }

        if(value === 0) {
            unit = '';
        }

        return `${cssProperty.trim()}:${value}${unit};`;
    }

}