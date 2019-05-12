import React, {Component} from 'react';
import {Button} from 'react-materialize'

export class TaskAddButton extends Component {

    render() {
        return (
            <div style={{paddingTop: '12%',  paddingLeft: '85%'}}>
                <Button
                    floating
                    large
                    className="red"
                    waves="light"
                    icon="add"
                    onClick ={() => window.location.href = '/app/add-task'}
                />
            </div>


        );
    }
}
export default TaskAddButton;