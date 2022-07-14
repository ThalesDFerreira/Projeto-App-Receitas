import React from 'react';

function SearchBar() {
  return (
    <div>

      <input type="text" data-testid="search-input" />
      <label htmlFor="ingredient-search-radio">
        Ingredient
        <input
          id="ingredient-search-radio"
          type="radio"
          data-testid="ingredient-search-radio"
          value="Ingredient"

        />
      </label>
      <label htmlFor="name-search-radio">
        Name
        <input
          id="name-search-radio"
          type="radio"
          data-testid="name-search-radio"
          value="Name"

        />
      </label>
      <label htmlFor="first-letter-search-radio">
        First Letter
        <input
          id="first-letter-search-radio"
          type="radio"
          data-testid="first-letter-search-radio"
          value="First Letter"
        />
      </label>
      <button
        type="button"
        data-testid="exec-search-btn"
      >
        Procurar
      </button>
    </div>
  );
}

export default SearchBar;
