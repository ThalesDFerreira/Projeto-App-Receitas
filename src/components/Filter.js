import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../context/MyContext';

function FilterCard() {
  const dataPressed = { Beef: false,
    Breakfast: false,
    Chicken: false,
    Dessert: false,
    Goat: false,
    'Ordinary Drink': false,
    Cocktail: false,
    Shake: false,
    'Other/Unknown': false,
    Cocoa: false,
  };
  const { categoriesFilter,
    filterFood, resetFood,
    handleButtonFilter } = useContext(MyContext);
  const five = 5;
  const [paramTrueOrFalse, setParamTrueOrFalse] = useState(true);
  const [categoriesMealToggle, setCategoriesMealToggle] = useState('');
  const [nameSelected, setNameSelected] = useState('');
  const [buttonPressed, setButtonPressed] = useState({ Beef: false,
    Breakfast: false,
    Chicken: false,
    Dessert: false,
    Goat: false,
    'Ordinary Drink': false,
    Cocktail: false,
    Shake: false,
    'Other/Unknown': false,
    Cocoa: false,
  });

  const handleCategories = ({ target: { name } }) => {
    setNameSelected(name);
    setButtonPressed({ ...dataPressed, [name]: !buttonPressed[name] });
    if (categoriesMealToggle !== '') {
      setCategoriesMealToggle({ [name]: !categoriesMealToggle[name] });
    } else {
      setCategoriesMealToggle({ [name]: paramTrueOrFalse });
      setParamTrueOrFalse(!paramTrueOrFalse);
    }
  };

  useEffect(() => {
    filterFood(categoriesMealToggle, nameSelected);
  }, [categoriesMealToggle]);

  return (
    <>
      <label htmlFor="categorieList">
        Categoria:

        {categoriesFilter.map((cat, index) => (
          index < five
    && (

      <button
        name={ cat.strCategory }
        key={ `${cat.strCategory}${index}` }
        type="button"
        value={ cat.strCategory }
        className={ buttonPressed[cat.strCategory] === true
          ? 'border border-dark' : 'border-0' }
        data-testid={ `${cat.strCategory}-category-filter` }
        onClick={ (e) => { handleCategories(e); } }
      >
        {cat.strCategory}

      </button>
    )
        ))}
      </label>
      <button
        type="button"
        data-testid="All-category-filter"
        name="filterButton"
        onClick={ (e) => { resetFood(e); handleButtonFilter(e); } }
      >
        All
      </button>
    </>
  );
}

export default FilterCard;
