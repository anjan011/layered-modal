export default class FormSerializer {
    private form;
    constructor(formId: string);
    private parseName;
    serialize(): Record<string, any>;
    serializeArray(): Array<{
        name: string;
        value: string;
    }>;
}
