import React, { Component } from 'react';
import Lightbox from 'react-images';
class ImageLightBox extends Component {
  state = {
    lightboxIsOpen: true,
    currentImage: this.props.pos,
    images: []
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.images) {
      const images = [];
      nextProps.images.forEach(element => {
        images.push({ src: `${element}` });
      });

      return (prevState = {
        images
      });
    } else return null;
  }
  closeLightbox = () => {
    this.props.onClose();
  };
  gotoPrevious = () => {
    this.setState({
      currentImage: this.state.currentImage - 1
    });
  };

  gotoNext = () => {
    this.setState({
      currentImage: this.state.currentImage + 1
    });
  };
  render() {
    return (
      <Lightbox
        currentImage={this.state.currentImage}
        images={this.state.images}
        isOpen={this.state.lightboxIsOpen}
        onClickPrev={() => this.gotoPrevious()}
        onClickNext={() => this.gotoNext()}
        onClose={() => this.closeLightbox()}
      />
    );
  }
}

export default ImageLightBox;
