import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";


class Admin extends Component {
  constructor(props) {
    super(props);
   console.log('props',props);
  }
 /* email: "example@example.com"
id: 9570
status: 0
text: "Some text"
username: "Example"*/
  render() {
    return (
        <nav class="navbar navbar-default" role="navigation">
        <div class="container-fluid">
    
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
           
            <form class="navbar-form navbar-left" role="search">
              <div class="form-group">
                <input type="text" class="form-control" placeholder="Search"/>
              </div>
              <button type="submit" class="btn btn-default">Отправить</button>
            </form>
          
          </div>
        </div>
      </nav>
    );
  }
}

let mapStateToProps = state => {
  return {  };
};

let mapDispatchToProps = dispatch => {
  return {
    
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Admin);