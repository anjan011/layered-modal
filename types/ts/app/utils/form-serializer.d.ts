export default class FormSerializer {
    private form;
    private skipEmptyString;
    constructor(formId: string, skipEmptyString?: boolean);
    serialize(): any;
    private parseName;
    private parseValue;
    private setDeepValue;
}
