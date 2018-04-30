import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import uniqid from 'uniqid';
import config from '../config';
import { path } from 'ramda';
import moment from 'moment';
import * as actions from '../actions';

const messages = path(['messages', 'tooltips', 'blockListHeader'], config);

class EnhancedBlocks extends Component {
  state = {
    blocks: []
  };

  getRow = block => {
    const size = (Number(block.size) / 1000).toFixed(1);
    const age = moment(block.time * 1000).fromNow();
    const fee = (Number(block.fee) / 100000000).toFixed(8);

    return (
      <TableRow key={uniqid()}>
        <TableRowColumn className="height">{block.height}</TableRowColumn>
        <TableRowColumn className="age">{age}</TableRowColumn>
        <TableRowColumn className="transactions">{block.n_tx}</TableRowColumn>
        <TableRowColumn className="fee">{ fee }</TableRowColumn>
        <TableRowColumn className="size">{ size }</TableRowColumn>
      </TableRow>
    )
  };

  componentDidMount() {
    this.props.getEnhancedBlocks();
  }

  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn tooltip={messages.height}>Height</TableHeaderColumn>
            <TableHeaderColumn tooltip={messages.age}>Age</TableHeaderColumn>
            <TableHeaderColumn tooltip={messages.transactions}>Transactions</TableHeaderColumn>
            <TableHeaderColumn tooltip={messages.fee}>Fee (BTC)</TableHeaderColumn>
            <TableHeaderColumn tooltip={messages.size}>Size (kB)</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody stripedRows={true} displayRowCheckbox={false} showRowHover={false}>
          {this.props.enhancedBlocks.map(this.getRow)}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  enhancedBlocks: state.enhancedBlocks
});

const matchDispatchToProps = dispatch =>
  bindActionCreators({
    getEnhancedBlocks: actions.enhancedBlocksRequested
  }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(EnhancedBlocks);
