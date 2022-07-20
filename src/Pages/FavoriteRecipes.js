import React from 'react';
import FavoriteCard from '../components/FavoriteCard';
import Header from '../components/Header';

function FavoriteRecipes() {
  return (
    <>
      <Header titlePage="Favorite Recipes" hasSearch={ false } />
      <FavoriteCard />
    </>
  );
}

export default FavoriteRecipes;
