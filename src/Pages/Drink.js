import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import ContextRecipe from '../context/ContextRecipe';
import RecomendationCard from '../components/RecomendationCard';
import MyContext from '../context/MyContext';

function Drink({ match: { params: { id } } }) {
  const { fetchRecipe, dataRecipe,
    ingredientData, measureIngredientData,
    fetchRecomendation, recomendation } = useContext(ContextRecipe);
  const { setTypeFood } = useContext(MyContext);

  useEffect(() => {
    setTypeFood('drink');
    fetchRecomendation('drink');
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
          <p data-testid="recipe-title">
            {dataRecipe[0].strDrink}
          </p>
          <p data-testid="recipe-category">
            {dataRecipe[0].strAlcoholic}
          </p>
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
          {recomendation.length > 0
          && <RecomendationCard typeCard="food" />}
          <button
            type="button"
            data-testid="start-recipe-btn"
            className="fixed-bottom"

          >
            Start Recipe

          </button>
        </div>)
  );
}

Drink.propTypes = {
  match: PropTypes.shape(
    { params: PropTypes.shape({ id: PropTypes.string }) },
  ).isRequired,
};

export default Drink;
