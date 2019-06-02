import React, { Component } from "react";
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import "../assets/css/item.css";

class Item extends Component {
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
      <div className="item">
  <div className="item-name"><p>{this.props.item.username}</p></div>
  <div className="item-email"><p>{this.props.item.email}</p></div>
  <div className="item-text"><p>{this.props.item.text}</p></div>
      </div>
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
)(Item);