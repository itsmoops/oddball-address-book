import React from "react";
import styled from "styled-components";
import Contact from "./contact";

const Container = styled.div`
  margin-top: 20px;
`;

class ContactList extends React.PureComponent {
  render() {
    const { contacts } = this.props;
    return (
      <Container>
        {contacts.map(contact => {
          const iconColors = ["#b8e986", "#f47923", "#4a8fe2"];
          const background = iconColors[Math.floor(Math.random() * iconColors.length)];
          return (
            <Contact
              iconColor={background}
              key={contact.id}
              contact={contact}
              contactsUpdated={this.props.contactsUpdated}
            />
          );
        })}
      </Container>
    );
  }
}

export default ContactList;
