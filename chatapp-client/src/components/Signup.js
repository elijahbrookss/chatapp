import {Form, Segment} from 'semantic-ui-react'

const Signup = (props) => {

  return(
    <>
    <h1> Create An Account </h1>
      <Segment inverted>
        <Form inverted>
          <Form.Group widths='equal'>
            <Form.Input fluid label='Firstname' placeholder='First Name' required />
            <Form.Input fluid label='Lastname' placeholder='Last Name' required />
            <Form.Input fluid label='Username' placeholder='Username' required />
            <Form.Input fluid label='Email' placeholder='Email' type="email" required />


            <Form.Input fluid label='Password' placeholder='Password' type="password" required />
            <Form.Input fluid label='Confirm Password' placeholder='Confirm Password' type="password" required />
          </Form.Group>
        </Form>
      </Segment>
    </>
  )
}

export default Signup;
