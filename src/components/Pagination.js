import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import FlatButton from 'material-ui/FlatButton';
import styled from 'styled-components';
import uniqid from 'uniqid';
import { cyan100 } from 'material-ui/styles/colors';
import config from '../config';

const PaginationWrapper = styled.div`
  margin-top: 30px;
  margin-bottom: 20px;
  float: right;
`;

const styles = {
  btn: {
    minWidth: '10px'
  },
  activeBtn: {
    minWidth: '10px',
    backgroundColor: cyan100
  }
};

const range = (start, end) => Array.from({ length: end - start }, (num, index) => index + start);

class Pagination extends Component {
  state = {
    activeGroup: this.getInitialGroup()
  };

  getInitialGroup() {
    const pageBtnLimit = config.constants.paginationBtnLimit;
    const pagesAmount = Math.ceil(this.props.items.length / this.props.limit);
    const notEnoughPagesForGroups = pagesAmount <= config.constants.paginationBtnLimit;

    if (notEnoughPagesForGroups) {
      return range(1, pagesAmount + 1);
    }

    return range(1, pageBtnLimit + 1);
  }

  getPagesAmount() {
    return Math.ceil(this.props.items.length / this.props.limit);
  }

  pagesAmount = Math.ceil(this.props.items.length / this.props.limit);

  getLastGroup() {
    const lastPage = this.getPagesAmount();
    const pageBtnLimit = config.constants.paginationBtnLimit;
    const startPage = lastPage - pageBtnLimit;

    return range(startPage + 1, lastPage + 1);
  }

  changePage(num) {
    const activeGroup = this.state.activeGroup;
    const activeGroupLastIndex = activeGroup.length - 1;
    const activeGroupLastPage = activeGroup[activeGroupLastIndex];
    const activeGroupFirstPage = activeGroup[0];
    const firstPage = 1;
    const lastPage = this.getPagesAmount();

    if (this.props.view === 'blocks') {
      this.props.updateCurrentBlocksPage(num);
    }

    if (this.props.view === 'blockTransactions') {
      this.props.updateBlockTransactionsPage(num);
    }

    if (num > activeGroupLastPage) {
      this.setState({
        activeGroup: [ ...activeGroup.slice(1), num ]
      });
    }

    if (num < activeGroupFirstPage) {
      this.setState({
        activeGroup: [ num, ...activeGroup.slice(0, activeGroupLastIndex) ]
      });
    }

    if (num === firstPage && !activeGroup.includes(num)) {
      this.setState({
        activeGroup: this.getInitialGroup()
      });
    }

    if (num === lastPage && !activeGroup.includes(num)) {
      this.setState({
        activeGroup: this.getLastGroup()
      });
    }
  }

  changeActiveGroup(groupNum) {
    this.setState({
      activeGroup: groupNum
    });
  }

  buildPageBtns() {
    const currentPage = this.getCurrentPage();

    return this.state.activeGroup.map(item => (
      <FlatButton
        key={uniqid()}
        label={`${item}`}
        secondary={true}
        disabled={false}
        style={item === currentPage ? styles.activeBtn : styles.btn}
        onClick={() => this.changePage(item)}
      />
    ));
  }

  getCurrentPage() {
    return this.props.view === 'blocks' ? this.props.activeBlockPage : this.props.activeBlockTransactionsPage;
  }

  render() {
    const currentPage = this.getCurrentPage();
    const pagesAmount = this.getPagesAmount();

    return (
      <PaginationWrapper>
        <FlatButton
          label="First"
          onClick={() => this.changePage(1)}
          primary={true}
          disabled={currentPage === 1 ? true : false}
        />
        <FlatButton
          label="<"
          onClick={() => this.changePage(currentPage - 1)}
          primary={true}
          disabled={currentPage === 1 ? true : false}
        />
        {this.buildPageBtns()}
        <FlatButton
          label=">"
          onClick={() => this.changePage(currentPage + 1)}
          primary={true}
          disabled={currentPage === pagesAmount ? true : false}
        />
        <FlatButton
          label="Last"
          onClick={() => this.changePage(pagesAmount)}
          primary={true}
          disabled={currentPage === pagesAmount ? true : false}
        />
      </PaginationWrapper>
    );
  }
}

const mapStateToProps = state => ({
  activeBlockPage: state.activeBlockPage,
  activeBlockTransactionsPage: state.activeBlockTransactionsPage
});

const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateCurrentBlocksPage: actions.activeBlockPageUpdated,
      updateBlockTransactionsPage: actions.activeBlockTransactionsPageUpdated
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(Pagination);
