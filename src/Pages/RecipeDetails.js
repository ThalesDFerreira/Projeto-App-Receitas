import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContextRecipe from '../context/ContextRecipe';
import RecomendationCard from '../components/RecomendationCard';
import ShareAndFavorite from '../components/ShareAndFavorite';

function Recipe({ match: { params: { id } }, location: { pathname } }) {
  const { fetchRecipe, dataRecipe,
    ingredientData, measureIngredientData,
    fetchRecomendation, recomendation,
    recipesInProgress, setRecipesInProgress,
  } = useContext(ContextRecipe);

  const history = useHistory();
  const [progressMeal, setProgressMeal] = useState(false);

  useEffect(() => {
    fetchRecomendation('food');
    fetchRecipe(id, 'food');
  }, []);

  useEffect(() => {
    if (localStorage.getItem('inProgressRecipes') && dataRecipe[0] !== undefined) {
      const result = JSON.parse(localStorage.getItem('inProgressRecipes'));
      setRecipesInProgress(result);
      const continueRecipe = Object
        .keys(result.meals).includes(dataRecipe[0].idMeal);
      if (continueRecipe) {
        setProgressMeal(true);
      } else {
        setProgressMeal(false);
      }
    }
  }, [dataRecipe[0]]);

  const changeStatusRecipe = () => {
    setRecipesInProgress({ ...recipesInProgress,
      meals: { ...recipesInProgress.meals,
        [dataRecipe[0].idMeal]: dataRecipe[0],
      } });
    localStorage.setItem(
      'inProgressRecipes', JSON.stringify({ ...recipesInProgress,
        meals: { ...recipesInProgress.meals,
          [dataRecipe[0].idMeal]: dataRecipe[0],
        } }),
    );
  };

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
            <ShareAndFavorite
              linkCopy={ pathname }
              type="food"
              id={ id }
              area={ dataRecipe[0].strArea }
              category={ dataRecipe[0].strCategory }
              alcoholic=""
              name={ dataRecipe[0].strMeal }
              image={ dataRecipe[0].strMealThumb }
              testid="share-btn"
              favtestid="favorite-btn"

            />

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
          {progressMeal
            ? (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="fixed-bottom"
                onClick={ () => {
                  history.push(`/foods/${id}/in-progress`);
                } }
              >
                Continue Recipe

              </button>)
            : (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="fixed-bottom"
                onClick={ () => {
                  changeStatusRecipe();
                  history.push(`/foods/${id}/in-progress`);
                } }
              >
                Start Recipe

              </button>)}
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
