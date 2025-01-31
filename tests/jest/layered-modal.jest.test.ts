import Modal from "../../src/ts/app/modal";
import _ from '../../src/ts/app/utils/mixins'

describe('Modal class parameter test', () => {

    /**
     * Check if a a value is given to ID it is set properly
     */

    test('Should initialize with given ID: test-modal', () => {
        const modal = new Modal({id: 'test-modal'});
        expect(modal.getId()).toBe('test-modal');
    });

    test('If ID is not provided the auto generated ID is a valid UUID v4 string', () => {
        const modal = new Modal({});
        expect(_.isValidGUID(modal.getId())).toBe(true);
    });

});
