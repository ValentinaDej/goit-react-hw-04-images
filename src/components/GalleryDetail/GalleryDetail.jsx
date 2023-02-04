import PropTypes from 'prop-types';

import styles from './GalleryDetail.module.css';

const GalleryDetail = ({ largeImageURL, tags }) => {
  return <img className={styles.img} src={largeImageURL} alt={tags}></img>;
};

export default GalleryDetail;

GalleryDetail.propTypes = {
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
