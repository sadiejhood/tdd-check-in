
import React, { useState, useEffect } from 'react';
import './App.css';
import 'rbx/index.css';
import { Title, Button, Container, Table, Field, Control, Input, Content, Message } from 'rbx';
import FirebaseHelper from './Functions/FirebaseHelper';
import {render, fireEvent} from 'react-testing-library';
import * as emailjs from 'emailjs-com'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';


const EmergencyContacts = () => {
    const [disabled, setDisabled] = useState(true);
    const [contacts, setContacts] = useState([]);
    const [invalidEmail, setInvalidEmail] = useState(false);
    const [showContacts, setShowContacts] = useState(false);
    const [user, setUser] = useState(null);
    const [UserEmail, setUserEmail] = useState(null);

    const StartOnUserLoad = (newUser) =>{
        // if(!newUser){
        // console.log("user missing");
        // }
        // else{
        // console.log(newUser.displayName)
        
        // setUser(newUser.displayName);
        // console.log(user)
        // FirebaseHelper.FetchTime(newUser.displayName).then(time => { 
        //     setDisabled(ButtonEnabled(time, newUser.displayName));
        // });
        // setUserEmail(newUser.email);
        FirebaseHelper.FetchContacts(newUser.displayName, newUser.email).then(currContacts => {
            console.log(currContacts);
            setContacts(currContacts);
        });
        
    };


    useEffect(() => {
        const startContacts = () => {
        FirebaseHelper.FetchContacts().then(currContacts => {
            setContacts(currContacts);
        })
        };
        startContacts();
    }, []);


    const RemoveContact = (contact) => {
        FirebaseHelper.RemoveContact(contact, user);
    
        FirebaseHelper.FetchContacts(user).then(currContacts => {
          setContacts(currContacts);
        })
      }
    
      const AddContact = (name, email) => {
        if (!RegExp('[a-zA-Z0-9-_.]+@[a-zA-Z0-9]+.[a-zA-Z0-9]+').test(email)) {
          setInvalidEmail(true);
          return
        }
        setInvalidEmail(false);
        FirebaseHelper.StoreContact({name:name, email:email}, user).then( newContacts => {
          setContacts(newContacts);
        });
      }
    
      const EmergencyContacts2 = ({contacts}) => {
        return (
          <Table id='contact-table'>
            <Table.Body>
              {contacts.map(contact =>
                <Table.Row key={contact.name.concat('_', contact.email)}>
                  <Table.Cell>
                    {contact.name}
                  </Table.Cell>
                  <Table.Cell>
                    {contact.email}
                  </Table.Cell>
                  <Table.Cell>
                    <Button onClick={()=>{RemoveContact(contact)}}>X</Button>
                  </Table.Cell>
                </Table.Row>
              )}
            </Table.Body>
          </Table>
        );
      };
    
      var currName = '';
      var currNum = '';

    return (
      <div>
        <Title data-testid={`contact-header`} size={5} id='contact-header'>Emergency Contacts</Title>
        <EmergencyContacts2 contacts={ contacts }/>
        <br/>
        
        <Field>
            <Control className='input-box'>
            <Input type='text' placeholder="Contact's Name" onChange={ e => currName=e.target.value }/>
            </Control>
            <Control className='input-box'>
            <Input type='text' placeholder="Contact's Email" onChange={ e => currNum=e.target.value }/>
            </Control>
        </Field>
        <Content size='medium' className='invalid-email' hidden={ !invalidEmail }>Invalid Email</Content>
        <br/>
        <Button.Group align='centered'>
            <Button size={ 'medium' } color={ 'info' } onClick={() => AddContact(currName, currNum) }>Add Emergency Contacts</Button>
        </Button.Group>
      </div>
    );

};

export default EmergencyContacts;

// import React from 'react';
// import {render, fireEvent} from 'react-testing-library';
// import EmergencyContacts from './EmergencyContacts';

test('make it render', () => {
    const { rendered } = render(EmergencyContacts);
    expect( rendered('contact-header').textContent ).toBe("Emergency Contacts")
})

