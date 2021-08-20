import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Searchbar from './images/searchbar/Searchbar';
import ImageGallery from './images/imageGallery/ImageGallery';

class App extends Component {
  state = {
    imageName: '',
  };

  handleFormSubmit = imageName => {
    this.setState({
      imageName,
    });
  };

  render() {
    return (
      <div>
        <Searchbar onFormSubmit={this.handleFormSubmit} />
        <ImageGallery imageName={this.state.imageName} />

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
