import React, { Component } from 'react';
import Button from '../utils/Button';

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
      <div className={`card_item_wrapper ${this.state.product.grid}`}>
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
          {this.state.product.grid ? (
            <div className='description'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. In
              quibusdam quas dolorem consectetur aliquam error minima, libero
              dolore placeat cumque vitae ex architecto
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
                  console.log('add to cart');
                }}
              />
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}
export default Card;
