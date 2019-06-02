import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { DEVELOPER } from "../constants/main";
import { ADMIN_MODE } from "../constants/admin";
import { updateTask } from "../actions/admin";
import ReactDOM from "react-dom";
import "../assets/css/item.css";

class Item extends Component {
  token = (window.localStorage.getItem('token')) ? window.localStorage.getItem('token') : '';
  blockEdit = (window.localStorage.getItem('token')) ? false : true;
  constructor(props) {
    super(props);

  
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
          this.props.updateTask(this.props.item.id, status, text);
          this.onClosedEditMode();
        }
        
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  onClosedEditMode = () => {
    const node = ReactDOM.findDOMNode(this);
    node.querySelector(".demoForm").style.display = "none";
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
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">User: {this.props.item.username}</h3>
          </div>
          <div className="panel-body">
            <p>Task: {this.props.item.text}</p>
            <p>Email: {this.props.item.email}</p>
            <p>Status: {(this.props.item.status === 0) ? "Not done" : "done"}</p>



            
            <form className="demoForm" onSubmit={this.handleSubmit} >
              <div className="panel panel-default">
                <h3>Edit task</h3>
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
              <button type="button" className="btn btn-default" onClick={this.onClosedEditMode}>Closed</button>
              </div>
            </form>
            
            <button type="button" className="btn btn-default edit-mode" onClick={this.onEdit}>Edit</button>
          </div>

        </div>


      </div>
    );
  }
}

let mapStateToProps = state => {
  return { admin: state.adminState };
};

let mapDispatchToProps = dispatch => {
  return {
    updateTask: (id, status, text) => {
      dispatch(updateTask(id, status, text));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Item);