import React, { useReducer } from 'react'
import { Menu, Button } from 'semantic-ui-react'
import Auth from '../authentication/Auth';
import appMenuReducer from './AppMenuReducer'

export default function AppMenu() {
  const [state, dispatch] = useReducer(appMenuReducer, {
    user: {},
    authenticated: false,
    authOpen: false
  });

  function handleOpenAuth() {
    dispatch({type: 'AUTHENTICATING'});
  }

  function handleAuthClose() {
    dispatch({type: 'UNAUTHENTICATED'});
  }

  function handleLogin(user) {
    dispatch({type: 'AUTHENTICATED', payload: {user: user}});
  }

  function handleLogout() {
    dispatch({type: 'UNAUTHENTICATED'});
  }

  return (
    <div>
      <Menu size='large'>
        <Menu.Item
            name='Heytour'
        />

        <Menu.Menu position='right'>
          {!state.authenticated && 
          <Menu.Item>
            <Button primary onClick={handleOpenAuth}>
              Login
            </Button>
          </Menu.Item>
          }
          
          {state.authenticated &&
            <Menu.Item name={state.user.firstName + ' ' + state.user.lastName} />
          }

          {state.authenticated &&
            <Menu.Item>
              <Button primary onClick={handleLogout}>
                Logout
              </Button>
            </Menu.Item>
          }
        </Menu.Menu>
      </Menu>

      {state.authOpen && 
        <Auth
          open={state.authOpen}
          onClose={handleAuthClose}
          onLogin={handleLogin}
        />
      }
    </div>
  )
}