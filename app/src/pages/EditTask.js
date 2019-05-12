import React, {Component} from 'react';
import UserSidePanel from '../components/MainAppComponents/UserSidePanel'
import {Row, Col, TextInput, Button, Icon} from 'react-materialize'
export class EditTask extends Component {
    render() {
        const styles = {
            search: {
                marginLeft: '50%'
            }
        };
        return (
           <React.Fragment>
               <div style={styles.search}>
                   <h2 className="header">Edit the task</h2>
               </div>
               <UserSidePanel/>
               <div>
                   <Row>
                       <Col offset={'l6'} l={9}>
                           <TextInput value="Tutaj tytul taska" />
                       </Col>
                   </Row>
                   <hr/>
                   <Row>
                       <Col offset={'l6'} l={9}>
                           <TextInput value="Tutaj opis z bazy" />
                       </Col>
                   </Row>
                   <hr/>
                   <Row>
                       <Col offset={'l6'} l={9}>
                           <TextInput  value="Tutaj deadline" />
                       </Col>
                   </Row>
                   <hr/>
               </div>
               <Row>
                   <br/>
                   <br/>
                   <Col offset={'l10'}>
                       <Button type="submit" waves="light">
                           Submit
                           <Icon right>
                               send
                           </Icon>
                       </Button>
                   </Col>
               </Row>

           </React.Fragment>
        );
    }
}
export default EditTask;