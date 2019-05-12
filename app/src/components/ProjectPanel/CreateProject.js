import React, { Component } from "react";
import { TextInput, Button, Textarea } from 'react-materialize'


export default class CreateProject extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      description: "",
    };
  }

  validateForm() {
    return this.state.name.length > 0;
  }

  handleChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();
    this.props.mutate({
        variables: {description: this.state.description, name: this.state.name}
      }).then(function(data) {
        window.location.href = '/app/projects-list';
      })
  }

  render() {
    return (
      <div className="Login">
        <h2>Create a Project</h2>
        <form style={{display: 'inline-block', paddingTop: "40px"}} onSubmit={this.handleSubmit}>
          <TextInput
            label="Name"
            id="name"
            value={this.state.name}
            onChange={this.handleChange}
          />
          <Textarea
            label="Description"
            id="description"
            value={this.state.description}
            onChange={this.handleChange}
          />
          <Button
            type="Create"
            waves="light"
            disabled={!this.validateForm()}
          >
            Add project
          </Button>
        </form>
      </div>
    );
  }
}
