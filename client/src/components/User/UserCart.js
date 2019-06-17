import React, { Component } from 'react';
import UserLayout from '../../hoc/UserLayout';
import { connect } from 'react-redux';
import {
  getCartItems,
  removeCartItem,
  onSuccessBuy
} from '../../store/actions/userAction';
import UserProductBlock from '../utils/User/UserProductBlock';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faFrown from '@fortawesome/fontawesome-free-solid/faFrown';
import faSmile from '@fortawesome/fontawesome-free-solid/faSmile';
import PayPal from '../utils/PayPal';
class UserCart extends Component {
  state = {
    loading: true,
    total: 0,
    showTotal: false,
    showSuccess: false
  };

  async componentDidMount() {
    let cartItems = [];
    let user = this.props.user;
    if (user.cart) {
      if (user.cart.length > 0) {
        user.cart.forEach(item => {
          cartItems.push(item.id);
        });
        await this.props.getCartItems(cartItems, user.cart).then(() => {
          if (this.props.user.cartDetail.length > 0) {
            this.calculateTotal(this.props.user.cartDetail);
          }
        });
      }
    }
  }

  calculateTotal = cartDetail => {
    let total = 0;

    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    this.setState({
      total,
      showTotal: true
    });
  };
  removeFromCart = id => {
    this.props.removeCartItem(id).then(() => {
      if (this.props.user.cartDetail.length <= 0) {
        this.setState({ showTotal: false });
      } else {
        this.calculateTotal(this.props.user.cartDetail);
      }
    });
  };

  showNoItemMessage = () => {
    return (
      <div className='cart_no_items'>
        <FontAwesomeIcon icon={faFrown} />
        <div>You Have No Items</div>
      </div>
    );
  };

  transactionError = data => {
    console.log('paypal error');
  };

  transactionCanceled = data => {};

  transactionSuccess = data => {
    this.props
      .onSuccessBuy({
        cartDetail: this.props.user.cartDetail,
        paymentData: data
      })
      .then(() => {
        if (this.props.user.successBuy) {
          this.setState({
            showTotal: false,
            showSuccess: true
          });
        }
      });
  };
  render() {
    return (
      <UserLayout>
        <div>
          <h1>My Cart</h1>
          <div className='user_cart'>
            <UserProductBlock
              products={this.props.user}
              type='cart'
              removeItem={id => this.removeFromCart(id)}
            />
            {this.state.showTotal ? (
              <div>
                <div className='user_cart_sum'>
                  <div>Total Amount: R {this.state.total}</div>
                </div>
              </div>
            ) : this.state.showSuccess ? (
              <div className='cart_no_items'>
                <FontAwesomeIcon icon={faSmile} />
                <div>THANK YOU</div>
                <div>YOUR ORDER IS NOW COMPLETE</div>
              </div>
            ) : (
              this.showNoItemMessage()
            )}
          </div>
          {this.state.showTotal ? (
            <div className='paypal_button_container'>
              <PayPal
                toPay={this.state.total}
                transactionError={data => this.transactionError(data)}
                transactionCanceled={data => this.transactionCanceled(data)}
                onSuccess={data => this.transactionSuccess(data)}
              />
            </div>
          ) : null}
        </div>
      </UserLayout>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user
  };
};
export default connect(
  mapStateToProps,
  { getCartItems, removeCartItem, onSuccessBuy }
)(UserCart);
