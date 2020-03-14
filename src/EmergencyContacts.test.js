import React from 'react';
// import {render, fireEvent} from 'react-testing-library';
import EmergencyContacts from './EmergencyContacts';
import { render, fireEvent,getByTestId } from '@testing-library/react';

test('make it render', () => {
    const { rendered } = render(EmergencyContacts);
    expect( rendered('contact-header').textContent ).toBe("Emergency Contacts")

    const addContact = jest.fn();

    fireEvent.click(getByTestId('addContact'))
    expect(addContact).toBeCalledTimes(1);

    fireEvent.click(getByTestId('addContact'))
    expect(addContact).toBeCalledTimes(2);
})
