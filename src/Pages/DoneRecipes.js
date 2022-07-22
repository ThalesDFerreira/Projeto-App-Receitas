import React from 'react';
// import FavoriteAndDoneCard from '../components/FavoriteAndDoneCard';
import Header from '../components/Header';

// dataProps={ favoriteRecipesSaved }

function DoneRecipes() {
  return (
    <>
      <Header titlePage="Done Recipes" hasSearch={ false } />
      {/* <FavoriteAndDoneCard pageProps="done-recipes" /> */}
    </>
  );
}

export default DoneRecipes;
