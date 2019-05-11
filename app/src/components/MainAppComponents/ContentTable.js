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
                            <AppListItem title={this.props.title} description={this.props.description} dir={this.props.dir}/>
                            <AppListItem title={this.props.title} description={this.props.description} dir={this.props.dir}/>
                            <AppListItem title={this.props.title} description={this.props.description} dir={this.props.dir}/>
                        </Collection>
                    </Col>
                </Row>
            </div>

        );
    }
}
export default ContentTable;