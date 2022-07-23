import React, { useContext, useEffect } from 'react';
import './Style.css';
import PropTypes from 'prop-types';
import ContextRecipe from '../context/ContextRecipe';

function ListCheck({ item, index, onChange, id }) {
  const {
    ingredientData,
  } = useContext(ContextRecipe);

  const verifyIngredientesChecked = () => {
    if (localStorage.getItem('doneIngredients')
    && JSON.parse(localStorage.getItem('doneIngredients'))[id]) {
      const doneIngredients = JSON.parse(localStorage.getItem('doneIngredients'))[id];
      const verifyNamesIngredients = doneIngredients.some(
        (el) => el === item,
      );
      return verifyNamesIngredients;
    }
    return false;
  };

  useEffect(() => {
    verifyIngredientesChecked();
  }, []);

  return (
    <li className={ `${verifyIngredientesChecked() && 'todo__item'}` }>
      <label
        htmlFor={ `${item}${index}` }
        className="d-flex align-self-baseline"
        data-testid={ `${index}-ingredient-step` }

      >
        <input
          checked={ verifyIngredientesChecked() }
          id={ `${item}${index}` }
          className="mx-2 "
          name={ item }
          type="checkbox"
          key={ item }
          onChange={ (e) => { onChange(e); } }
        />
        <p>{`${ingredientData[index]}`}</p>
      </label>
    </li>
  );
}

ListCheck.propTypes = {
  item: PropTypes.string,
}.isRequired;

export default ListCheck;
