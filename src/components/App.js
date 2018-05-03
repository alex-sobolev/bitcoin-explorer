import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { injectGlobal } from 'styled-components';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Tabs, Tab } from 'material-ui/Tabs';
import globalStyles from '../globalStyles';
import Home from './Home';
import Block from './Block';
import Blocks from './Blocks';
import Transaction from './Transaction';
import * as actions from '../actions';
import { bindActionCreators } from 'redux';

injectGlobal`
  ${globalStyles}
`;

const AppWrapper = styled.div``;

class App extends Component {
  state = {
    jack: '3d'
  };

  onTabClick = tabValue => {
    this.props.selectTab(tabValue);
  }

  render() {
    return (
      <MuiThemeProvider>
        <AppWrapper>
          <Tabs value={this.props.selectedTab}>
            <Tab value='home' label='Home' onActive={() => this.onTabClick('home')}><Home /></Tab>
            <Tab value='blocks' label='Blocks' onActive={() => this.onTabClick('blocks')}><Blocks /></Tab>
            <Tab value='block' label='Block' onActive={() => this.onTabClick('block')}><Block /></Tab>
            <Tab value='transaction' label='Transaction' onActive={() => this.onTabClick('transaction')}><Transaction /></Tab>
          </Tabs>
        </AppWrapper>
      </MuiThemeProvider>
    );
  }
}

const mapStateToProps = state => ({
  selectedTab: state.selectedTab
});

const matchDispatchToProps = dispatch =>
  bindActionCreators({
    selectTab: actions.tabSelected
  }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(App);
