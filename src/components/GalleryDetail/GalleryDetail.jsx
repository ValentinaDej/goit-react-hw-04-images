import PropTypes from 'prop-types';

import styles from './GalleryDetail.module.css';

const GalleryDetail = ({ galleryDetail }) => {
  const { largeImageURL, tags } = galleryDetail;
  return <img className={styles.img} src={largeImageURL} alt={tags}></img>;
};

export default GalleryDetail;

GalleryDetail.propTypes = {
  galleryDetail: PropTypes.object.isRequired,
};
