import React, { Component } from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { FormErrors } from './FormErrors';
import { DEVELOPER } from "../constants/main";
import { STATE_ADD_TASK } from "../constants/add-task";
import { AddTask } from "../actions/add-task";
import "../assets/css/add-item.css";

class AddItem extends Component {
  constructor(props) {
    super(props);
    this.state = STATE_ADD_TASK;
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleSubmit(e) {
    e.preventDefault();
    var form = new FormData();
    form.append("username", this.state.username);
    form.append("email", this.state.email);
    form.append("text", this.state.text);
    axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/create?developer=${DEVELOPER}`, form)
      .then((response) => {
        if (response.status === 200) {
          this.setState(STATE_ADD_TASK);
          this.props.AddTask(response.data.message);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value },
      () => { this.validateField(name, value) });
  }

  validateField(fieldName, value) {
    let fieldValidationErrors = this.state.formErrors;
    let emailValid = this.state.emailValid;
    let usernameValid = this.state.username;
    let textValid = this.state.text;

    switch (fieldName) {
      case 'email':
        emailValid = value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
        fieldValidationErrors.email = emailValid ? '' : ' is invalid';
        break;
      case 'username':
        usernameValid = value.length > 1;
        fieldValidationErrors.username = usernameValid ? '' : ' is too short';
        break;
      case 'text':
        textValid = value.length > 1;
        fieldValidationErrors.text = textValid ? '' : ' is too short';
        break;
      default:
        break;
    }
    this.setState({
      formErrors: fieldValidationErrors,
      emailValid: emailValid,
      usernameValid: usernameValid,
      textValid: textValid
    }, this.validateForm);
  }

  validateForm() {
    this.setState({ formValid: this.state.emailValid && this.state.usernameValid && this.state.textValid });
  }

  errorClass(error) {
    return (error.length === 0 ? '' : 'has-error');
  }
  render() {
    return (
      <form className="demoForm" onSubmit={this.handleSubmit}>
        <h2>Add task</h2>
        <div className="panel panel-default">
          <FormErrors formErrors={this.state.formErrors} />
        </div>
        <div className={`form-group ${this.errorClass(this.state.formErrors.email)}`}>
          <label htmlFor="email">Email address</label>
          <input type="email" required className="form-control" name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleUserInput} />
        </div>
        <div className="form-group">
          <label htmlFor="username">User name</label>
          <input type="text" required className="form-control" name="username"
            placeholder="User name"
            value={this.state.username}
            onChange={this.handleUserInput} />
        </div>
        <div className="form-group">
          <label htmlFor="text">Message</label>
          <input type="text" required className="form-control" name="text"
            placeholder="Message"
            value={this.state.text}
            onChange={this.handleUserInput} />
        </div>

        <button type="submit" className="btn btn-primary" disabled={!this.state.formValid} >Sign up</button>
      </form>
    );
  }
}

let mapStateToProps = state => {
  return {};
};

let mapDispatchToProps = dispatch => {
  return {
    AddTask: (task) => {
      dispatch(AddTask(task));
    }
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddItem);