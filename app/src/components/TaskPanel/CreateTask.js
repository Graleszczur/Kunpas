import React, { Component } from "react";
import { TextInput, Button, Textarea } from 'react-materialize'


export default class CreateTask extends Component {
    constructor(props) {
        super(props);
        var url = new URL(window.location.href);
        var c = url.searchParams.get("objectId");
        this.state = {
            name: "",
            description: "",
            teamId: c,
            eta: ""
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
            variables: {description: this.state.description, name: this.state.name, eta: this.state.eta, teamId: this.state.teamId}
        }).then(function(data) {
            window.location.href = '/app/task';
        }).catch(function(err) {
            alert(err);
        });
    }

    render() {
        return (
            <div className="Login">
                <form style={{display: 'inline-block', paddingTop: "100px"}} onSubmit={this.handleSubmit}>
                <h2> Create a Task</h2>
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
                    <TextInput
                        label="ETA"
                        id="eta"
                        value={this.state.eta}
                        onChange={this.handleChange}
                    />
                    <Button
                        type="Login"
                        waves="light"
                        disabled={!this.validateForm()}
                    >
                        Create
                    </Button>
                </form>
            </div>
        );
    }
}
