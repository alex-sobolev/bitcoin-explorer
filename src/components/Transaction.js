import React, { Component } from 'react';
import styled from 'styled-components';
import FlatButton from 'material-ui/FlatButton';
import { path } from 'ramda';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import { deepPurpleA400 } from 'material-ui/styles/colors';
import moment from 'moment';

const satoshiDecimal = 100000000;

const DefaultViewWrapper = styled.div`
  display: block;
  position: relative;
  width: 300px;
  margin: 0 auto;
`;

const TransactionHeader = styled.h2`
  padding-left: 20px;
  color: ${deepPurpleA400};
`;

const DefaultView = props => (
  <DefaultViewWrapper>
    <div>No transaction was selected.</div>
    <div>You can search for a specific transaction, using its hash</div>
    <div>
      <span>Go to</span>
      <FlatButton label="Home page" primary={true} onClick={props.goHome} />
    </div>
  </DefaultViewWrapper>
);

class Transaction extends Component {
  navigateHome = () => this.props.selectHomeTab('home');

  render() {
    if (!this.props.transaction.hash) {
      return <DefaultView goHome={this.navigateHome} />;
    }

    const transaction = this.props.transaction;
    const timeStamp = moment(transaction.time * 1000).format('YYYY-MM-DD hh:mm:ss');
    const txOut = transaction.out || [];
    const spentOut = txOut.filter(item => item.spent);
    const spentValue = spentOut.reduce((acc, item) => acc + Number(item.value), 0);
    const notSpentOut = txOut.filter(item => !item.spent);
    const valuePresent = notSpentOut.reduce((acc, item) => acc + Number(item.value), 0);
    const totalValueOut = (spentValue + valuePresent) / satoshiDecimal;
    const { inputs } = transaction;
    const totalValueInSatoshi = inputs.reduce((acc, item) => acc + (path(['prev_out', 'value'], item) || 0), 0);
    const totalValueInBTC = totalValueInSatoshi / satoshiDecimal;
    const txFee = (totalValueInBTC - totalValueOut).toFixed(8);

    return (
      <div>
        <TransactionHeader>Transaction details</TransactionHeader>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Transaction property</TableHeaderColumn>
              <TableHeaderColumn>Value</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>Hash</TableRowColumn>
              <TableRowColumn>{transaction.hash}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Transaction Index</TableRowColumn>
              <TableRowColumn>{transaction.tx_index}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>From block of height</TableRowColumn>
              <TableRowColumn>{transaction.block_height}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Total input</TableRowColumn>
              <TableRowColumn>{totalValueInBTC} BTC</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Total output</TableRowColumn>
              <TableRowColumn>{totalValueOut} BTC</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Fees</TableRowColumn>
              <TableRowColumn>{txFee} BTC</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Timestamp</TableRowColumn>
              <TableRowColumn>{timeStamp}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Size (bytes)</TableRowColumn>
              <TableRowColumn>{transaction.size}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  transaction: state.transaction
});

const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectHomeTab: actions.tabSelected
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(Transaction);
