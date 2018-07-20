module.exports = {
    groupList: [
        {
            id: 1,
            name: 'Wildcat group'
        },
        {
            id: 2,
            name: 'Suns group'
        },
        {
            id: 3,
            name: 'Dbacks group'
        }
    ],

    addGroup(){
        this.groupList.push({
            id: 4,
            name: 'Cards group'
        })
        return this.groupList;
    }
}