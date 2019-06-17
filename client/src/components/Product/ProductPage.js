import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  getProductDetail,
  clearProductDetails
} from '../../store/actions/productActions';
import { addToCart } from '../../store/actions/userAction';
import PageTop from '../utils/PageTop';
import ProductInfo from './ProductInfo';
import ProdImg from './ProdImg';
class ProductPage extends Component {
  componentDidMount() {
    const id = this.props.match.params.id;
    this.props
      .getProductDetail(id)
      .then(res => {
        if (!this.props.products.prodDetail) {
          this.props.history.push('/');
        }
      })
      .catch(error => this.props.history.push('/'));
  }
  componentWillUnmount() {
    this.props.clearProductDetails();
  }

  addToCartHandler = id => {
    this.props.addToCart(id);
  };
  render() {
    return (
      <div>
        <PageTop title='Product Detail' />
        <div className='container'>
          {this.props.products.prodDetail ? (
            <div className='product_detail_wrapper'>
              <div className='left'>
                <div style={{ width: '500px' }}>
                  <ProdImg detail={this.props.products.prodDetail} />
                </div>
              </div>
              <div className='right'>
                <ProductInfo
                  addToCart={id => this.addToCartHandler(id)}
                  detail={this.props.products.prodDetail}
                />
              </div>
            </div>
          ) : null}
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
  { getProductDetail, clearProductDetails, addToCart }
)(ProductPage);
