const group = require('./addGroup');


test('adding new group test', () => {
    let groups = group.groupList;
    
    let oldLength = groups.length;

    groups = group.addGroup();

    expect(groups.length).toBeGreaterThan(oldLength);
})