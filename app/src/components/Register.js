import React, { Component } from "react";
import { TextInput, Button } from 'react-materialize'


export default class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      password: "",
      email: "",
    };
  }

  validateForm() {
    return this.state.username.length > 0 && this.state.password.length > 0 && this.state.email.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.mutate({
        variables: {password: this.state.password, username: this.state.username, email: this.state.email}
      }).then(function(data) {
        
        window.location.href = '/login';
      })
  }

  render() {
    return (
      <div className="Login">
        <form style={{display: 'inline-block', paddingTop: "100px"}} onSubmit={this.handleSubmit}>
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
          <TextInput
            label="Email"
            id="email"
            value={this.state.email}
            onChange={this.handleChange}
          />
          <Button
            type="Register"
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
