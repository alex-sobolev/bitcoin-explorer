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

class Blocks extends Component {
  getRow = block => {
    const age = moment(block.time * 1000).fromNow();

    return (
      <TableRow key={uniqid()}>
        <TableRowColumn>{block.height}</TableRowColumn>
        <TableRowColumn>{age}</TableRowColumn>
        <TableRowColumn>{block.hash}</TableRowColumn>
        <TableRowColumn>{block.main_chain ? 'True' : 'False'}</TableRowColumn>
      </TableRow>
    )
  };

  componentDidMount() {
    this.props.getBlocks();
  }

  render() {
    return (
      <Table>
        <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
          <TableRow>
            <TableHeaderColumn tooltip={messages.height}>Height</TableHeaderColumn>
            <TableHeaderColumn tooltip={messages.age}>Age</TableHeaderColumn>
            <TableHeaderColumn tooltip={messages.hash}>Hash</TableHeaderColumn>
            <TableHeaderColumn tooltip={messages.mainChain}>Main Chain</TableHeaderColumn>
          </TableRow>
        </TableHeader>
        <TableBody stripedRows={true} displayRowCheckbox={false} showRowHover={false}>
          {this.props.blocks.map(this.getRow)}
        </TableBody>
      </Table>
    );
  }
}

const mapStateToProps = state => ({
  blocks: state.blocks
});

const matchDispatchToProps = dispatch =>
  bindActionCreators({
    getBlocks: actions.blocksRequested
  }, dispatch);

export default connect(mapStateToProps, matchDispatchToProps)(Blocks);