import React, { Component } from 'react';
import ImageLightBox from '../utils/LightBox';
class ProdImg extends Component {
  state = {
    lightbox: false,
    imgPos: 0,
    lightboxImages: []
  };

  componentDidMount() {
    if (this.props.detail.images.length > 0) {
      let lightboxImages = [];

      this.props.detail.images.forEach(item => {
        lightboxImages.push(item.url);
      });

      this.setState({ lightboxImages });
    }
  }

  handleLightBox = pos => {
    if (this.state.lightboxImages.length > 0) {
      this.setState({
        lightbox: true,
        imgPos: pos
      });
    }
  };

  handleLightBoxClose = () => {
    this.setState({
      lightbox: false
    });
  };
  showThumbs = () => {
    return this.state.lightboxImages.map((item, i) =>
      i > 0 ? (
        <div
          key={i}
          onClick={() => this.handleLightBox(i)}
          className='thumb'
          style={{ background: `url(${item}) no-repeat` }}
        />
      ) : null
    );
  };
  renderCardImage = images => {
    if (images.length > 0) {
      return images[0].url;
    }
    return `/images/image_not_availble.png`;
  };
  render() {
    const { detail } = this.props;
    return (
      <div className='product_image_container'>
        <div className='main_pic'>
          <div
            style={{
              background: `url(${this.renderCardImage(
                detail.images
              )}) no-repeat`
            }}
            onClick={() => this.handleLightBox(0)}
          />
        </div>
        <div className='main_thumbs'>{this.showThumbs(detail)}</div>
        {this.state.lightbox ? (
          <ImageLightBox
            id={detail.id}
            images={this.state.lightboxImages}
            open={this.state.lightbox}
            pos={this.state.imgPos}
            onClose={() => this.handleLightBoxClose()}
          />
        ) : null}
      </div>
    );
  }
}

export default ProdImg;
