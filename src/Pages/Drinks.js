import React, { useContext, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Drinks() {
  const { setTypeFood, fetchAPI, typeFood } = useContext(MyContext);

  useEffect(() => {
    setTypeFood('drink');
  }, []);

  useEffect(() => {
    fetchAPI();
  }, [typeFood]);

  return (
    <>
      <Header titlePage="Drinks" hasSearch />
      <FoodCard />
      <Footer />
    </>
  );
}

export default Drinks;
