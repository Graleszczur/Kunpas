import React, {Component} from 'react';
import {Row, Col, Collection} from 'react-materialize'
import AppListItem from './AppListItem'


export class ContentTable extends Component {
    render() {
        return (
            <div>
                <Row></Row>
                <Row></Row>
                <Row>
                    
                    <Col s={6} offset={'l4'}>
                        <Collection>
                              {this.props.objects}
                        </Collection>
                    </Col>
                </Row>
            </div>

        );
    }
}
export default ContentTable;
