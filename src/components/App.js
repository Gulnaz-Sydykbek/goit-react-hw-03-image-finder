import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ImageForm from './images/ImageForm';
import ImageInfo from './images/ImageInfo';

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
        <ImageForm onFormSubmit={this.handleFormSubmit} />
        <ImageInfo imageName={this.state.imageName} />

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
