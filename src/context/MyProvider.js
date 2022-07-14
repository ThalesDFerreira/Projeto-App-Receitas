import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MyContext from './MyContext';

function MyProvider({ children }) {
  // const [email, setEmail] = useState('');
  // const context = {
  //   email,
  // };

  const [inputSearch, setInputSearch] = useState('');
  const [filterRecipe, setFilterRecipe] = useState('Ingredient');
  const [data, setData] = useState({ food: [{}],
    drink: [{}] });
  const [dataFiltered, setDataFiltered] = useState({ food: [{}],
    drink: [{}] });
  const [typeFood, setTypeFood] = useState('food');

  const verifyUrlAPI = () => {
    if (typeFood === 'food') {
      if (filterRecipe === 'Ingredient') {
        return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      } if (filterRecipe === 'Name') {
        return `www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
      }
      return `https://www.themealdb.com/api/json/v1/1/search.php?f=${inputSearch}`;
    }
    if (filterRecipe === 'Ingredient') {
      return `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
    } if (filterRecipe === 'Name') {
      return `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputSearch}`;
    }
    return `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${inputSearch}`;
  };

  const fetchAPI = async () => {
    console.log(verifyUrlAPI());
    if (filterRecipe === 'First letter' && inputSearch.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const result = await fetch(verifyUrlAPI()).then((response) => response.json());
    setData(result.meals);
    setDataFiltered(result.meals);
    console.log(result);
  };

  const searchMeal = ({ target: { value } }) => {
    setFilterRecipe(value);
  };

  const handleInputSearch = ({ target: { value } }) => {
    setInputSearch(value);
  };

  const contextValue = {
    inputSearch,
    setFilterRecipe,
    setInputSearch,
    fetchAPI,
    dataFiltered,
    data,
    setTypeFood,
    typeFood,
    searchMeal,
    handleInputSearch,
  };

  return (
    <MyContext.Provider
      value={ contextValue }
    >
      {' '}
      {children}
    </MyContext.Provider>);
}

MyProvider.propTypes = { children: PropTypes.node.isRequired };

export default MyProvider;
