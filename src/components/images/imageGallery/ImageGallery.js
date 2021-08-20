import React, { Component } from 'react';
import PropTypes from 'prop-types';
import s from './Image.module.css';

import fetchImages from '../../../services/images-api';
import Loader from '../loader/Loader';
import Error from '../error/Error';
import ImageGalleryItem from './ImageGalleryItem';
import Modal from '../modal/Modal';
import Button from '../button/Button';

class ImageGallery extends Component {
  state = {
    images: [],
    page: 1,
    status: 'idle',
    error: null,
    showModal: false,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.imageName !== this.props.imageName) {
      this.setState({
        page: 1,
        images: [],
        error: null,
        status: 'pending',
      });

      this.imagesFetchApi();
    }

    if (prevState.page !== this.state.page) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  imagesFetchApi = () => {
    fetchImages(this.props.imageName, this.state.page)
      .then(images => {
        this.setState(prevState => ({
          images: [...prevState.images, ...images],
          page: prevState.page + 1,
          status: 'resolved',
        }));
      })
      .catch(error =>
        this.setState({
          error,
          status: 'rejected',
        }),
      );
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
    const { images, error, status } = this.state;
    const { ImageGallery } = s;

    if (status === 'idle') {
      return <div> </div>;
    }

    if (status === 'pending') {
      return <Loader />;
    }

    if (status === 'rejected') {
      return <Error message={error.message} />;
    }

    if (status === 'resolved') {
      return (
        <div>
          <ul ref={this.ref} className={ImageGallery}>
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

          {images.length !== 0 && (
            <Button onLoadMoreClick={this.imagesFetchApi} />
          )}

          {this.state.showModal && (
            <Modal onToggleModal={this.toggleModal}>
              <img src={this.state.largeImageURL} alt="" />
            </Modal>
          )}
        </div>
      );
    }
  }
}

ImageGallery.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
  imageName: PropTypes.string.isRequired,
};

export default ImageGallery;
