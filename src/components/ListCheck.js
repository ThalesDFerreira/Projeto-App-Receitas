import React, { useContext, useState } from 'react';
import './Style.css';
import PropTypes from 'prop-types';
import ContextRecipe from '../context/ContextRecipe';

function ListCheck({ item, index, onChange }) {
  const {
    measureIngredientData,
    ingredientData,
  } = useContext(ContextRecipe);
  const [traceLine, setTraceLine] = useState('');

  const changeTraceLine = ({ target: { checked } }) => {
    if (checked) {
      setTraceLine('todo__item');
    } else {
      setTraceLine('');
    }
    console.log(checked);
  };

  // const verifyIngredientesChecked = () => {
  //   if (ingredientsContinue[nameRecipe]) {
  //     const verifyNamesIngredients = ingredientsContinue[nameRecipe].some(
  //       (el) => el === item,
  //     );
  //     return verifyNamesIngredients;
  //   }
  // };

  // useEffect(() => {
  //   verifyIngredientesChecked();
  // }, [ingredientsContinue]);

  return (
    <li className={ `${traceLine}` }>
      <label
        htmlFor={ `${item}${index}` }
        className="d-flex align-self-baseline"
        data-testid={ `${index}-ingredient-step` }

      >
        <input
          // checked={ verifyIngredientesChecked }
          id={ `${item}${index}` }
          className="mx-2"
          name={ item }
          type="checkbox"
          key={ item }
          onChange={ (e) => { onChange(e); changeTraceLine(e); } }
        />
        <p>{`${ingredientData[index]} - ${measureIngredientData[index]}`}</p>
      </label>
    </li>
  );
}

ListCheck.propTypes = {
  item: PropTypes.string,
}.isRequired;

export default ListCheck;
