import React, { Component } from "react";
import { TextInput, Button, Textarea } from 'react-materialize'


export default class CreateTask extends Component {
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
            window.location.href = '/app/projects';
        })
    }

    render() {
        return (
            <div className="Login">
                <form style={{display: 'inline-block', paddingTop: "100px"}} onSubmit={this.handleSubmit}>
                    <TextInput
                        label="Task title"
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
                        type="Login"
                        waves="light"
                        disabled={!this.validateForm()}
                    >
                        Add task
                    </Button>
                </form>
            </div>
        );
    }
}
