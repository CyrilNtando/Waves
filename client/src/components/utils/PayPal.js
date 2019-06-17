import React, { Component } from 'react';
import PayPalExpressBtn from 'react-paypal-express-checkout';
class PayPal extends Component {
  render() {
    {
      const onSuccess = payment => {
        this.props.onSuccess(payment);
      };

      const onCancel = data => {
        this.props.transactionCanceled(data);
      };

      const onError = err => {
        this.props.transactionError(err);
      };

      let env = 'sandbox';
      let currency = 'USD';
      let total = this.props.toPay;

      const client = {
        sandbox:
          'AZ7r-Yx3Qv9E1v95QwcB1oUPeEXIKQxmzyVN8fFgUfADPvz1kulzuqM_eJAyRZdorj0mTxvlBg7Mi7hK',
        production: ''
      };
      return (
        <div>
          <PayPalExpressBtn
            env={env}
            client={client}
            currency={currency}
            total={total}
            onError={onError}
            onSuccess={onSuccess}
            onCancel={onCancel}
            style={{
              size: 'large',
              color: 'blue',
              shape: 'rect',
              label: 'checkout'
            }}
          />
        </div>
      );
    }
  }
}
export default PayPal;
