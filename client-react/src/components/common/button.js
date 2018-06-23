import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
  margin-left: 5px;
  cursor: pointer;
  margin-top: 10px;
  width: 90px;
  height: 40px;
  font-size: 1.2em;
  border-radius: 5px;
  background: #a4c7f0;
  border: 1px solid #a4c7f0;
`;

class Button extends React.PureComponent {
  render() {
    return <StyledButton onClick={this.props.onClick}>{this.props.children}</StyledButton>;
  }
}

export default Button;
