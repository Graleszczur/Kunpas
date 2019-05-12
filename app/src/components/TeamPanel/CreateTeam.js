import React, { Component } from "react";
import { TextInput, Button, Textarea } from 'react-materialize'


export default class CreateTeam extends Component {
    constructor(props) {
        super(props);
        var url = new URL(window.location.href);
        var c = url.searchParams.get("projectId");
        this.state = {
            name: "",
            description: "",
            projectId: c,
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
            variables: {projectId: this.state.projectId, name: this.state.name}
        }).then(function(data) {
            window.location.href = '/app/project-teams?objectId='+ data.data.createTeam.team.projectId;
        })
    }

    render() {
        return (
            <div className="Login">
                <form style={{display: 'inline-block', paddingTop: "100px"}} onSubmit={this.handleSubmit}>
                  <h2>Create a Team</h2>
                    <TextInput
                        label="Team Name"
                        id="name"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <Button
                        type="Create"
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
