import React, { Component } from 'react';
import styled, { injectGlobal } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import globalStyles from '../globalStyles';
import Home from './Home';
import Block from './Block';
import Blocks from './Blocks';
import Transaction from './Transaction';

injectGlobal`
  ${globalStyles}
`;

const AppWrapper = styled.div``;

class App extends Component {
  state = {
    jack: '3d'
  };

  render() {
    return (
      <MuiThemeProvider>
        <AppWrapper>
          <Tabs>
            <Tab label="Home"><Home /></Tab>
            <Tab label="Blocks"><Blocks /></Tab>
            <Tab label="Block"><Block /></Tab>
            <Tab label="Transaction"><Transaction /></Tab>
          </Tabs>
        </AppWrapper>
      </MuiThemeProvider>
    );
  }
}

export default App;
