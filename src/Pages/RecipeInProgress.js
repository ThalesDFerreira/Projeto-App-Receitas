import React, { useContext, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareAndFavorite from '../components/ShareAndFavorite';
import ContextRecipe from '../context/ContextRecipe';
import ListCheck from '../components/ListCheck';

function RecipesInProgress({
  match: {
    params: { id },
  },
  location: { pathname },
}) {
  const {
    dataRecipe,
    ingredientData,
    doneRecipesStorage,
    setDoneRecipesStorage,
    // recipesInProgress,
    ingredientsContinue,
    setIngredientsContinue,
    fetchRecipe,
  } = useContext(ContextRecipe);
  const history = useHistory();
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [ingredientCheckedName, setIngredientCheckedName] = useState([]);

  const onHandleCheck = ({ target: { checked, name } }) => {
    console.log(ingredientCheckedName);
    if (checked) {
      setIngredientCheckedName([...ingredientCheckedName, name]);
      localStorage.setItem('doneIngredients', JSON.stringify({
        ...ingredientsContinue,
        [id]: [...ingredientCheckedName, name],
      }));
    } else {
      const filterIngredients = ingredientCheckedName.filter((item) => (item !== name));
      localStorage.setItem('doneIngredients', JSON.stringify({
        ...ingredientsContinue,
        [id]: filterIngredients,
      }));
      setIngredientCheckedName(filterIngredients);
    }
  };

  useEffect(() => {
    fetchRecipe(id, 'food');
    if (localStorage.getItem('doneIngredients')
      && JSON.parse(localStorage.getItem('doneIngredients'))[id]) {
      const result = JSON.parse(localStorage.getItem('doneIngredients'));
      setIngredientsContinue(result);
      setIngredientCheckedName(result[id]);
    }
  }, []);

  useEffect(() => {
    if (dataRecipe[0] !== undefined) {
      if (ingredientCheckedName.length === ingredientData.length) {
        setBtnDisabled(false);
      } else {
        setBtnDisabled(true);
      }
      setIngredientsContinue({
        ...ingredientsContinue,
        [id]: ingredientCheckedName,
      });
    }
  }, [ingredientCheckedName]);

  const sendDoneToStorage = () => {
    setDoneRecipesStorage([...doneRecipesStorage, dataRecipe[0]]);
  };

  useEffect(() => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipesStorage));
  }, [doneRecipesStorage]);

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
            <p data-testid="recipe-title">{dataRecipe[0].strMeal}</p>
            <p data-testid="recipe-category">{dataRecipe[0].strCategory}</p>
          </div>
          <ShareAndFavorite
            linkCopy={ pathname.replace('/in-progress', '') }
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
          {ingredientData.map((ingredi, index) => (
            <ListCheck
              id={ id }
              key={ index }
              item={ ingredi }
              index={ index }
              onChange={ (e) => onHandleCheck(e) }
              nameRecipe={ dataRecipe[0].strMeal }
            />
          ))}
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
          onClick={ () => {
            sendDoneToStorage();
            history.push('/done-recipes');
          } }
          disabled={ btnDisabled }
        >
          Finalizar Receita
        </button>
      </div>
    )
  );
}

RecipesInProgress.propTypes = {
  match: PropTypes.shape({ params: PropTypes.shape({ id: PropTypes.string }) })
    .isRequired,
  location: PropTypes.shape({ pathname: PropTypes.string }).isRequired,
};

export default RecipesInProgress;
