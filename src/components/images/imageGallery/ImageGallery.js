import React, { Component } from 'react';
import PropTypes from 'prop-types';

import s from './Image.module.css';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from '../modal/Modal';

class ImageGallery extends Component {
  state = {
    showModal: false,
    largeImageURL: null,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      showModal: !prevState.showModal,
    }));
  };

  openLargeImg = largeImageURL => {
    this.setState({
      largeImageURL,
    });

    this.toggleModal();
  };

  render() {
    const { images } = this.props;
    const { largeImageURL, showModal } = this.state;
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
              onOpenLargeImg={this.openLargeImg}
            />
          ))}
        </ul>

        {showModal && (
          <Modal onToggleModal={this.toggleModal}>
            <img src={largeImageURL} alt="" />
          </Modal>
        )}
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
