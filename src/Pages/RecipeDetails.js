import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContextRecipe from '../context/ContextRecipe';
import RecomendationCard from '../components/RecomendationCard';
import ShareAndFavorite from '../components/ShareAndFavorite';

function Recipe({ match: { params: { id } }, location: { pathname } }) {
  const { fetchRecipe, dataRecipe,
    ingredientData, measureIngredientData,
    fetchRecomendation, recomendation } = useContext(ContextRecipe);
  const history = useHistory();

  useEffect(() => {
    fetchRecomendation('food');
    fetchRecipe(id, 'food');
  }, []);

  return (
    dataRecipe[0] !== undefined

      && (
        <div>
          <img
            className="w-100"
            data-testid="recipe-photo"
            src={ dataRecipe[0].strMealThumb }
            alt={ dataRecipe[0].strMeal }
          />
          <div className="d-flex justify-content-between">
            <div>

              <p data-testid="recipe-title">
                {dataRecipe[0].strMeal}
              </p>
              <p data-testid="recipe-category">
                {dataRecipe[0].strCategory}
              </p>
            </div>
            <ShareAndFavorite linkCopy={ pathname } type="food" />

          </div>
          <ul>
            {ingredientData.map((item, index) => (
              <li
                key={ item }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item} - ${measureIngredientData[index]}`}
              </li>))}
          </ul>
          <p
            data-testid="instructions"
          >
            {dataRecipe[0].strInstructions}
          </p>
          {dataRecipe[0].strYoutube !== undefined
          && <iframe
            data-testid="video"
            src={ dataRecipe[0].strYoutube.replace('watch?v=', 'embed/') }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            allowFullScreen
            title="Embedded youtube"
          />}

          {recomendation.length > 0
          && <RecomendationCard typeCard="drink" />}
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="fixed-bottom"
            onClick={ () => history.push(`/foods/${id}/in-progress`) }
          >
            Start Recipe

          </button>
        </div>)
  );
}

Recipe.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape({ id: PropTypes.string }) },
  ).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default Recipe;
