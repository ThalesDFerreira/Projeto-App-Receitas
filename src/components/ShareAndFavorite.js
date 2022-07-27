import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import shareIcon from '../images/share.png';
import whiteHeartIcon from '../images/like.png';
import blackHeartIcon from '../images/blackHeartIcon.png';
import BASE_URL from '../helpers';
import ContextRecipe from '../context/ContextRecipe';

const copy = require('clipboard-copy');

const TWO_SECONDS = 2000;

function ShareAndFavorite({
  linkCopy, type, id,
  area, category, alcoholic, name, image, testid, favtestid }) {
  const { favoriteRecipes,
    setFavoriteRecipes, remove, setRemove } = useContext(ContextRecipe);
  const [showCopy, setShowCopy] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const intervalMensage = () => {
    copy(`${BASE_URL}${linkCopy}`);
    setShowCopy(true);
  };

  const verifyFav = () => {
    const verify = favoriteRecipes.some((item) => item.id
      === id);
    return verify;
  };

  const handleFavoriteRecipes = () => {
    const objFavorite = {
      id,
      type,
      nationality: area,
      category,
      alcoholicOrNot: alcoholic,
      name,
      image,
    };
    localStorage.setItem('favoriteRecipes',
      JSON.stringify([...favoriteRecipes, objFavorite]));
    setFavoriteRecipes([...favoriteRecipes, objFavorite]);
  };

  const checkFavorite = () => {
    if (verifyFav()) {
      const newFavoriteRecipes = favoriteRecipes.filter((item) => item.id
        !== id);
      setFavoriteRecipes(newFavoriteRecipes);
      localStorage.setItem('favoriteRecipes', JSON.stringify(newFavoriteRecipes));
      setRemove(!remove);
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
    if (verifyFav()) {
      setIsFavorite(true);
    } else {
      setIsFavorite(false);
    }
  }, [favoriteRecipes]);

  // useEffect(() => {
  //   if (favoriteRecipes.length > 0) {
  //     localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  //     setIsFavorite(verifyFav());
  //   }
  // }, [favoriteRecipes]);

  useEffect(() => {
    if (showCopy) {
      setTimeout(() => {
        setShowCopy(false);
      }, TWO_SECONDS);
    }
  }, [showCopy]);

  return (
    <div
      className="flex flex-col"
    >
      <div
        className="flex"
      >

        <button
          type="button"
          data-testid={ testid }
          src={ shareIcon }
          onClick={ () => {
            intervalMensage();
          } }
          className="w-8"

        >
          <img src={ shareIcon } alt="Share" />
        </button>
        <button
          type="button"
          data-testid={ favtestid }
          onClick={ checkFavorite }
          className="w-8 mx-3"
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
        >
          <img src={ isFavorite ? blackHeartIcon : whiteHeartIcon } alt="Favorite" />
        </button>
      </div>
      {showCopy
      && (
        <p
          className="m-0 p-0"
        >
          Link copied!

        </p>)}
    </div>
  );
}

ShareAndFavorite.propTypes = {
  linkCopy: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  area: PropTypes.string.isRequired,
  alcoholic: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  testid: PropTypes.string.isRequired,
  favtestid: PropTypes.string.isRequired,

};

export default ShareAndFavorite;
