import React, { Component } from "react";
import axios from 'axios'
import ReactDOM from "react-dom";
import Pagination from "react-js-pagination";
import { connect } from "react-redux";
import Item from "./item";
import AddItem from "./add-item";
import Admin from "./admin";
import { DEVELOPER,COUNT_IN_PAGE } from "../constants/main";
import { ADD_TASK } from "../constants/add-task";
import { UPDATE_TASK } from "../constants/admin";
import "../assets/css/reset.css";
import "../assets/css/bootstrap.min.css";
import "../assets/css/app.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      activePage: 15,
      totalItemsCount: 0
    };
    this.getData = this.getData.bind(this);
    this.getData(1);
  }
  getData(pageNumber) {
    axios.get(`https://uxcandy.com/~shapoval/test-task-backend/v2/?developer=${DEVELOPER}&page=${pageNumber}`)
      .then(response => {
        if (response.status === 200) this.setState({ items: response.data.message.tasks, totalItemsCount: Number(response.data.message.total_task_count), activePage: pageNumber });
        console.log('response', response);
      })
  }
  handlePageChange(pageNumber) {
    console.log(`active page is ${pageNumber}`);
    this.setState({ activePage: pageNumber });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.tasks && nextProps.tasks.action === ADD_TASK) {
      if (this.state.items.length < COUNT_IN_PAGE) {
        let items = this.state.items;
        items.push(nextProps.tasks.task);
      } else if ((this.state.activePage * COUNT_IN_PAGE) === this.state.totalItemsCount) {
        let totalItemsCount = this.state.totalItemsCount + 1;
        this.setState({totalItemsCount : totalItemsCount});
      }
    }
    if (nextProps.admin && nextProps.admin.action === UPDATE_TASK) {
      let items = this.state.items;
      let index = items.findIndex(item => item.id === nextProps.admin.id);
      items[index].status = nextProps.admin.status;
      items[index].text = nextProps.admin.text;
      this.setState({items: items});
    }

  }
  render() {
    return (
      <div className="app">
        <Admin />
      
      <div className="app-fon">

        <AddItem />
        {
          this.state.items.map((item, index) => {
            return <Item item={item} key={index} />
          })
        }
  
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={3}
          totalItemsCount={this.state.totalItemsCount}
          pageRangeDisplayed={5}
          onChange={this.getData}
        />
      </div>
      </div>
    );
  }
}
let mapStateToProps = state => {
  return { tasks: state.itemsState ,
    admin: state.adminState };
};
let mapDispatchToProps = dispatch => {
  return {
   
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);