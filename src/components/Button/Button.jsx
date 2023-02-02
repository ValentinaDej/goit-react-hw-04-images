import PropTypes from 'prop-types';

import styles from './Button.module.css';

const Button = ({ loadMore, text }) => {
  return (
    <button onClick={loadMore} className={styles.btn}>
      {text}
    </button>
  );
};

export default Button;

Button.propTypes = {
  loadMore: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};
