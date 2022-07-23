import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import MyContext from './MyContext';

function MyProvider({ children }) {
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  });
  const [isDisabled, setIsDisabled] = useState(true);
  const [inputSearch, setInputSearch] = useState('');
  const [filterRecipe, setFilterRecipe] = useState('Ingredient');
  const [data, setData] = useState([]);
  const [dataFiltered, setDataFiltered] = useState([]);
  const [categoriesFilter, setCategoriesFilter] = useState([]);
  const [typeFood, setTypeFood] = useState('food');
  const [buttonFilter, setButtonFilter] = useState('');
  const history = useHistory();

  const enableButton = () => {
    const minCharacters = 6;
    const regex = /\S+@\S+\.\S+/;
    if (userData.password.length > minCharacters
      && regex.test(userData.email)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleButtonFilter = ({ target: { name } }) => {
    setButtonFilter(name);
  };

  useEffect(() => {
    enableButton();
  }, [userData]);

  const handleChange = ({ target: { name, value } }) => {
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email: userData.email }));
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    localStorage.setItem('inProgressRecipes', JSON.stringify({ meals: {},
      cocktails: {} }));
    localStorage.setItem('doneIngredients', JSON.stringify([]));
    localStorage.setItem('doneRecipes', JSON.stringify([]));
    history.push('/foods');
  };

  const handleDoneRecipes = () => {
    history.push('/done-recipes');
  };
  const handleFavoriteRecipes = () => {
    history.push('/favorite-recipes');
  };
  const localClear = () => {
    localStorage.clear();
    history.push('/');
  };
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

  const fetchAPISearch = async () => {
    if (filterRecipe === 'First letter' && inputSearch.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    const result = await fetch(verifyUrlAPI()).then((response) => response.json());
    if (result.meals === null || result.drinks === null) {
      return global.alert('Sorry, we haven\'t found any recipes for these filters.');
    }
    if (typeFood === 'food') {
      setData(result.meals);
      setDataFiltered(result.meals);
    } else {
      setData(result.drinks);
      setDataFiltered(result.drinks);
    }
  };

  const verifyMeals = () => {
    if (buttonFilter === 'searchButton' && dataFiltered.length === 1) {
      if (typeFood === 'food') {
        history.push(`/foods/${dataFiltered[0].idMeal}`);
      } else {
        history.push(`/drinks/${dataFiltered[0].idDrink}`);
      }
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

  const fetchAPI = async (type) => {
    if (type === 'food') {
      const resultMeal = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      const { meals } = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json());
      setData(resultMeal.meals);
      setDataFiltered(resultMeal.meals);
      setCategoriesFilter(meals);
    } else {
      const resultDrink = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      const { drinks } = await fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list')
        .then((response) => response.json());
      setData(resultDrink.drinks);
      setDataFiltered(resultDrink.drinks);
      setCategoriesFilter(drinks);
    }
  };

  const filterFood = async (base, name) => {
    if (base[name] === true) {
      if (typeFood === 'food') {
        const result = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${name}`)
          .then((response) => response.json());
        setDataFiltered(result.meals);
      } else {
        const result = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${name}`)
          .then((response) => response.json());
        setDataFiltered(result.drinks);
      }
    } else {
      setDataFiltered(data);
    }
  };

  const resetFood = () => {
    setDataFiltered(data);
  };

  const redirectDetails = (value, type) => {
    if (type === 'food') {
      history.push(`/foods/${value}`);
    } else {
      history.push(`/drinks/${value}`);
    }
  };

  const contextValue = {
    inputSearch,
    setFilterRecipe,
    setInputSearch,
    fetchAPISearch,
    dataFiltered,
    data,
    setTypeFood,
    typeFood,
    searchMeal,
    handleInputSearch,
    handleChange,
    isDisabled,
    handleSubmit,
    fetchAPI,
    categoriesFilter,
    filterFood,
    resetFood,
    handleButtonFilter,
    userData,
    handleDoneRecipes,
    handleFavoriteRecipes,
    localClear,
    redirectDetails,
  };

  return (
    <MyContext.Provider
      value={ contextValue }
    >
      {children}
    </MyContext.Provider>);
}

MyProvider.propTypes = { children: PropTypes.node.isRequired };

export default MyProvider;
