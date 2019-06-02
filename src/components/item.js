import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { DEVELOPER } from "../constants/main";
import { ADMIN_MODE } from "../constants/admin";
import ReactDOM from "react-dom";
import "../assets/css/item.css";

class Item extends Component {
  token = (window.localStorage.getItem('token')) ? window.localStorage.getItem('token') : '';
  blockEdit = (window.localStorage.getItem('token')) ? false : true;
  constructor(props) {
    super(props);

    console.log('props', props);
    this.onEdit = this.onEdit.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();

    const node = ReactDOM.findDOMNode(this);
    let status = (node.querySelector("input[name='status']").checked) ? 10 : 0;
    let text = node.querySelector("textarea[name='text']").value;
    var form = new FormData();
    form.append("token", this.token);
    form.append("text", text);
    form.append("status", status);
    axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/edit/${this.props.item.id}?developer=${DEVELOPER}`, form)
      .then((response) => {
        if (response.status === 200) {


        }
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onEdit() {
    const node = ReactDOM.findDOMNode(this);
    node.querySelector("textarea[name='text']").value = this.props.item.text;
    node.querySelector("input[name='status']").checked = (this.props.item.status === 0) ? false : true;
    node.querySelector(".demoForm").style.display = "block";

  }
  componentDidMount() {
    const node = ReactDOM.findDOMNode(this);

    node.querySelector(".edit-mode").style.display = (this.blockEdit) ? "none" : "inline-block";
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.admin && nextProps.admin.action === ADMIN_MODE) {
      const node = ReactDOM.findDOMNode(this);
      node.querySelector(".edit-mode").style.display = "inline-block";
    }
  }
  render() {
    return (
      <div className="item" >
        <div className="item-name"><p>{this.props.item.username}</p></div>
        <div className="item-email"><p>{this.props.item.email}</p></div>

        <div className="item-text"><p>{this.props.item.text}</p></div>
        <div className="item-status"><p>{this.props.item.status}</p></div>
        <form className="demoForm" onSubmit={this.handleSubmit} >
          <div className="form-group">
            <label htmlFor="text">Text</label>
            <textarea required className="form-control" name="text"
              placeholder="text" ></textarea>
          </div>
          <div className="form">
            <label htmlFor="status">Status</label>
            <input type="checkbox" name="status" />
          </div>
          <button type="submit" className="btn btn-primary" >Save</button>
        </form>


        <button type="button" className="btn btn-default edit-mode" onClick={this.onEdit}>Edit</button>
      </div>
    );
  }
}

let mapStateToProps = state => {
  return { admin: state.adminState };
};

let mapDispatchToProps = dispatch => {
  return {

  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);