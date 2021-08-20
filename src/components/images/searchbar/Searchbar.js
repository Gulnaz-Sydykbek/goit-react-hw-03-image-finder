import React, { Component } from 'react';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';
import s from '../imageGallery/Image.module.css';

class Searchbar extends Component {
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

    const { imageName } = this.state;

    if (imageName.trim() === '') {
      toast('Enter name of image, please!');
      return;
    }

    this.props.onFormSubmit(imageName.trim());

    this.setState({
      imageName: '',
    });
  };

  render() {
    const { imageName } = this.state;
    const {
      Searchbar,
      SearchForm,
      SearchFormButton,
      SearchFormButtonLabel,
      SearchFormInput,
    } = s;

    return (
      <header className={Searchbar}>
        <form className={SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={SearchFormButton}>
            <span className={SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={SearchFormInput}
            type="text"
            name="imageName"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={imageName}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
