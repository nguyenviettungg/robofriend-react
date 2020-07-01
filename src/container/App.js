import React, { Fragment, Component } from "react";
import CardList from "../components/CardList";
import SearchBox from "../components/SearchBox";
import Scroll from "../components/Scroll";
import ErrorBoundry from "../components/ErrorBoundry";
// import { robots } from './robots';
import "./App.css";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchfield: "",
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => {
        return response.json();
      })
      .then((user) => {
        this.setState({ robots: user });
      });
  }

  onSearchChange = (event) => {
    this.setState({ searchfield: event.target.value });
  };
  render() {
    const { robots, searchfield } = this.state;
    const filteredRobots = robots.filter((robot) => {
      return robot.name.toLowerCase().includes(searchfield.toLowerCase());
    });
    return (!robots.length) ? (<h1>Loading</h1>): 
    (
        <Fragment>
          <div className="tc">
            <h1 className="f2">RoboFriends</h1>
            <SearchBox searchChange={this.onSearchChange} />
            <Scroll>
              <ErrorBoundry>
              <CardList robots={filteredRobots} />
              </ErrorBoundry>
            </Scroll>
          </div>
        </Fragment>
      );
     
    
      
    }
  
}

export default App;
