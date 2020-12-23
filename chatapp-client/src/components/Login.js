import {Form, Button} from 'semantic-ui-react'
import React, { useState } from 'react'

const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return(
    <>
    <h1> Welcome Back, Login </h1>
      <Form onSubmit={e => props.login(e, username, password)}>
        <Form.Group>
          <Form.Input onChange={e => setUsername(e.target.value)} fluid label='Username' placeholder='Username' width={2} />
          <Form.Input onChange={e => setPassword(e.target.value)} fluid label='Password' placeholder='Password' type="password" />
          <Button type="submit">Login</Button>
        </Form.Group>
      </Form>
    </>
  )
}

export default Login;
