import React, {Component} from 'react';
import {Collection, CollectionItem} from 'react-materialize'


export class TaskInfo extends Component {
    render() {
        let emo = '❌'
        if(this.props.data.status === true){
          emo = '✅'
        }
        return (
            <div style={{paddingLeft: '21.5%'}}>
                <Collection>
                    <CollectionItem>
                        Name: {this.props.data.name}
                    </CollectionItem>
                    <CollectionItem style={{marginTop:'5px'}}>
                        Description: {this.props.data.description}
                    </CollectionItem>
                    <CollectionItem>
                        Estimated date:{this.props.data.eta}
                    </CollectionItem>
                    <CollectionItem>
                        Status of task: {emo}
                    </CollectionItem>
                </Collection>
            </div>

        );
    }
}
export default TaskInfo;
