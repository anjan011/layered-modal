import {Modal} from "../../src/ts/app/modal";
import _ from '../../src/ts/app/utils/mixins'

describe('LayeredModal class tests ...', () => {
    test('should initialize with given ID', () => {
        const modal = new Modal({id: 'test-modal'});
        expect(modal.getId()).toBe('test-modal');
    });

});
