import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ContextRecipe from './ContextRecipe';

function ProviderRecipe({ children }) {
  const TWENTY = 20;
  const [dataRecipe, setDataRecipe] = useState({});
  const [ingredientData, setIngredientData] = useState([]);
  const [measureIngredientData, setMeasureIngredientData] = useState([]);
  const [recomendation, setRecomendation] = useState({});
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [remove, setRemove] = useState(false);
  const [doneRecipesStorage, setDoneRecipesStorage] = useState([]);
  const [recipesInProgress, setRecipesInProgress] = useState([]);
  const [ingredientsContinue, setIngredientsContinue] = useState([]);

  const verifyUrlRecipe = (value, endpoint) => {
    if (endpoint === 'food') {
      return `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`;
    }
    return `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${value}`;
  };

  const fetchRecipe = async (value, type) => {
    const result = await fetch(verifyUrlRecipe(value, type))
      .then((response) => response.json());
    setDataRecipe(type === 'food' ? result.meals : result.drinks);
  };

  const handleIngredientData = () => {
    const resultIngredient = [];
    const resultMeasure = [];
    for (let index = 1; index <= TWENTY; index += 1) {
      if (dataRecipe[0][`strIngredient${index}`] !== ''
      && dataRecipe[0][`strIngredient${index}`] !== null
      && dataRecipe[0][`strIngredient${index}`] !== undefined
      ) {
        resultIngredient.push(dataRecipe[0][`strIngredient${index}`]);
        resultMeasure.push(dataRecipe[0][`strMeasure${index}`]);
      }
    }
    setIngredientData(resultIngredient);
    setMeasureIngredientData(resultMeasure);
  };

  const fetchRecomendation = async (endpoint) => {
    if (endpoint === 'food') {
      const result = await fetch('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setRecomendation(result.drinks);
    } else {
      const result = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
        .then((response) => response.json());
      setRecomendation(result.meals);
    }
  };

  // const redirectRecomendation = ({ target: name }) => {
  //   if (typeFood === 'food') {
  //     history.push(`/drinks/${name.name}`);
  //     console.log('drink');
  //   } else {
  //     history.push(`/foods/${name.name}`);
  //     console.log('food');
  //   }
  // };

  useEffect(() => {
    if (dataRecipe[0]) {
      handleIngredientData();
    }
  }, [dataRecipe]);

  const contextValue = {
    dataRecipe,
    fetchRecipe,
    ingredientData,
    measureIngredientData,
    fetchRecomendation,
    recomendation,
    favoriteRecipes,
    setFavoriteRecipes,
    setRemove,
    remove,
    doneRecipesStorage,
    setDoneRecipesStorage,
    recipesInProgress,
    setRecipesInProgress,
    ingredientsContinue,
    setIngredientsContinue,
  };
  return (
    <ContextRecipe.Provider
      value={ contextValue }
    >
      {children}
    </ContextRecipe.Provider>);
}

ProviderRecipe.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ProviderRecipe;
