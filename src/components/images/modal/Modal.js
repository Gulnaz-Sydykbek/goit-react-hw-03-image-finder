import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import s from '../imageGallery/Image.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onToggleModal();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onToggleModal();
    }
  };

  render() {
    const { Overlay, Modal } = s;

    return createPortal(
      <div className={Overlay} onClick={this.handleBackdropClick}>
        <div className={Modal}>{this.props.children}</div>
      </div>,
      modalRoot,
    );
  }
}

Modal.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
};

export default Modal;