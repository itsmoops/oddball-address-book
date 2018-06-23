import React, { Component } from "react";
import "./App.css";
import Search from "./components/common/search";
import ContactList from "./components/contacts/contact-list";

class App extends Component {
  constructor() {
    super();
    this.state = {
      contacts: []
    };

    this.contactSaved = this.contactSaved.bind(this);
    this.search = this.search.bind(this);
  }
  componentDidMount() {
    fetch("api/oddballs")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          contacts: data
        });
      });
  }
  contactSaved() {
    fetch("api/oddballs")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          contacts: data
        });
      });
  }
  search(searchTerm) {
    fetch(`api/search?q=${searchTerm}`)
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          contacts: data
        });
      });
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <Search search={this.search} />
          <ContactList contacts={this.state.contacts} contactSaved={this.contactSaved} />
        </div>
      </div>
    );
  }
}

export default App;
