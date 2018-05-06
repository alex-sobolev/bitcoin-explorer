import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../actions';
import styled from 'styled-components';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip } from 'recharts';
import moment from 'moment';

const PriceChartHeader = styled.h2`padding-left: 20px;`;

class PriceChart extends Component {
  componentDidMount() {
    this.props.getPriceChartData('30days');
  }

  render() {
    const priceData = this.props.priceChartData.values;

    if (!priceData) {
      return null;
    }

    const formattedValues = priceData.map(val => ({
      date: moment(val.x * 1000).format('MMM D'),
      usd: Number((val.y).toFixed(2))
    }));

    return (
      <div>
        <PriceChartHeader>30-day Bitcoin price chart (USD)</PriceChartHeader>
        <LineChart width={800} height={400} data={formattedValues} margin={{ top: 10, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis dataKey="usd" />
          <Tooltip />
          <Line type="monotone" dataKey='usd' stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  priceChartData: state.priceChartData
});

const matchDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getPriceChartData: actions.priceChartDataReceived
    },
    dispatch
  );

export default connect(mapStateToProps, matchDispatchToProps)(PriceChart);
