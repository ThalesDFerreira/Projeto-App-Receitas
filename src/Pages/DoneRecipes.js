import React, { useEffect, useState } from 'react';
import FavoriteAndDoneCard from '../components/FavoriteAndDoneCard';
import Header from '../components/Header';

function DoneRecipes() {
  const [doneRecipes, setDoneRecipes] = useState([]);

  const getDone = () => {
    const result = JSON.parse(localStorage.getItem('doneRecipes'));
    setDoneRecipes(result);
  };

  useEffect(() => {
    if (localStorage.getItem('doneRecipes')) {
      getDone();
    }
  }, []);

  return (
    <>
      <Header titlePage="Done Recipes" hasSearch={ false } />
      <FavoriteAndDoneCard
        dataProps={ doneRecipes }
        pageProps="done-recipes"
      />
    </>
  );
}

export default DoneRecipes;
