import React, { Component } from 'react';
import styled from 'styled-components';
import EnhancedBlocks from './EnhancedBlocks';
import UnconfirmedTransactions from './UnconfirmedTransactions';
import Search from './Search';

const BlocksHeader = styled.h2`
  font-weight: bold;
  padding-left: 20px;
`;

const TransactionHeader = styled.h2`
  font-weight: bold;
  padding-left: 20px;
`;
class Home extends Component {
  render() {
    return (
      <div>
        <Search />
        <BlocksHeader>Latest Blocks</BlocksHeader>
        <EnhancedBlocks limit={5} />
        <TransactionHeader>Latest Transactions (Unconfirmed)</TransactionHeader>
        <UnconfirmedTransactions limit={10} />
        <div>Last month Bitcoin price graph</div>
        <div>Search filter, taking as inputs block height and transaction hash</div>
      </div>
    );
  }
}

export default Home;
