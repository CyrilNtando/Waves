import React, { Component } from 'react';
import Button from '../utils/Button';
import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/userAction';
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      product: {}
    };
  }

  componentDidMount() {
    this.setState({ product: this.props });
  }
  renderCardImage(images) {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return '/images/image_not_availble.png';
    }
  }
  render() {
    return !!Object.keys(this.state.product).length > 0 ? (
      <div className={`card_item_wrapper ${this.props.grid}`}>
        <div
          className='image'
          style={{
            background: `url(${this.renderCardImage(
              this.state.product.images
            )}) no-repeat`
          }}
        />
        <div className='action_container'>
          <div className='tags'>
            <div className='brand'>{this.state.product.brand.name}</div>
            <div className='name'>{this.state.product.name}</div>
            <div className='name'>{'R' + this.state.product.price}</div>
          </div>
          {this.props.grid ? (
            <div className='description'>
              <p>{this.state.product.description}</p>
            </div>
          ) : null}
          <div className='actions'>
            <div className='button_wrapp'>
              <Button
                type='default'
                altClass='card_link'
                title='view product'
                LinkTo={`/product_detail/${this.state.product._id}`}
                addStyles={{
                  margin: '10px 0 0 0'
                }}
              />
            </div>
            <div className='button_wrapp'>
              <Button
                type='bag_link'
                runAction={() => {
                  this.props.user.isAuthenticated
                    ? this.props.addToCart(this.state.product._id)
                    : console.log('need to log in');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(
  mapStateToProps,
  { addToCart }
)(Card);
