import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import BASE_URL from '../helpers';
import ContextRecipe from '../context/ContextRecipe';

const copy = require('clipboard-copy');

const TWO_SECONDS = 2000;

function ShareAndFavorite({ linkCopy, type }) {
  const { dataRecipe } = useContext(ContextRecipe);
  const [showCopy, setShowCopy] = useState(false);
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const intervalMensage = () => {
    copy(`${BASE_URL}${linkCopy}`);
    setShowCopy(true);
  };

  const verifyFav = () => {
    const verify = favoriteRecipes.some((item) => item.id
      === (type === 'food' ? dataRecipe[0].idMeal : dataRecipe[0].idDrink));
    return verify;
  };

  const handleFavoriteRecipes = () => {
    const objFavorite = {
      id: type === 'food' ? dataRecipe[0].idMeal : dataRecipe[0].idDrink,
      type: type === 'food' ? 'food' : 'drink',
      nationality: type === 'food' ? dataRecipe[0].strArea : '',
      category: dataRecipe[0].strCategory,
      alcoholicOrNot: type === 'food' ? '' : dataRecipe[0].strAlcoholic,
      name: type === 'food' ? dataRecipe[0].strMeal : dataRecipe[0].strDrink,
      image: type === 'food' ? dataRecipe[0].strMealThumb : dataRecipe[0].strDrinkThumb,
    };
    setFavoriteRecipes([...favoriteRecipes, objFavorite]);
  };

  const checkFavorite = () => {
    if (verifyFav()) {
      const newFavoriteRecipes = favoriteRecipes.filter((item) => item.id
        !== (type === 'food' ? dataRecipe[0].idMeal : dataRecipe[0].idDrink));
      setFavoriteRecipes(newFavoriteRecipes);
    } else {
      handleFavoriteRecipes();
    }
  };

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const storageFav = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(storageFav);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    setIsFavorite(verifyFav());
  }, [favoriteRecipes]);

  useEffect(() => {
    if (showCopy) {
      setTimeout(() => {
        setShowCopy(false);
      }, TWO_SECONDS);
    }
  }, [showCopy]);

  return (
    <div>
      <button
        type="button"
        data-testid="share-btn"
        onClick={ () => {
          intervalMensage();
        } }

      >
        <img src={ shareIcon } alt="Share" />
      </button>
      <button
        type="button"
        data-testid="favorite-btn"
        onClick={ checkFavorite }
        src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
      >
        <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="Favorite" />
      </button>
      {showCopy
      && <p>Link copied!</p>}
    </div>
  );
}

ShareAndFavorite.propTypes = {
  linkCopy: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default ShareAndFavorite;
