import React from 'react';
import GroupForm  from './GroupForm/GroupForm';
import renderer from 'react-test-renderer';
import { wrap } from 'module';
import { shallow, mount, render } from 'enzyme';

//Import the component and create a mock function
describe('Check handlechange works for component', () => {
    let wrapper;
    //mock function replace the one in groupForm that handle changes using the built fn method on jest invoked!.
    let mockHandleChange = jest.fn();
    beforeEach(() => {
        // Pass the function as the handleNameChange prop, also use shallow rendering and assign to wrapper variable.
        wrapper = shallow(<GroupForm handleName={mockHandleChange} />);
        wrapper = renderer.sha

        console.log('wrapper--------------', wrapper);
    })
    it('Check handleName ', () => {
        wrapper.find('#name').simulate('change', {
            target: {name: 'groupName', value: 'LBJ_23'}
        })
        console.log('jest-------------', wrapper) 
        // ww

    })
    it('Check handleDescription', () => {
        wrapper.find('#description').simulate('change', {
            target: {name: 'groupDescription', value: 'DWade_03'}
        })
    })
    
})
