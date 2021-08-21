import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Image.module.css';
import ImageGalleryItem from './ImageGalleryItem';

class ImageGallery extends Component {
  render() {
    const { images } = this.props;
    const { ImageGallery } = s;

    return (
      <div>
        <ul className={ImageGallery}>
          {images.map(({ id, webformatURL, tags, largeImageURL }) => (
            <ImageGalleryItem
              key={id}
              webformatURL={webformatURL}
              tags={tags}
              largeImageURL={largeImageURL}
              onOpenLargeImgUrl={this.props.onOpenLargeImg}
            />
          ))}
        </ul>
      </div>
    );
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }),
  ),
};

export default ImageGallery;
