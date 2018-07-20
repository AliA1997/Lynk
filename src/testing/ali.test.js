import removeEvent from './functions/removeEvent';
import removeGroup from './functions/removeGroup';

describe('check if the event is removed', () => {
    let oldLength = removeEvent.events.length;
    it('return the new length of the events.', () => {
        let newEvents = removeEvent.removeEvent('Kobe Bryant is the Goat');
        expect(newEvents.length < oldLength).toBe(true);
    })
})

describe('check if the group is removed.', () => {
    it('return the new length of the groups.', () => {
        let valueToRemove = 'Cleveland Forever';
        let groupToCheck = removeGroup.getGroup(valueToRemove);
        // console.log(groupToCheck)
        let newGroups = removeGroup.removeGroup(valueToRemove);
        //Done with test, by checing if it is falsy.
        expect(newGroups.includes(groupToCheck)).toBeFalsy();
    })
})