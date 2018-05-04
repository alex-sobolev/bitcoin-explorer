import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table';
import uniqid from 'uniqid';
import config from '../config';
import { path } from 'ramda';
import moment from 'moment';
import * as actions from '../actions';
import styled from 'styled-components';
import Pagination from './Pagination';

const messages = path([ 'messages', 'tooltips', 'blockListHeader' ], config);

const BlocksListHeader = styled.h2`
  padding-left: 20px;
  font-weight: bold;
`;

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
    );
  };

  componentDidMount() {
    this.props.getBlocks(7);
  }

  render() {
    if (!this.props.blocks.length) {
      return null;
    }

    const blockIndex = this.props.activeBlockPage - 1;

    return (
      <div>
        <BlocksListHeader>Latest Blocks Details</BlocksListHeader>
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
            {this.props.splittedBlocks[blockIndex].map(this.getRow)}
          </TableBody>
        </Table>
        <Pagination limit={7} items={this.props.blocks} view='blocks'/>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  blocks: state.blocks,
  splittedBlocks: state.splittedBlocks,
  activeBlockPage: state.activeBlockPage
});

const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getBlocks: actions.blocksRequested
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(Blocks);
