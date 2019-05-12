import React, {Component} from 'react';
import {Button, Icon} from 'react-materialize'

export class TaskFooter extends Component {
    render() {
        return (
            <div style={{paddingLeft: '37%', paddingTop: '5%'}}>
                <Button onClick ={() => window.location.href = '/app/task/edit'} waves="light" style={{marginRight: '50px'}}>
                   Edit
                    <Icon left>
                        edit
                    </Icon>
                </Button>
                <Button waves="light" style={{marginRight: '50px'}}>
                    Mark as done
                    <Icon left>
                        check
                    </Icon>
                </Button>
                <Button waves="light" style={{marginRight: '50px'}}>
                    Send email
                    <Icon left>
                        mail
                    </Icon>
                </Button>
                <Button waves="light" style={{marginRight: '50px'}}>
                    Send SMS
                    <Icon left>
                        textsms
                    </Icon>
                </Button>
            </div>

        );
    }
}
export default TaskFooter;