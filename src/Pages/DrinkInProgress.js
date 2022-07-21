import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ContextRecipe from '../context/ContextRecipe';
import MyContext from '../context/MyContext';
import ShareAndFavorite from '../components/ShareAndFavorite';
import ListCheck from '../components/ListCheck';

function DrinkInProgress({ match: { params: { id } }, location: { pathname } }) {
  const { fetchRecipe, dataRecipe,
    ingredientData,
  } = useContext(ContextRecipe);
  const { setTypeFood } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    setTypeFood('drink');
    fetchRecipe(id, 'drink');
  }, []);

  return (
    (dataRecipe !== null && dataRecipe[0] !== undefined)

      && (
        <div>
          <img
            className="w-100"
            data-testid="recipe-photo"
            src={ dataRecipe[0].strDrinkThumb }
            alt={ dataRecipe[0].strDrink }
          />
          <div className="d-flex justify-content-between">
            <div>

              <p data-testid="recipe-title">
                {dataRecipe[0].strDrink}
              </p>
              <p data-testid="recipe-category">
                {dataRecipe[0].strAlcoholic}
              </p>
            </div>
            <ShareAndFavorite
              linkCopy={ pathname }
              type="drink"
              id={ id }
              area=""
              category={ dataRecipe[0].strCategory }
              alcoholic={ dataRecipe[0].strAlcoholic }
              name={ dataRecipe[0].strDrink }
              image={ dataRecipe[0].strDrinkThumb }
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
            data-testid="start-recipe-btn"
            className="fixed-bottom w-100"
            onClick={ () => history.push('/done-recipes') }

          >
            Finalizar Drink

          </button>
        </div>)
  );
}

DrinkInProgress.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape({ id: PropTypes.string }) },
  ).isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default DrinkInProgress;
