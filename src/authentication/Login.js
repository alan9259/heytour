import React from 'react'
import { Button, Form, Modal } from 'semantic-ui-react'

export default function Login(props) {



  return (

    <Modal 
      onClose={props.onClose}
      open={props.open}
    >
      <Modal.Header>Login</Modal.Header>

      <Form>
        <Form.Field>
          <label>First Name</label>
          <input placeholder='User Name' />
        </Form.Field>
        <Form.Field>
          <label>Last Name</label>
          <input placeholder='Password' />
        </Form.Field>

        <Button 
        onClick={props.onClose}>
          Close
        </Button>
        
        <Button type='submit'
          onClick={props.onLogin}>
          Login
        </Button>
      </Form>
    </Modal>
    
  )
}

