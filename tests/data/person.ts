const targetObject: {[key:string] : any} = {
    name: 'Anjan',
    age: 42,
    weight: 82.5,
    skills: ['php', 'laravel', 'backend'],
    company: {
        name: 'Virtism'
    },
    greet: function (name: string): any {
        return `Hi ${name}`;
    },
    shout : 'Hey You!',
}

export default targetObject;