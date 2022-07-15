import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from './MyContext';

function MyProvider({ children }) {
  // const [email, setEmail] = useState('');
  // const context = {
  //   email,
  // };

  const [inputSearch, setInputSearch] = useState('');
  const [filterRecipe, setFilterRecipe] = useState('Ingredient');
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [typeFood, setTypeFood] = useState('food');
  const history = useHistory();

  const verifyUrlAPI = () => {
    if (typeFood === 'food') {
      if (filterRecipe === 'Ingredient') {
        return `https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`;
      } if (filterRecipe === 'Name') {
        return `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch}`;
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
    if (filterRecipe === 'First letter' && inputSearch.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const result = await fetch(verifyUrlAPI()).then((response) => response.json());
    if (typeFood === 'food') {
      setData(result.meals);
      setDataFiltered(result.meals);
    } else {
      setData(result.drinks);
      setDataFiltered(result.drinks);
    }
  };

  const verifyMeals = () => {
    if (dataFiltered === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (dataFiltered.length === 1) {
      history.push(`/foods/${dataFiltered[0].idMeal}`);
    }
  };

  useEffect(() => {
    verifyMeals();
  }, [dataFiltered]);

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
