import {LayeredModal} from "../../src/ts/app/layered-modal";
import _ from '../../src/ts/app/utils/mixins'

describe('LayeredModal class tests ...', () => {
    test('should initialize with given ID', () => {
        const modal = new LayeredModal({id: 'test-modal'});
        expect(modal.id).toBe('test-modal');
    });

    test('should show and hide modal', () => {
        const modal = new LayeredModal({id: 'test-modal'});
        modal.show();
        expect(document.body.contains(modal.element)).toBe(true);

        modal.hide();
        expect(document.body.contains(modal.element)).toBe(false);
    });
});
