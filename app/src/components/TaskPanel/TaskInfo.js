import React, {Component} from 'react';
import {Collection, CollectionItem} from 'react-materialize'


export class TaskInfo extends Component {
    render() {
        return (
            <div style={{paddingLeft: '20%'}}>
                <Collection>
                    <CollectionItem>
                        {this.props.name}
                    </CollectionItem>
                    <CollectionItem style={{marginTop:'5px'}}>
                        {this.props.description}
                    </CollectionItem>
                    <CollectionItem>
                        {this.props.eta}
                    </CollectionItem>
                    <CollectionItem>
                        {this.props.status}
                    </CollectionItem>
                </Collection>
            </div>

        );
    }
}
export default TaskInfo;
