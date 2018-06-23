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

    this.contactsUpdated = this.contactsUpdated.bind(this);
    this.search = this.search.bind(this);
    this.fetchMore = this.fetchMore.bind(this);
  }
  componentDidMount() {
    fetch("api/oddballs")
      .then(resp => resp.json())
      .then(data => {
        this.setState({
          contacts: data
        });
      });

    this.fetchMore = this.fetchMore.bind(this);

    window.onscroll = () => {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
        // handle infinite scroll
        this.fetchMore();
      }
    };
  }
  contactsUpdated() {
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
  fetchMore() {
    fetch(`api/oddballs?offset=${this.state.contacts.length + 1}`)
      .then(resp => resp.json())
      .then(data => {
        this.setState(prevState => ({
          contacts: [...prevState.contacts, ...data]
        }));
      });
  }
  render() {
    return (
      <div className="App">
        <div className="container">
          <Search search={this.search} />
          <ContactList contacts={this.state.contacts} contactsUpdated={this.contactsUpdated} />
        </div>
      </div>
    );
  }
}

export default App;
