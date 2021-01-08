import {Form, Button} from 'semantic-ui-react'
import React, { useState } from 'react'

const Signup = (props) => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return(
    <>
    <h1 className="name"> Create An Account </h1>
    <Form onSubmit={(e) => props.signUp(e, firstName, lastName, username, email, password)} inverted>
      <Form.Input fluid onChange={e => setFirstName(e.target.value)} label='Firstname' placeholder='First Name' required width={12}/>
      <Form.Input fluid onChange={e => setLastName(e.target.value)} label='Lastname' placeholder='Last Name' required />
      <Form.Input fluid onChange={e => setUsername(e.target.value)} label='Username' placeholder='Username' required />
      <Form.Input fluid onChange={e => setEmail(e.target.value)} label='Email' placeholder='Email' type="email" required />

      <Form.Input fluid onChange={e => setPassword(e.target.value)} label='Password' placeholder='Password' type="password" required />
      <Button className="inputButton" type="submit">Create Account</Button>
    </Form>
    </>
  )
}

export default Signup;
