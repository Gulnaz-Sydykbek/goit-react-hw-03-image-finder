import React, { Component } from 'react';
import { toast } from 'react-toastify';

class ImageForm extends Component {
  state = {
    imageName: '',
  };

  handleNameChange = e => {
    const target = e.currentTarget.value;

    this.setState({
      imageName: target.toLowerCase(),
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    if (this.state.imageName.trim() === '') {
      toast('Enter name of image, please!');
      return;
    }

    this.props.onFormSubmit(this.state.imageName.trim());

    this.setState({
      imageName: '',
    });
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="imageName"
          value={this.state.imageName}
          onChange={this.handleNameChange}
          placeholder="Enter name of image!"
        />
        <button type="submit">Find</button>
      </form>
    );
  }
}

export default ImageForm;
