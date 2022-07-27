import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function SearchBar() {
  const { inputSearch,
    fetchAPISearch,
    searchMeal,
    handleInputSearch,
    handleButtonFilter } = useContext(MyContext);

  return (
    <div
      className="absolute bg-white w-screen flex flex-col
      justify-around
      "
    >
      <div
        className="flex
        justify-around
        py-2
        "
      >

        <input
          type="text"
          data-testid="search-input"
          value={ inputSearch }
          onChange={ handleInputSearch }
          className="w-fit justify-self-start
          border-2 border-slate-300
          rounded-lg
          px-2
          focus:border-slate-400
          "
        />
        <button
          type="button"
          data-testid="exec-search-btn"
          name="searchButton"
          onClick={ (e) => { fetchAPISearch(); handleButtonFilter(e); } }
          className="w-fit
          bg-slate-400
          px-2
          rounded-lg
          text-white
          "
        >
          Procurar
        </button>
      </div>
      <div className="flex justify-around py-1">

        <label htmlFor="ingredient-search-radio">
          <input
            id="ingredient-search-radio"
            type="radio"
            data-testid="ingredient-search-radio"
            value="Ingredient"
            defaultChecked="checked"
            onClick={ searchMeal }
            name="filterRadio"
            className="m-1"
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
            className="m-1"

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
            className="m-1"

          />
          First Letter

        </label>
      </div>
    </div>
  );
}

export default SearchBar;
