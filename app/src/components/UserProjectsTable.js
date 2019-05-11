import React, {Component} from 'react';
import {Row, Col, Collection} from 'react-materialize'
import ProjectListItem from './ProjectListItem'


export class UserProjectsTable extends Component {
    render() {
        return (
            <div>
                <Row></Row>
                <Row></Row>
                <Row>
                    <Col s={6} offset={'l4'}>
                        <Collection>
                            <ProjectListItem/>
                            <ProjectListItem/>
                            <ProjectListItem/>
                        </Collection>
                    </Col>
                </Row>
            </div>

        );
    }
}
export default UserProjectsTable;