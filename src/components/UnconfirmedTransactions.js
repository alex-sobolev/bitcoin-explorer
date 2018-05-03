import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import uniqid from 'uniqid';
import config from '../config';
import { path } from 'ramda';
import moment from 'moment';
import * as actions from '../actions';

const messages = path([ 'messages', 'tooltips', 'transaction' ], config);
const TxsWrapper = styled.div``;
class UnconfirmedTransactions extends Component {
  componentDidMount() {
    this.props.getUnconfirmedTransactions(this.props.limit)
  }

  getRow = transation => {
    const age = moment(transation.time * 1000).fromNow();

    return (
      <TableRow key={uniqid()}>
        <TableRowColumn>{transation.tx_index}</TableRowColumn>
        <TableRowColumn>{age}</TableRowColumn>
        <TableRowColumn>{transation.hash}</TableRowColumn>
        <TableRowColumn>{transation.size} bytes</TableRowColumn>
      </TableRow>
    );
  };

  render() {
    return (
      <TxsWrapper>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn tooltip={messages.index}>Index</TableHeaderColumn>
              <TableHeaderColumn tooltip={messages.age}>Age</TableHeaderColumn>
              <TableHeaderColumn tooltip={messages.hash}>Hash</TableHeaderColumn>
              <TableHeaderColumn tooltip={messages.size}>Size (bytes)</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} displayRowCheckbox={false} showRowHover={false}>
            {this.props.unconfirmedTransactions.map(this.getRow)}
          </TableBody>
        </Table>
      </TxsWrapper>
    );
  }
}

const mapStateToProps = state => ({
  unconfirmedTransactions: state.unconfirmedTransactions
});

const matchDispatchToProps = dispatch =>
  bindActionCreators({ getUnconfirmedTransactions: actions.unconfirmedTransactionsRequested }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(UnconfirmedTransactions);
