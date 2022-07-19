import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContextRecipe from '../context/ContextRecipe';

function RecomendationCard({ typeCard }) {
  const { recomendation } = useContext(ContextRecipe);
  const SIX = 6;

  return (

    <div className="recomendation-scroll">

      {recomendation.map((item, index) => (
        index < SIX
        && (
          <div
            className={ `mb-3 recomendation${index}` }
            key={ typeCard === 'food'
              ? `${item.strMeal}${item.idMeal}${index}`
              : `${item.idDrink}${item.strDrink}${index}` }
          >
            <img
              data-testid={ `${index}-recomendation-card` }
              src={ typeCard === 'food' ? item.strMealThumb : item.strDrinkThumb }
              name={ typeCard === 'food' ? item.idMeal : item.idDrink }
              alt={ typeCard === 'food' ? item.strMeal : item.strDrink }
              className="w-75 align-self-center"
            />
            <p
              data-testid={ `${index}-recomendation-title` }
              className="align-self-center"
            >
              { typeCard === 'food' ? item.strMeal : item.strDrink }

            </p>

          </div>
        )
      ))}
    </div>
  );
}

RecomendationCard.propTypes = {
  typeCard: PropTypes.string.isRequired,
};

export default RecomendationCard;
