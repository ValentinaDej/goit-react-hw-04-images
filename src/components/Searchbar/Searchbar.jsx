import { Component } from 'react';

import styles from './Searchbar.module.css';

class Searchbar extends Component {
  state = {
    search: '',
  };

  handleSubmit = e => {
    e.preventDefault();
    const { onSubmit } = this.props;
    const result = onSubmit({ ...this.state });

    if (result) {
      this.reset();
    }
  };

  reset() {
    this.setState({
      search: '',
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    });
  };

  render() {
    const { search } = this.state;
    const { handleSubmit, handleChange } = this;

    return (
      <>
        <header className={styles.Searchbar}>
          <form className={styles.SearchForm} onSubmit={handleSubmit}>
            <button type="submit" className={styles.SearchFormButton}>
              <span className={styles.SearchFormButtonLabel}>Search</span>
            </button>

            <input
              name="search"
              value={search}
              onChange={handleChange}
              className={styles.SearchFormInput}
              type="text"
              autoComplete="off"
              autoFocus
              placeholder="Search images and photos"
              required
            />
          </form>
        </header>
      </>
    );
  }
}

export default Searchbar;
