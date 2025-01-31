import './../styles/main.scss';

import Modal from './app/modal';
import ModalManager from './app/modal-manager';

/*export {default as Modal} from './app/modal';
export {default as ModalManager} from './app/modal-manager';*/

ModalManager.instance = new ModalManager();

export {ModalManager,Modal}