import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
// eslint-disable-next-line sonarjs/cognitive-complexity

function FoodCard({ quantity, typeCard }) {
  const { redirectDetails, dataFiltered, loading } = useContext(MyContext);
  return (
    <div className="d-flex mb-5 flex-wrap relative;">
      {loading ? <span className="loader" />
        : dataFiltered.map((item, index) => (
          index < quantity
        && (
          <button
            type="button"
            key={ typeCard === 'food'
              ? `${item.idMeal}${index}` : `${item.strDrink}${index}` }
            data-testid={ `${index}-recipe-card` }
            className="w-50 d-flex flex-column card-image"
            name={ typeCard === 'food' ? item.idMeal : item.idDrink }
            onClick={ () => {
              redirectDetails((typeCard === 'food' ? item.idMeal : item.idDrink),
                (typeCard === 'food' ? 'food' : 'drink'));
            } }

          >
            <img
              src={ typeCard === 'food' ? item.strMealThumb : item.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ typeCard === 'food' ? item.strMeal : item.strDrink }
              className="w-75 align-self-center rounded-lg"
            />
            <p
              data-testid={ `${index}-card-name` }
              className="align-self-center"
            >
              { typeCard === 'food' ? item.strMeal : item.strDrink }

            </p>
          </button>
        )
        )) }
    </div>);
}

FoodCard.propTypes = {
  quantity: PropTypes.number.isRequired,
  typeCard: PropTypes.string.isRequired,
};

export default FoodCard;
