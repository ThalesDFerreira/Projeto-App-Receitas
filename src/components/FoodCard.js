import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import FilterCard from './Filter';

function FoodCard() {
  const { dataFiltered, typeFood } = useContext(MyContext);
  const twelve = 12;
  return (
    <>
      <FilterCard />
      <div className="d-flex flex-wrap ">
        {dataFiltered.map((item, index) => (
          index < twelve
        && (
          <div
            key={ typeFood === 'food' ? item.idMeal : item.strDrink }
            data-testid={ `${index}-recipe-card` }
            className="w-50 d-flex flex-column"
          >
            <img
              src={ typeFood === 'food' ? item.strMealThumb : item.strDrinkThumb }
              data-testid={ `${index}-card-img` }
              alt={ typeFood === 'food' ? item.strMeal : item.strDrink }
              className="w-75 align-self-center"
            />
            <p
              data-testid={ `${index}-card-name` }
              className="align-self-center"
            >
              { typeFood === 'food' ? item.strMeal : item.strDrink }

            </p>
          </div>
        )
        ))}
      </div>
    </>
  );
}

export default FoodCard;
