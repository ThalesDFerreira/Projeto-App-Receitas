import React, { useContext, useEffect, useState } from 'react';
import FavoriteAndDoneCard from '../components/FavoriteAndDoneCard';
import ContextRecipe from '../context/ContextRecipe';
import Header from '../components/Header';

function FavoriteRecipes() {
  const [favoriteRecipesSaved, setFavoriteRecipesSaved] = useState([]);
  const { remove } = useContext(ContextRecipe);

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const result = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipesSaved(result);
    } else {
      return [];
    }
  }, [remove]);

  return (
    <>
      <Header titlePage="Favorite Recipes" hasSearch={ false } />
      <FavoriteAndDoneCard
        dataProps={ favoriteRecipesSaved }
        pageProps="favorite-recipes"
      />
    </>
  );
}

export default FavoriteRecipes;
