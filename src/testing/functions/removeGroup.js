module.exports = {
    groups: [
        {
            id: 1,
            name: 'Cleveland Forever',
            description: 'We love cleveland'
        },
        {
            id: 2,
            name: 'Los Angeles Forever',
            description: 'We love los angeles'
        },
        {
            id: 3,
            name: 'Detroit Forever',
            description: 'We love detroit'
        },
        {
            id: 4,
            name: 'Miami Forever',
            description: 'We love miami'
        }
    ],
    getGroup(name) {
      let groupToReturn = this.groups.filter(group => group.name === name)[0];
      return groupToReturn;
    },
    removeGroup(name) {
        let indexOfGroupToRemove = this.groups.findIndex(group => group.name === name);
        this.groups.splice(indexOfGroupToRemove, 1);
        return this.groups;
    }
}