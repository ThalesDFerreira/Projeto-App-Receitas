import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { inputSearch,
    fetchAPI, searchMeal, handleInputSearch } = useContext(MyContext);

  return (
    <div>

      <input
        type="text"
        data-testid="search-input"
        value={ inputSearch }
        onChange={ handleInputSearch }

      />
      <div>

        <label htmlFor="ingredient-search-radio">
          <input
            id="ingredient-search-radio"
            type="radio"
            data-testid="ingredient-search-radio"
            value="Ingredient"
            defaultChecked="checked"
            onClick={ searchMeal }
            name="filterRadio"

          />
          Ingredient

        </label>
        <label htmlFor="name-search-radio">

          <input
            id="name-search-radio"
            type="radio"
            data-testid="name-search-radio"
            value="Name"
            onClick={ searchMeal }
            name="filterRadio"

          />
          Name
        </label>
        <label htmlFor="first-letter-search-radio">
          <input
            id="first-letter-search-radio"
            type="radio"
            data-testid="first-letter-search-radio"
            value="First letter"
            onClick={ searchMeal }
            name="filterRadio"

          />
          First Letter

        </label>
      </div>
      <button
        type="button"
        data-testid="exec-search-btn"
        onClick={ fetchAPI }
      >
        Procurar
      </button>
    </div>
  );
}

export default SearchBar;
