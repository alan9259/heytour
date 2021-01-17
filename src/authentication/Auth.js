import React, { useEffect, useRef, useReducer } from 'react'
import { Button, Form, Modal, Message } from 'semantic-ui-react'
import { useLogin } from './AuthAPI'
import authReducer from './AuthReducer'


export default function Auth(props) {
  const didMountRef = useRef(false);

  const [login, setLogin] = useLogin(null);
  const [state, dispatch] = useReducer(authReducer, {
    userName: '',
    password: '',
    isError: false,
    isLoading: false,
    validation: {}
  });

  useEffect(() => {
    if (didMountRef.current) {
      if (login.isError) {
        dispatch({type:'AUTH_ERROR'});
      } else {
        props.onLogin(login.data);
      }
    } else {
      didMountRef.current = true;
    };
    
  }, [login]);// eslint-disable-line react-hooks/exhaustive-deps

  function handleLogin() {
    dispatch({type:'AUTH_LOADING'});

    const user = {
      userName: state.userName,
      password: state.password
    };

    setLogin(user);
  }

  function handleChange (e, { name, value }) {
    dispatch({type: 'AUTH_TYPING', payload: {name: name, value: value}})
  } 

  return (
    <Modal 
      onClose={props.onClose}
      open={props.open}
    >
      <Modal.Header>Login</Modal.Header>

      <Modal.Content>
        <Form onSubmit={handleLogin} loading={state.isLoading} error={state.isError}>
          <Form.Input required name='userName' label='User Name' value={state.userName} placeholder='User Name' onChange={handleChange} />
          <Form.Input required name='password' label='Password'  value={state.password} placeholder='Password' type='password' onChange={handleChange} />
          <Button type='button' onClick={props.onClose}>Close</Button>
          <Button type='submit'>Login</Button>
          {state.isError && 
            <Message
              error
              header='Login Failed'
              content='Please check your username and password.'
            />
          }     
        </Form>
      </Modal.Content>
    </Modal>
    
  )
}



