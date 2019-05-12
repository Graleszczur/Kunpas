import React, {Component} from 'react';
import {Collection, CollectionItem} from 'react-materialize'


export class TaskInfo extends Component {
    render() {
        return (
            <div style={{paddingLeft: '20%'}}>
                <Collection>
                    <CollectionItem>
                        Project: Home Box
                    </CollectionItem>
                    <CollectionItem style={{marginTop:'5px'}}>
                        Description: Very good, very  <br/> profitable IoT project
                    </CollectionItem>
                    <CollectionItem>
                        Deadline: 21.07.2013
                    </CollectionItem>
                    <CollectionItem>
                        Is Done?: No
                    </CollectionItem>
                </Collection>
            </div>

        );
    }
}
export default TaskInfo;