import React, { useState, useEffect, useContext } from 'react';
import PropTypes from 'prop-types';
import MyContext from '../context/MyContext';
import ShareAndFavorite from './ShareAndFavorite';

function FavoriteAndDoneCard({ dataProps, pageProps }) {
  const dataPressed = {
    All: false,
    Food: false,
    Drinks: false,
  };
  const { redirectDetails } = useContext(MyContext);
  const pathnameFood = '/foods/';
  const pathnameDrink = '/drinks/';

  const [dataBase, setDataBase] = useState(dataProps);
  const [buttonPressed, setButtonPressed] = useState({
  });

  const filterAll = () => {
    setDataBase(dataProps);
    setButtonPressed({ ...dataPressed, All: true });
  };

  const filterFoods = () => {
    const dataFoods = dataProps.filter((item) => item.type === 'food');
    setDataBase(dataFoods);
    setButtonPressed({ ...dataPressed, Food: true });
  };

  const filterDrinks = () => {
    const dataDrinks = dataProps.filter((item) => item.type === 'drink');
    setDataBase(dataDrinks);
    setButtonPressed({ ...dataPressed, Drinks: true });
  };

  const getData = () => {
    if (pageProps === 'favorite-recipes') {
      const dataStorage = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setDataBase(dataStorage);
    } else {
      const dataStorage = JSON.parse(localStorage.getItem('doneRecipes'));
      setDataBase(dataStorage);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setDataBase(dataProps);
  }, [dataProps]);

  return (
    <>
      <div
        className="flex flex-wrap m-1"
      >

        <button
          className={ `
        bg-slate-400
        px-2
        rounded-lg
        text-white
        m-1 
        ${buttonPressed.All && 'bg-slate-600'}` }
          data-testid="filter-by-all-btn"
          type="button"
          onClick={ filterAll }
        >
          All
        </button>
        <button
          data-testid="filter-by-food-btn"
          type="button"
          onClick={ filterFoods }
          className={ `
        bg-slate-400
        px-2
        rounded-lg
        text-white
        m-1 
        ${buttonPressed.Food && 'bg-slate-600'}` }
        >
          Food
        </button>
        <button
          data-testid="filter-by-drink-btn"
          type="button"
          onClick={ filterDrinks }
          className={ `
          bg-slate-400
          px-2
          rounded-lg
          text-white
          m-1 
          ${buttonPressed.Drinks && 'bg-slate-600'}` }
        >
          Drinks
        </button>
      </div>
      <div
        className="d-flex flex-wrap
        "
      >
        {dataBase.map((item, index) => (
          <div
            className="flex
            bg-slate-200
            rounded-lg
            p-1
            m-2
            "
            data-testid={ `receitas-cards-${item.id}` }
            key={ item.image }
          >
            <button
              type="button"
              key={ `${item.id}${index}` }
              data-testid={ `${index}-recipe-card` }
              className="w-50 flex
              "
              name={ item.name }
              onClick={ () => {
                redirectDetails(item.id, item.type);
              } }
            >
              <img
                src={ item.image }
                data-testid={ `${index}-horizontal-image` }
                alt={ item.name }
                className="rounded-lg"
              />
            </button>
            <div
              className="flex flex-col justify-between
              w-2/3
              ml-3
              "
            >

              <div
                className="flex
                "
              >
                <div
                  className="flex flex-col
                  mr-1
                "
                >
                  <p
                    data-testid={ `${index}-horizontal-name` }
                    className="text-xl
                  text-slate-700
                  "
                  >
                    {item.name}
                  </p>

                  <p
                    className="text-slate-700
                    mb-1
                    "
                    data-testid={ `${index}-horizontal-top-text` }
                  >
                    {item.nationality}
                    {item.alcoholicOrNot}
                    <br />
                    {item.category}
                  </p>
                </div>
              </div>
              <div
                className="flex"
              >

                <ShareAndFavorite
                  linkCopy={
                    item.type === 'food'
                      ? `${pathnameFood}${item.id}`
                      : `${pathnameDrink}${item.id}`
                  }
                  type={ item.type }
                  id={ item.id }
                  area={ item.nationality }
                  category={ item.category }
                  alcoholic={ item.alcoholicOrNot }
                  name={ item.name }
                  image={ item.image }
                  testid={ `${index}-horizontal-share-btn` }
                  favtestid={ `${index}-horizontal-favorite-btn` }
                />
                {pageProps === 'done-recipes' && (
                  <div
                    className="flex flex-col
                  my-1
                  ml-1
                  "
                  >
                    <p
                      className="m-0
                      text-sm"
                      data-testid={ `${index}-horizontal-done-date` }
                    >
                      {item.doneDate}
                    </p>
                    {item.tags.map((tag) => (
                      <p
                        key={ tag }
                        className="m-0
                      text-xs"
                        data-testid={ `${index}-${tag}-horizontal-tag` }
                      >
                        {tag}
                      </p>))}

                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

FavoriteAndDoneCard.propTypes = {
  dataProps: PropTypes.arrayOf(PropTypes.objectOf(PropTypes.string)).isRequired,
  pageProps: PropTypes.string.isRequired,
};

export default FavoriteAndDoneCard;
