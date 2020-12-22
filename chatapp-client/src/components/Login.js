import {Form, Segment} from 'semantic-ui-react'

const Login = (props) => {

  return(
    <>
    <h1> Welcome Back, Login </h1>
      <Segment inverted>
        <Form inverted>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Username' placeholder='Username' />
            <Form.Input fluid label='Password' placeholder='Password' type="password" />
          </Form.Group>
        </Form>
      </Segment>
    </>
  )
}

export default Login;
