import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

function Header() {
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);
  const hasSearch = true;

  return (
    <div>
      <button
        type="button"
        onClick={ () => history.push('/profile') }
      >
        <img
          src={ profileIcon }
          alt="Perfil"
          data-testid="profile-top-btn"
        />
      </button>
      <p>titlePage</p>
      {hasSearch
      && (
        <button
          type="button"
          onClick={ () => setShowSearchBar(!showSearchBar) }
        >
          <img
            src={ searchIcon }
            alt="Busca"
            data-testid="search-top-btn"
          />
        </button>)}
      {showSearchBar
          && <SearchBar />}

    </div>
  );
}

export default Header;
