import React, { Component } from "react";
import { TextInput, Button } from 'react-materialize'


export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: ""
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.mutate({
        variables: {password: this.state.password, username: this.state.username}
      }).then(function(data) {
          localStorage.setItem('token', data.data.tokenAuth.token);
          window.location.href = '/app';
        }
      ).catch(function(err) {
          alert('Incorrect data!');
      });
  }

  render() {
    return (
      <div className="Login">
        <form style={{display: 'inline-block', paddingTop: "100px"}} onSubmit={this.handleSubmit}>
          <h2>Login</h2>
          <TextInput
            label="Username"
            id="username"
            value={this.state.username}
            onChange={this.handleChange}
          />
          <TextInput password
            label="Password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <Button
            type="Login"
            waves="light"
            disabled={!this.validateForm()}
          >
            Login
          </Button>
        </form>
      </div>
    );
  }
}
