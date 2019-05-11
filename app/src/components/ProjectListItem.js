import React, {Component} from 'react';
import {CollectionItem, Icon} from "react-materialize";

export class ProjectListItem extends Component {
    //ikona w zaleznosci od main jezyka
    render() {
        return (
            <CollectionItem href={'/login'} className="avatar">
                <img src="https://i.imgur.com/MVdkcM6.png" alt="" className="circle" />
                <span className="title">
                    Project Title
                </span>
                <p>
                    Project Description

                </p>
                <a href="javascript:void(0)" className="secondary-content">
                    <Icon>

                    </Icon>
                </a>
            </CollectionItem>
        );
    }
}
export default ProjectListItem;