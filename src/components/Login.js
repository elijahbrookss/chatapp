import {Form, Button} from 'semantic-ui-react'
import React, { useState } from 'react'

const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const error = props.error

  return(
    <>
    <p style={{color: 'red'}}>{error}</p>
    <h1 className="name"> Welcome Back, Login </h1>
      <Form onSubmit={e => props.login(e, username, password)}>
        <Form.Group>
          <Form.Input onChange={e => setUsername(e.target.value)} fluid label='Username' placeholder='Username' />
          <Form.Input onChange={e => setPassword(e.target.value)} fluid label='Password' placeholder='Password' type="password" />
          <Button type="submit">Login</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default Login;
