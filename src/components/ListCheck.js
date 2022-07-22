import React, { useContext } from 'react';
import './Style.css';
import PropTypes from 'prop-types';
import ContextRecipe from '../context/ContextRecipe';

function ListCheck({ item, index, onChange, checked }) {
  const { measureIngredientData, ingredientData } = useContext(ContextRecipe);
  return (
    <li className="todo__item">
      <input
        className="todo__item"
        type="checkbox"
        key={ item }
        data-testid={ `${index + 1}-ingredient-step` }
        checked={ checked }
        onChange={ onChange }
      />
      <label htmlFor="User" className="todo__item">
        {`${ingredientData[index]} - ${measureIngredientData[index]}`}
      </label>
    </li>
  );
}

ListCheck.propTypes = {
  item: PropTypes.string,
}.isRequired;

export default ListCheck;
