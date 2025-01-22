import {LayeredModal} from "../../src/ts/app/layered-modal";
import _ from '../../src/ts/app/utils/mixins'

describe('LayeredModal class tests ...', () => {
    test('should initialize with given ID', () => {
        const modal = new LayeredModal({id: 'test-modal'});
        expect(modal.getId()).toBe('test-modal');
    });

});
