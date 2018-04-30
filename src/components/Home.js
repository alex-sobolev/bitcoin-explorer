import React, { Component } from 'react';

class Home extends Component {
  render() {
    return (
      <div>
        <div>Last 10 block</div>
        <div>Last 10 transactions</div>
        <div>Last month Bitcoin price graph</div>
        <div>Search filter, taking as inputs block height and transaction hash</div>
      </div>
    );
  }
}

export default Home;
