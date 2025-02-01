import './../styles/main.scss';

import Modal from './app/modal';
import ModalManager from './app/modal-manager';
import ModalParam2DataAttrs from "./app/parsers/converters/modal-param-2-data-attrs";
import FormSerializer from "./app/utils/form-serializer";

ModalManager.instance = new ModalManager();


export {ModalManager, Modal, ModalParam2DataAttrs, FormSerializer}