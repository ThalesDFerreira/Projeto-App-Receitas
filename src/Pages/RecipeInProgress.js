import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareAndFavorite from '../components/ShareAndFavorite';
import ContextRecipe from '../context/ContextRecipe';
import ListCheck from '../components/ListCheck';

function RecipesInProgress({ match: { params: { id } }, location: { pathname } }) {
  const { dataRecipe,
    ingredientData } = useContext(ContextRecipe);
  const history = useHistory();

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

            {ingredientData.map(
              (ingredi, index) => (<ListCheck
                key={ index }
                ingredient={ ingredi }
                index={ index }
              />),
            )}
          </ul>
          <p
            data-testid="instructions"
          >
            {dataRecipe[0].strInstructions}
          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            className="fixed-bottom"
            onClick={ () => history.push('/done-recipes') }
          >
            Finalizar Receita

          </button>
        </div>
      )
  );
}

RecipesInProgress.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape({ id: PropTypes.string }) },
  ).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default RecipesInProgress;
