import './../styles/main.scss';

import _ from "./app/utils/mixins";
import Modal from './app/modal';
import ModalManager from './app/modal-manager';
import ModalParam2DataAttrs from "./app/parsers/converters/modal-param-2-data-attrs";
import FormSerializer from "./app/utils/form-serializer";
import {ModalParams} from "./app/interfaces/modal";
import DataAttrs2ModalParam from "./app/parsers/converters/data-attrs-2-modal-param";

/**
 * Generate the instance ...
 */


ModalManager.instance = new ModalManager();

export {ModalManager, Modal, ModalParam2DataAttrs, FormSerializer}