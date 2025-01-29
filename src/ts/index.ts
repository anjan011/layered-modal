import './../styles/main.scss';
import _ from "./app/utils/mixins";

export {default as Modal} from './app/modal';
export {default as ModalManager} from './app/modal-manager';

console.log(_.cssClassListToSelector('modal close modal---not a b'));
console.log(_.cssClassListToSelector(['a','    ','      ','b  c']));