import React from "react";
import firebase from "../../../firebase";
import {
  Grid,
  Form,
  Segment,
  Button,
  Header,
  Message,
  Icon
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    errors:[],
    loading: false
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if(this.isValid(this.state)){
      this.setState({
        errors:[], loading: true
      })
      firebase
      .auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(signedInUser => {
        console.log(signedInUser);
        this.setState({
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err),
          loading: false
        });
      });
    }  
  };

  isValid = (state) => {
     let errors = [];
     let error;
     if(this.isFieldsEmpty(state)){
       error = { message: "Invalid login or password. Please try again." }
       this.setState({
          errors: errors.concat(error)
       });
       return false;
     }
     else {
       return true;
     }
  }
  
  isFieldsEmpty = ({ email, password}) => {
    return !email.length || !password.length; 
  }

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);
  
 
  render() {
    const { email, password, errors , loading} = this.state;

    return (
      <Grid textAlign="center" verticalAlign="middle" className="app">
        <Grid.Column style={{ maxWidth: 450 }}>
          <Header as="h2" icon color="orange" textAlign="center">
            <Icon name="coffee" color="orange" />
            Login to Chat Clone
          </Header>
          <Form onSubmit={this.handleSubmit} size="large">
            <Segment stacked>
             
              <Form.Input
                fluid
                name="email"
                icon="mail"
                iconPosition="left"
                placeholder="Email Address"
                onChange={this.handleChange}
                value={email}
                type="email"
              />

              <Form.Input
                fluid
                name="password"
                icon="lock"
                iconPosition="left"
                placeholder="Password"
                onChange={this.handleChange}
                value={password}
                type="password"
              />

              <Button disabled = {loading} color="orange" fluid size="large"
               className={loading ? "loading" : ""}>
                Login
              </Button>
            </Segment>
          </Form>
          { errors.length > 0 && (
            <Message error>
              <h3>Error</h3>
              {this.displayErrors(errors)}
            </Message>
          )}
          <Message>
            Don't have an Account? <Link to="/register">Login</Link>
          </Message>
        </Grid.Column>
      </Grid>
    );
  }
}

export default Login;