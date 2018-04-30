import React, { Component } from 'react';
import styled from 'styled-components';

const BlockDetails = styled.div``;

class Block extends Component {
  render() {
    return (
      <div>
        <BlockDetails>Block details: its transactions list</BlockDetails>
        <div>pagination</div>
      </div>
    );
  }
}

export default Block;
