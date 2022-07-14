import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import SearchBar from './SearchBar';

  <Header hasSearch />;

function Header() {
  const { titlePage, hasSearch } = useContext();
  const history = useHistory();
  const [showSearchBar, setShowSearchBar] = useState(false);

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
      <p>{titlePage}</p>
      {hasSearch
      && (
        <button
          type="button"
          onClick={ setShowSearchBar(!showSearchBar) }
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
