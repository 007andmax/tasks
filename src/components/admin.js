import React, { Component } from "react";
import axios from 'axios'
import { connect } from "react-redux";
import ReactDOM from "react-dom";
import { DEVELOPER } from "../constants/main";
import { oninitAdminMode } from "../actions/admin";

class Admin extends Component {
    constructor(props) {
        super(props);
       
        let hide = false;
        if (window.localStorage.getItem('time')) {
            let time = Number(window.localStorage.getItem('time'));
            hide = (new Date().getTime() >= time) ? false : true;
           
        }
        this.state = {
            password: '',
            username: '',
            hide: hide
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleUserInput = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({ [name]: value });
    }
    handleSubmit(e) {
        e.preventDefault();
        var form = new FormData();
        form.append("username", this.state.username);
        form.append("password", this.state.password);
        axios.post(`https://uxcandy.com/~shapoval/test-task-backend/v2/login?developer=${DEVELOPER}`, form)
            .then((response) => {
                if (response.status === 200) {
                    window.localStorage.setItem('token', response.data.message.token);
                    window.localStorage.setItem('time', new Date().getTime() + 86400000);
                    this.setState({ hide: true });
                    this.props.oninitAdminMode();
                }
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    render() {
        return (
            <nav className="navbar navbar-default" role="navigation" >
                <div className="container-fluid">

                    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">

                        <form className="navbar-form navbar-right" role="admin-panel" style={{ display: (this.state.hide) ? 'none' : 'block' }} onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <input type="text" className="form-control" name="username" placeholder="Login"
                                    value={this.state.username}
                                    onChange={this.handleUserInput} />
                            </div>
                            <div className="form-group">
                                <input type="password" className="form-control" name="password" placeholder="Password"
                                    value={this.state.password}
                                    onChange={this.handleUserInput} />
                            </div>
                            <button type="submit" className="btn btn-default">Sign in</button>
                        </form>

                    </div>
                </div>
            </nav>
        );
    }
}

let mapStateToProps = state => {
    return {};
};

let mapDispatchToProps = dispatch => {
    return {
        oninitAdminMode: () => {
            dispatch(oninitAdminMode());
          }
    };
};
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Admin);