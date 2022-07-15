import React, { useContext } from 'react';
import MyContext from '../context/MyContext';

function FilterCard() {
  const { categoriesFilter,
    filterFood, resetFood,
    handleButtonFilter } = useContext(MyContext);
  const five = 5;

  return (
    <>
      <label htmlFor="categorieList">
        Categoria:

        {categoriesFilter.map((cat, index) => (
          index < five
    && (

      <button
        type="button"
        value={ cat.strCategory }
        data-testid={ `${cat.strCategory}-category-filter` }
        onClick={ filterFood }

      >
        {cat.strCategory}
      </button>
    )
        ))}
      </label>
      <button
        type="button"
        data-testid="All-category-filter"
        name="filterButton"
        onClick={ (e) => { resetFood(e); handleButtonFilter(e); } }
      >
        All
      </button>
    </>
  );
}

export default FilterCard;
