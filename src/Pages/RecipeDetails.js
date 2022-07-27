import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContextRecipe from '../context/ContextRecipe';
import RecomendationCard from '../components/RecomendationCard';
import ShareAndFavorite from '../components/ShareAndFavorite';

function Recipe({ match: { params: { id } }, location: { pathname } }) {
  const { fetchRecipe, dataRecipe,
    ingredientData,
    fetchRecomendation, recomendation,
    recipesInProgress, setRecipesInProgress,
    loading,
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
    loading ? <span className="loader" />
      : dataRecipe[0] !== undefined
      && (
        <div
          className="bg-slate-100"
        >
          <img
            className="w-screen
            rounded-lg
            "
            data-testid="recipe-photo"
            src={ dataRecipe[0].strMealThumb }
            alt={ dataRecipe[0].strMeal }
          />
          <div
            className="d-flex justify-content-between
          my-3
          mx-2
          "
          >
            <div
              className="mx-3"
            >
              <p
                data-testid="recipe-title"
                className="text-3xl m-0"
              >
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
          <ul
            className="mx-4"
          >
            <p
              className="text-2xl"
            >
              Ingredients
            </p>
            {ingredientData.map((item, index) => (
              <li
                key={ item }
                data-testid={ `${index}-ingredient-name-and-measure` }
              >
                {`${item}`}
              </li>))}
          </ul>
          <div
            className="mx-3
            text-justify
            "
          >
            <p
              className="text-2xl"
            >
              Instructions
            </p>
            <p
              data-testid="instructions"
            >
              {dataRecipe[0].strInstructions}
            </p>
          </div>
          <div
            className="flex justify-center
            my-3"
          >
            {dataRecipe[0].strYoutube !== undefined
          && <iframe
            data-testid="video"
            src={ dataRecipe[0].strYoutube.replace('watch?v=', 'embed/') }
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope;"
            allowFullScreen
            title="Embedded youtube"
          />}
          </div>

          {recomendation.length > 0
          && (
            <div
              className="mx-3 my-3"
            >
              <p
                className="text-2xl"
              >
                Recomendation
              </p>
              <RecomendationCard typeCard="drink" />
            </div>)}
          {progressMeal
            ? (
              <button
                type="button"
                data-testid="start-recipe-btn"
                className="fixed-bottom
                bg-red-500
                py-2
                text-white
                text-2xl
                "
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
                className="fixed-bottom
                bg-red-400
                py-2
                text-white
                text-2xl
                "
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
