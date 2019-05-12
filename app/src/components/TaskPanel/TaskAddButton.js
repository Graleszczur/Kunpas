import React, {Component} from 'react';
import {Button} from 'react-materialize'

export class TaskAddButton extends Component {

    render() {
        return (
            <div style={{paddingTop: '2%',  paddingLeft: '80%'}}>
                <Button
                    floating
                    large
                    className="red"
                    waves="light"
                    icon="add"
                    onClick ={() => window.location.href = '/app/add-task?objectId=' + this.props.objectId}
                />
            </div>


        );
    }
}
export default TaskAddButton;
