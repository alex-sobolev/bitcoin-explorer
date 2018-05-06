import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TextField from 'material-ui/TextField';
import { orange500, blue500 } from 'material-ui/styles/colors';
import * as actions from '../actions';

const SearchWrapper = styled.div`
  padding: 0 30px;
`;

const styles = {
  floatingLabelStyle: {
    color: orange500
  },
  floatingLabelFocusStyle: {
    color: blue500
  }
};

class Search extends Component {
  state = {
    searchValue: null
  };

  onInputValueChange = event => {
    const searchValue = event.target.value;

    this.setState({
      searchValue
    });

  };

  onKeyUp = event => {
    const key = event.keyCode;

    if (key === 13) {
      const value = this.state.searchValue;

      if ((value.length === 6 && !isNaN(value)) || value.length === 64 && value.slice(0, 5) === '00000') {
        this.props.getBlockDetails(value, 15);
        this.props.changeTab('block');
      } else if (value.length === 64) {
        this.props.getTransactionDetails(value);
        this.props.changeTab('transaction');
      } else {
        throw new Error('Incorrect search parameter');
      }

      this.setState({searchValue: null});
    }
  }

  render() {
    return (
      <SearchWrapper>
        <TextField
          fullWidth={true}
          floatingLabelText="Search for block or transaction (height / hash)"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          onChange={this.onInputValueChange}
          onKeyUp={this.onKeyUp}
          value={this.state.searchValue || ''}
        />
      </SearchWrapper>
    );
  }
}

const mapStateToProps = state => ({
  unconfirmedTransactions: state.unconfirmedTransactions
});

const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBlockDetails: actions.blockDetailsRequested,
      getTransactionDetails: actions.transactionDetailsRequested,
      changeTab: actions.tabSelected
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(Search);
