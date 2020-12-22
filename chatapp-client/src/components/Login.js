import {Form} from 'semantic-ui-react'

const Login = (props) => {

  return(
    <>
    <h1> Welcome Back, Login </h1>
      <Form>
        <Form.Group>
          <Form.Input fluid label='Username' placeholder='Username' width={2} />
          <Form.Input fluid label='Password' placeholder='Password' type="password" />
        </Form.Group>
      </Form>
    </>
  )
}

export default Login;
