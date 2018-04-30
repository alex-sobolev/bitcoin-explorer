import React, { Component } from 'react';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import uniqid from 'uniqid';
import config from '../config';
import api from '../services/api';
import { path } from 'ramda';
import moment from 'moment';

const messages = path(['messages', 'tooltips', 'blockListHeader'], config);

class Blocks extends Component {
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

  async componentDidMount() {
    const blocksHashes = await api.getTodaysBlocksHashes(this.props.limit);
    const blocks = await api.getTodaysBlocksDetails(blocksHashes);
    const stats = await api.get24HourBitcoinStats();

    this.setState({
      blocks,
      stats
    });
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
        <TableBody stripedRows={false} displayRowCheckbox={false} showRowHover={false}>
          {this.state.blocks.map(this.getRow)}
        </TableBody>
      </Table>
    );
  }
}

export default Blocks;
