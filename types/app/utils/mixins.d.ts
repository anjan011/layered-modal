import _ from 'underscore';
declare module 'underscore' {
    interface UnderscoreStatic {
        t: () => string;
    }
}
export default _;
