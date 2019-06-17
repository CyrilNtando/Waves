import React from 'react';
import Button from '../utils/Button';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faTruck from '@fortawesome/fontawesome-free-solid/faTruck';
import faCheck from '@fortawesome/fontawesome-free-solid/faCheck';
import faTimes from '@fortawesome/fontawesome-free-solid/faTimes';
export default function ProductInfo(props) {
  const detail = props.detail;

  const showProdTags = detail => {
    return (
      <div className='product_tags'>
        {detail.shipping ? (
          <div className='tag'>
            <div>
              <FontAwesomeIcon icon={faTruck} />
            </div>
            <div className='tag_text'>
              <div>Free shipping</div>
              <div>And Return</div>
            </div>
          </div>
        ) : null}
        {detail.available ? (
          <div className='tag'>
            <div>
              <FontAwesomeIcon icon={faCheck} />
            </div>
            <div className='tag_text'>
              <div>Available</div>
              <div>In Store</div>
            </div>
          </div>
        ) : (
          <div className='tag'>
            <div>
              <FontAwesomeIcon icon={faTimes} />
            </div>
            <div className='tag_text'>
              <div>Not Available</div>
              <div>Pre-Order Only</div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const showProdActions = detail => {
    return (
      <div className='product_actions'>
        <div className='price'>R{detail.price}</div>
        <div className='cart'>
          <Button
            type='add_to_cart_link'
            runAction={() => {
              props.addToCart(detail._id);
            }}
          />
        </div>
      </div>
    );
  };

  const showProdSpecifications = detail => {
    return (
      <div className='product_specifications'>
        <h2>Specs:</h2>
        <div>
          <div className='item'>
            <strong>Frets:</strong>
            {detail.frets}
          </div>
          <div className='item'>
            <strong>Wood:</strong>
            {detail.wood.name}
          </div>
        </div>
      </div>
    );
  };
  return (
    <div>
      <h1>
        {detail.brand.name}
        {detail.name}
      </h1>
      <p>{detail.description}</p>
      {showProdTags(detail)}
      {showProdActions(detail)}
      {showProdSpecifications(detail)}
    </div>
  );
}
