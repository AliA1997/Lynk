const addEvent = require('./functions/addEvent');
const handle = require('./functions/handleChange');

test("addEvent test length",() => {
    let addEvents = addEvent.events
    const objectToadd = {
        id: 5,
        name: "Pual",
        topic: "Making friends"
    }
    addEvents = addEvent.addEvent()
    expect(addEvents).toContainEqual(objectToadd)
})

test("handle", () => {
    let objCheck = handle.stuff
    objCheck = handle.handleChange('bbq chicken')
    console.log('obj test', objCheck)
    expect(objCheck.value).toBeTruthy()
})