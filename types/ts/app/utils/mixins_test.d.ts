import _ from "underscore";
declare module 'underscore' {
    interface UnderscoreStatic {
        guid(): string;
    }
}
export default _;
