import React from 'react';
import {render, fireEvent} from 'react-testing-library';
import EmergencyContacts from './EmergencyContacts';

test('make it render', () => {
    const { rendered } = render(EmergencyContacts);
    expect( rendered('contact-header').textContent ).toBe("Emergency Contacts")
})
