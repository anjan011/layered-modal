import '../styles/main.scss';
import _ from './app/utils/mixins';
import {LayeredModal} from "./app/layered-modal";
import LayeredModalManager from "./app/layered-modal-manager";

(window as any).LayeredModalManager = LayeredModalManager;

export {LayeredModal,LayeredModalManager,_}