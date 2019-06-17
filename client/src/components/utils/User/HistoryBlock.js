import React from 'react';
import moment from 'moment';
export default function HistoryBlock(props) {
  const renderBlocks = () => {
    return props.product
      ? props.product.map((item, i) => {
          return (
            <tr key={i}>
              <td>{moment(item.dateOfPurchase).format('MM-DD-YYYY')}</td>
              <td>
                {item.brand.name} {item.name}
              </td>
              <td>R {item.price}</td>
              <td>{item.quantity}</td>
            </tr>
          );
        })
      : null;
  };
  return (
    <div className='history_blocks'>
      <table>
        <thead>
          <tr>
            <th>Date of Purchase</th>
            <th>Product</th>
            <th>Price Paid</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>{renderBlocks()}</tbody>
      </table>
    </div>
  );
}
