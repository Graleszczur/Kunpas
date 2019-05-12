import React, {Component} from 'react';
import {CollectionItem, Icon} from "react-materialize";

export class AppListItem extends Component {
    //ikona w zaleznosci od main jezyka
    render() {
        return (
            <CollectionItem href={this.props.dir} className="avatar">
                <img src="https://i.imgur.com/MVdkcM6.png" alt="" className="circle" />
                <span className="title">
                    {this.props.title}
                </span>
                <p>
                    {this.props.description}
                </p>
                <a href="javascript:void(0)" className="secondary-content">
                    <Icon>

                    </Icon>
                </a>
            </CollectionItem>
        );
    }
}
export default AppListItem;
