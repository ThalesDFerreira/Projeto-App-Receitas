import React, { useContext, useEffect, useState } from 'react';
import ContextRecipe from '../context/ContextRecipe';
import MyContext from '../context/MyContext';
import ShareAndFavorite from './ShareAndFavorite';

function FavoriteCard() {
  const { redirectDetails } = useContext(MyContext);
  const { remove } = useContext(ContextRecipe);
  const [favoriteRecipesSaved, setFavoriteRecipesSaved] = useState([]);
  const pathnameFood = '/foods/';
  const pathnameDrink = '/drinks/';

  useEffect(() => {
    if (localStorage.getItem('favoriteRecipes')) {
      const result = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipesSaved(result);
    }
  }, []);

  useEffect(() => {
    const result = JSON.parse(localStorage.getItem('favoriteRecipes'));
    setFavoriteRecipesSaved(result);
  }, [remove]);

  return (
    <div className="d-flex flex-wrap ">
      {favoriteRecipesSaved.map((item, index) => (
        <div
          className="d-flex flex-wrap "
          key={ item.image }
        >
          <button
            type="button"
            key={ `${item.id}${index}` }
            data-testid={ `${index}-recipe-card` }
            className="w-50 d-flex flex-column"
            name={ item.name }
            onClick={ () => {
              redirectDetails(item.id, item.type);
            } }
          >
            <img
              src={ item.image }
              data-testid={ `${index}-horizontal-image` }
              alt={ item.name }
              className="w-75 align-self-center"
            />
            <p
              data-testid={ `${index}-horizontal-name` }
              className="align-self-center"
            >
              { item.name }

            </p>

            <p data-testid={ `${index}-horizontal-top-text` }>
              {item.nationality}
              {item.alcoholicOrNot}
              {' '}
              -
              {' '}
              {item.category}

            </p>
          </button>
          <ShareAndFavorite
            linkCopy={ item.type === 'food'
              ? `${pathnameFood}${item.id}` : `${pathnameDrink}${item.id}` }
            type={ item.type }
            id={ item.id }
            area={ item.nationality }
            category={ item.category }
            alcoholic={ item.alcoholicOrNot }
            name={ item.name }
            image={ item.image }
            testid={ `${index}-horizontal-share-btn` }
            favtestid={ `${index}-horizontal-favorite-btn` }

          />

        </div>

      ))}
    </div>
  );
}

export default FavoriteCard;
