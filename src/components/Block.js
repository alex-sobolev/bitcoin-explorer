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
import uniqid from 'uniqid';
import config from '../config';
import Pagination from './Pagination';

const messages = path([ 'messages', 'tooltips', 'transaction' ], config);
const satoshiDecimal = 100000000;

const BlockDetailsHeader = styled.h2`padding-left: 20px;`;

const TransactionListHeader = styled.h2`
  padding-left: 20px;
  color: ${deepPurpleA400};
`;

const DefaultBlockInfo = styled.div`
  display: block;
  position: relative;
  width: 300px;
  margin: 0 auto;
`;

const HeightNumber = styled.span`color: ${deepPurpleA400};`;

const Default = props => (
  <DefaultBlockInfo>
    <div>No block selected.</div>
    <div>You can search for a specific block, using its height or hash</div>
    <div>
      <span>Go to</span>
      <FlatButton label="Home page" primary={true} onClick={props.goHome} />
    </div>
  </DefaultBlockInfo>
);

class Block extends Component {
  navigateHome = () => this.props.selectHomeTab('home');

  getRow = transaction => {
    const timeStamp = moment(transaction.time * 1000).format('YYYY-MM-DD hh:mm:ss');

    return (
      <TableRow key={uniqid()}>
        <TableRowColumn>{transaction.hash}</TableRowColumn>
        <TableRowColumn>{transaction.tx_index}</TableRowColumn>
        <TableRowColumn>{timeStamp}</TableRowColumn>
        <TableRowColumn>{transaction.size}</TableRowColumn>
      </TableRow>
    );
  };

  render() {
    const pageIndex = this.props.activeBlockTransactionsPage - 1;

    if (!this.props.block.hash) {
      return <Default goHome={this.navigateHome} />;
    }

    const timeStamp = moment(this.props.block.time * 1000).format('YYYY-MM-DD hh:mm:ss');

    return (
      <div>
        <BlockDetailsHeader>
          Block Summary for
          <HeightNumber> {this.props.block.height}</HeightNumber>
        </BlockDetailsHeader>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn>Property</TableHeaderColumn>
              <TableHeaderColumn>Value</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} displayRowCheckbox={false}>
            <TableRow>
              <TableRowColumn>Hash</TableRowColumn>
              <TableRowColumn>{this.props.block.hash}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Height</TableRowColumn>
              <TableRowColumn>{this.props.block.height}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Number of transactions</TableRowColumn>
              <TableRowColumn>{this.props.block.n_tx}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Previous Block</TableRowColumn>
              <TableRowColumn>{this.props.block.prev_block}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Timestamp</TableRowColumn>
              <TableRowColumn>{timeStamp}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Bits</TableRowColumn>
              <TableRowColumn>{this.props.block.bits}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Main Chain</TableRowColumn>
              <TableRowColumn>{this.props.block.main_chain ? 'true' : 'false'}</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Transaction Fees</TableRowColumn>
              <TableRowColumn>{Number(this.props.block.fee) / satoshiDecimal} BTC</TableRowColumn>
            </TableRow>
            <TableRow>
              <TableRowColumn>Nonce</TableRowColumn>
              <TableRowColumn>{this.props.block.nonce}</TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>

        <TransactionListHeader>Block transactions</TransactionListHeader>
        <Table>
          <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
            <TableRow>
              <TableHeaderColumn tooltip={messages.hash}>Hash</TableHeaderColumn>
              <TableHeaderColumn tooltip={messages.index}>Index</TableHeaderColumn>
              <TableHeaderColumn tooltip={messages.creationTime}>Timestamp</TableHeaderColumn>
              <TableHeaderColumn tooltip={messages.size}>Size (bytes)</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody stripedRows={true} displayRowCheckbox={false} showRowHover={false}>
            {this.props.splittedBlockTransactions[pageIndex].map(this.getRow)}
          </TableBody>
        </Table>
        <Pagination limit={15} items={this.props.block.tx} view='blockTransactions' />
      </div>
    );
  }
}

const mapStateToProps = state => ({
  selectedTab: state.selectedTab,
  block: state.block,
  splittedBlockTransactions: state.splittedBlockTransactions,
  activeBlockTransactionsPage: state.activeBlockTransactionsPage
  
});

const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      selectHomeTab: actions.tabSelected
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(Block);
