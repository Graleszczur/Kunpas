import React, { Component } from "react";
import HomeFooter from "../components/HomeFooter";
import HomeAppBar from "../components/HomeAppBar"

export default class Register extends Component {
  componentDidMount(){
    localStorage.removeItem('token');
  }
  render() {
    return(
      <div>
        <HomeAppBar/>
        <div className="section white">
            <div style={{textAlign: 'center'}} className="row container">
                <p className="grey-text text-darken-3 lighten-3">
                    You have been loged out
                </p>
            </div>
        </div>
        <HomeFooter/>
    </div>
  )
  }
}
