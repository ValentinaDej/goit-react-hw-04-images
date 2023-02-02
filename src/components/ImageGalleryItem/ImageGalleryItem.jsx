import PropTypes from 'prop-types';

import styles from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  webformatURL,
  showModalForm,
  largeImageURL,
  tags,
}) => {
  return (
    <li
      className={styles.ImageGalleryItem}
      onClick={() => showModalForm({ largeImageURL, tags })}
    >
      <img
        src={webformatURL}
        alt={tags}
        className={styles.ImageGalleryIteImage}
      />
    </li>
  );
};

export default ImageGalleryItem;

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  showModalForm: PropTypes.func.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  tags: PropTypes.string.isRequired,
};
