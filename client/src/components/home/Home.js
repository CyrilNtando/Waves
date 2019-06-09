import React, { Component } from 'react';
import HomeSlider from './homeSlider';
import HomePromotion from './HomePromotion';
import { connect } from 'react-redux';
import {
  getProductBySell,
  getProductByArrival
} from '../../store/actions/productActions';
import CardBlock from '../utils/CardBlock';

class Home extends Component {
  componentDidMount() {
    this.props.getProductBySell();
    this.props.getProductByArrival();
  }
  render() {
    return (
      <div>
        <HomeSlider />
        <CardBlock
          list={this.props.products.bySell ? this.props.products.bySell : []}
          title='Best Selling Guitars'
        />
        <HomePromotion />
        <CardBlock
          list={
            this.props.products.byArrival ? this.props.products.byArrival : []
          }
          title='New Arrivals'
        />
      </div>
    );
  }
}
const mapStateTopProps = state => {
  return {
    products: state.products
  };
};
export default connect(
  mapStateTopProps,
  { getProductByArrival, getProductBySell }
)(Home);
