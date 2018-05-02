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
    searchValue: ''
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
        this.props.getBlockDetails(value);
      } else if (value.length === 64) {
        this.props.getTransactionDetails(value);
      } else {
        throw new Error('Incorrect search parameter');
      }
    }
  }

  render() {
    return (
      <SearchWrapper>
        <TextField
          fullWidth={true}
          floatingLabelText="Search for block by height or transaction by hash"
          floatingLabelStyle={styles.floatingLabelStyle}
          floatingLabelFocusStyle={styles.floatingLabelFocusStyle}
          onChange={this.onInputValueChange}
          onKeyUp={this.onKeyUp}
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
      getTransactionDetails: actions.transactionDetailsRequested
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(Search);