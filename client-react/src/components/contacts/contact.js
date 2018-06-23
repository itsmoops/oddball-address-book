import React from "react";
import styled from "styled-components";
import Button from "../common/button";

const Container = styled.div`
  border: 1px solid #a5a5a5;
  padding: 5px;
`;

const P = styled.p`
  font-size: ${props => props.size || "1em"};
  color: ${props => props.color || "black"};
  -webkit-margin-before: 0.5em;
  -webkit-margin-after: 0.5em;
`;

const Input = styled.input`
  height: 20px;
  border-radius: 5px;
  padding-left: 5px;
  display: block;
  margin-bottom: 5px;
`;

const LetterIcon = styled.div`
  display: inline-block;
  margin: 10px 10px 0px 5px;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  background: ${props => props.background};
  text-transform: uppercase;
  text-align: center;
  font-size: 1.75em;
  line-height: 1.75em;
`;

const InfoContainer = styled.div`
  cursor: pointer;
  vertical-align: bottom;
  display: inline-block;
`;

const EditPane = styled.div`
  display: ${props => (props.menuOpen ? "block" : "none")};
  margin-top: 5px;
  border-top: 1px solid #a5a5a5;
  height: 280px;
  padding: 20px;
`;

const defaultState = {
  menuOpen: false,
  editMode: false
};

class Contact extends React.PureComponent {
  constructor() {
    super();

    this.state = defaultState;
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSave = this.handleSave.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }
  handleInputChange(e) {
    const field = e.target.name;
    const value = e.target.value;
    this.setState({
      [field]: value
    });
  }
  handleSave() {
    const saveData = { ...this.props.contact, ...this.state };
    delete saveData.menuOpen;
    delete saveData.editMode;
    fetch(`api/oddballs/${this.props.contact.id}`, {
      method: "PUT",
      body: JSON.stringify(saveData),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(resp => resp.json())
      .then(data => {
        this.props.contactsUpdated();
        this.setState(defaultState);
      });
  }
  handleDelete() {
    if (window.confirm("Are you sure you want to delete this contact?")) {
      fetch(`api/delete/${this.props.contact.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      })
        .then(resp => resp.json())
        .then(data => {
          this.props.contactsUpdated();
          this.setState(defaultState);
        });
    }
  }
  render() {
    const { contact } = this.props;
    const defaultContact = (
      <div>
        <P size="1.5em">
          {contact.firstName} {contact.lastName}
        </P>
        <P color="#a5a5a5" size="0.9em">
          {contact.email}
        </P>
        <P color="#a5a5a5" size="0.9em">
          {contact.street}
        </P>
        <P color="#a5a5a5" size="0.9em">
          {contact.city},
        </P>
        <P color="#a5a5a5" size="0.9em">
          {contact.state} {contact.zip}
        </P>
        <br />
        <P color="#a5a5a5" size="0.9em">
          {contact.phone}
        </P>
        <Button
          onClick={() =>
            this.setState(prevState => ({
              editMode: !prevState.editMode
            }))
          }
        >
          Edit
        </Button>
      </div>
    );

    const editContact = (
      <div>
        <Input
          size="1.5em"
          name="firstName"
          value={this.state.firstName || contact.firstName}
          onChange={this.handleInputChange}
        />
        <Input
          size="1.5em"
          name="lastName"
          value={this.state.lastName || contact.lastName}
          onChange={this.handleInputChange}
        />
        <Input size="1.5em" name="email" value={this.state.email || contact.email} onChange={this.handleInputChange} />
        <Input
          size="1.5em"
          name="street"
          value={this.state.street || contact.street}
          onChange={this.handleInputChange}
        />
        <Input size="1.5em" name="city" value={this.state.city || contact.city} onChange={this.handleInputChange} />
        <Input size="1.5em" name="state" value={this.state.state || contact.state} onChange={this.handleInputChange} />
        <Input size="1.5em" name="zip" value={this.state.zip || contact.zip} onChange={this.handleInputChange} />
        <Input size="1.5em" name="phone" value={this.state.phone || contact.phone} onChange={this.handleInputChange} />
        <Button
          onClick={() => {
            this.setState(prevState => ({
              editMode: !prevState.editMode
            }));
            this.handleSave();
          }}
        >
          Save
        </Button>
        <Button onClick={this.handleDelete}>Delete</Button>
      </div>
    );
    return (
      <Container>
        <LetterIcon background={this.props.iconColor}>{contact.firstName.charAt(0)}</LetterIcon>
        <InfoContainer
          onClick={() =>
            this.setState(prevState => ({
              menuOpen: !prevState.menuOpen
            }))
          }
        >
          <P>
            {contact.firstName} {contact.lastName}
          </P>
          <P color="#a5a5a5" size="0.9em">
            {contact.email}
          </P>
        </InfoContainer>
        <EditPane menuOpen={this.state.menuOpen}>{this.state.editMode ? editContact : defaultContact}</EditPane>
      </Container>
    );
  }
}

export default Contact;
