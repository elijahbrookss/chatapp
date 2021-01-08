import {Form, Button} from 'semantic-ui-react'
import React, { useState } from 'react'

const Login = (props) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return(
    <>
    <h1 className="name"> Login </h1>
    <Form className="form" onSubmit={e => props.login(e, username, password)}>
      <Form.Group >
        <Form.Input onChange={e => setUsername(e.target.value)} fluid label="Username" placeholder='Enter your username' />
        <Form.Input onChange={e => setPassword(e.target.value)} fluid label="Password" placeholder='Enter your Password' type="password" />
        <Button className="inputButton" type="submit">Login</Button>
      </Form.Group>
    </Form>
    </>
  )
}

export default Login;
