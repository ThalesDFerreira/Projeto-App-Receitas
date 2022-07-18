import React, { useContext, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Recipes() {
  const { setTypeFood, fetchAPI } = useContext(MyContext);

  useEffect(() => {
    setTypeFood('food');
    fetchAPI();
  }, []);

  return (
    <>
      <Header titlePage="Foods" hasSearch />
      <FoodCard />
      <Footer />
    </>
  );
}

export default Recipes;
