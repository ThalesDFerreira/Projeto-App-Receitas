import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.png';
import searchIcon from '../images/searchIcon.png';
import SearchBar from './SearchBar';

function Header({ titlePage, hasSearch }) {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

  return (
    <div>

      <div
        className={ `grid w-screen
        grid-cols-3
       p-2
      bg-red-400` }

      >

        <button
          type="button"
          onClick={ () => history.push('/profile') }
          className="w-fit"
        >
          <img
            src={ profileIcon }
            alt="Perfil"
            data-testid="profile-top-btn"
            className="justify-self-start"
          />
        </button>
        <p
          className="m-0 page-title
          text-4xl text-white
          justify-self-center
          self-center
          w-fit
          "
          data-testid="page-title"
        >
          {titlePage}

        </p>

        { hasSearch && (
          <button
            type="button"
            onClick={ () => setShowSearchBar(!showSearchBar) }
            className="w-fit
            justify-self-end
            "
          >
            <img
              src={ searchIcon }
              alt="Busca"
              data-testid="search-top-btn"
            />
          </button>)}
      </div>
      {showSearchBar
          && <SearchBar />}
    </div>
  );
}

Header.propTypes = {
  titlePage: PropTypes.string.isRequired,
  hasSearch: PropTypes.bool.isRequired,
};

export default Header;
