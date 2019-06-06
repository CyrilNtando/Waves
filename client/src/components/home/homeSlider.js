import React from 'react';
import Slider from 'react-slick';
import Button from '../utils/Button';
const homeSlider = props => {
  const slides = [
    {
      img: '/images/featured/featured_home.jpg',
      lineOne: 'Fender',
      lineTwo: 'Custom shop',
      linkTitle: 'Shop now',
      linkTo: '/shop'
    },
    {
      img: '/images/featured/featured_home_2.jpg',
      lineOne: 'B-Stock',
      lineTwo: 'Awesome discounts',
      linkTitle: 'View offers',
      linkTo: '/shop'
    }
    // {
    //   img: '/images/featured/featured_home_3.jpg',
    //   lineOne: '',
    //   lineTwo: '',
    //   linkTitle: '',
    //   linkTo: ''
    // }
  ];

  const settings = {
    dots: false,
    inifinite: true,
    speed: 300,
    slideToshow: 1,
    slidesToScroll: 1,
    arrows: false
  };
  const generateSlides = () => {
    return slides
      ? slides.map((item, i) => (
          <div key={i}>
            <div
              className='featured_image'
              style={{
                background: `url(${item.img})`,
                height: `${window.innerHeight}px`
              }}
            >
              <div className='featured_action'>
                <div className='tag title'>{item.lineOne}</div>
                <div className='tag low_title'>{item.lineTwo}</div>
                <div>
                  <Button
                    type='default'
                    title={item.linkTitle}
                    LinkTo={item.linkTo}
                    addStyle={{ margin: '10px 0 0 0' }}
                  />
                </div>
              </div>
            </div>
          </div>
        ))
      : null;
  };

  return (
    <div className='featured_container'>
      <Slider {...settings}>{generateSlides()}</Slider>
    </div>
  );
};

export default homeSlider;
