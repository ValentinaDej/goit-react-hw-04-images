import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    document.addEventListener('keydown', this.close);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.close);
  }

  close = ({ target, currentTarget, code }) => {
    if (target === currentTarget || code === 'Escape') {
      this.props.closeModal();
    }
  };

  render() {
    const { children, closeModal } = this.props;
    const { close } = this;
    return createPortal(
      <div className={styles.overlay} onClick={close}>
        <div className={styles.modal}>
          <span className={styles.close} onClick={closeModal}>
            x
          </span>
          {children}
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  closeModal: PropTypes.func.isRequired,
};
