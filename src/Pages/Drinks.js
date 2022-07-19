import React, { useContext, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Filter from '../components/Filter';

function Drinks() {
  const { fetchAPI, setTypeFood } = useContext(MyContext);
  const twelve = 12;

  useEffect(() => {
    setTypeFood('drink');
    fetchAPI('drink');
  }, []);

  return (
    <>
      <Header titlePage="Drinks" hasSearch />
      <Filter />
      <FoodCard
        quantity={ twelve }
        typeCard="drink"
      />
      <Footer />
    </>
  );
}

export default Drinks;
