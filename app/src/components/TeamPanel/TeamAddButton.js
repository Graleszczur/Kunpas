import React, {Component} from 'react';
import {Button, Row, Col} from 'react-materialize'

export class TeamAddButton extends Component {

    render() {
        return (
            <div>
                <Row>
                    <Col s={1} offset={'l9'}>
                        <Button
                            floating
                            large
                            className="red"
                            waves="light"
                            icon="add"
                            onClick ={() => window.location.href = '/app/add-team'}
                        />
                    </Col>

                </Row>
            </div>


        );
    }
}
export default TeamAddButton;