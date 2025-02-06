import './../styles/main.scss';

import Modal from './app/modal';
import ModalManager from './app/modal-manager';
import ModalParam2DataAttrs from "./app/parsers/converters/modal-param-2-data-attrs";
import FormSerializer from "./app/utils/form-serializer";

/*
declare global {
    interface Window {
        ModalManager: typeof ModalManager;
        /!*Modal: typeof Modal;*!/
    }
}
*/


ModalManager.instance = new ModalManager();

/*if(typeof window !== "undefined") {
    window.ModalManager = ModalManager;
    /!*window.Modal = Modal;*!/
}*/

export {ModalManager, Modal, ModalParam2DataAttrs, FormSerializer}