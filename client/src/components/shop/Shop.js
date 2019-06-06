import React, { Component } from 'react';
import { connect } from 'react-redux';
import PageTop from '../utils/PageTop';
import LoadMoreCards from './LoadMoreCards';
import {
  getBrands,
  getWoods,
  getProductToShop
} from '../../store/actions/productActions';
import CollapseCheckBox from '../utils/CollapseCheckBox';
import ColllapseRadio from '../utils/CollapseRadio';
import { frets, price } from '../utils/Form/fixed_categories';

class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      brands: [],
      woods: [],
      grid: '',
      limit: 6,
      skip: 0,
      filters: {
        brand: [],
        frets: [],
        wood: [],
        price: []
      }
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (
      nextProps.products.brands !== prevState.brands ||
      nextProps.products.woods !== prevState.woods
    ) {
      return {
        woods: nextProps.products.woods,
        brands: nextProps.products.brands
      };
    }

    return null;
  }

  componentDidMount() {
    this.props.getBrands();
    this.props.getWoods();
    this.props.getProductToShop(
      this.state.skip,
      this.state.limit,
      this.state.filters
    );
  }
  handlePrice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }
    return array;
  };
  handleFilters = (filters, category) => {
    const newFilters = { ...this.state.filters };
    newFilters[category] = filters;

    if (category === 'price') {
      let priceValues = this.handlePrice(filters);
      newFilters[category] = priceValues;
    }

    this.showFilterResults(newFilters);
    this.setState({ filters: newFilters });
  };
  showFilterResults = filters => {
    console.log(filters);
    this.props.getProductToShop(0, this.state.limit, filters);
    this.setState({ skip: 0 });
  };
  render() {
    console.log(this.state.filters);
    const { brands, woods } = this.state;
    return (
      <div>
        <PageTop title='Browse Products' />
        <div className='container'>
          <div className='shop_wrapper'>
            <div className='left'>
              <CollapseCheckBox
                initState={true}
                title='Brands'
                list={brands ? brands : []}
                handleFilters={filters => this.handleFilters(filters, 'brand')}
              />
              <CollapseCheckBox
                initState={false}
                title='Frets'
                list={frets}
                handleFilters={filters => this.handleFilters(filters, 'frets')}
              />
              <CollapseCheckBox
                initState={true}
                title='Wood'
                list={woods ? woods : []}
                handleFilters={filters => this.handleFilters(filters, 'wood')}
              />
              <ColllapseRadio
                initState={true}
                title='Price'
                list={price}
                handleFilters={filters => this.handleFilters(filters, 'price')}
              />
            </div>

            <div className='right'>
              <div className='shop_options'>
                <div className='shop_grids clear'>grids</div>
              </div>
              <div className=''>
                <LoadMoreCards
                  grid={this.state.grid}
                  limit={this.state.limit}
                  size={this.props.products.toShopSize}
                  products={this.props.products.toShop}
                  loadMore={() => console.log('LoadMore')}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => ({
  products: state.products
});
export default connect(
  mapStateToProps,
  { getBrands, getWoods, getProductToShop }
)(Shop);
