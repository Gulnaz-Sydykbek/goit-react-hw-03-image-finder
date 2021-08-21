import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import fetchImages from '../services/images-api';
import Searchbar from './images/searchbar/Searchbar';
import ImageGallery from './images/imageGallery/ImageGallery';
import Loader from './images/loader/Loader';
import Error from './images/error/Error';
import Button from './images/button/Button';
import Modal from './images/modal/Modal';

class App extends Component {
  state = {
    imageName: '',
    images: [],
    status: 'idle',
    error: null,
    page: 1,
    showModal: false,
    largeImageURL: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevState.imageName;
    const nextName = this.state.imageName;

    const prevPage = prevState.page;
    const nextPage = this.state.page;

    if (prevName !== nextName) {
      this.setState({
        page: 1,
        images: [],
        error: null,
        status: 'pending',
      });

      this.imagesFetchApi();
    }

    if (prevPage !== nextPage) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  imagesFetchApi = () => {
    const { imageName, page } = this.state;

    fetchImages(imageName, page)
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

  handleFormSubmit = imageName => {
    this.setState({
      imageName,
    });
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
    const { images, error, status, largeImageURL, showModal } = this.state;

    if (status === 'idle') {
      return <Searchbar onFormSubmit={this.handleFormSubmit} />;
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
          <Searchbar onFormSubmit={this.handleFormSubmit} />
          <ImageGallery images={images} onOpenLargeImg={this.openLargeImg} />

          {images.length !== 0 && (
            <Button onLoadMoreClick={this.imagesFetchApi} />
          )}

          {showModal && (
            <Modal onToggleModal={this.toggleModal}>
              <img src={largeImageURL} alt="" />
            </Modal>
          )}

          <ToastContainer autoClose={3000} />
        </div>
      );
    }
  }
}

export default App;
