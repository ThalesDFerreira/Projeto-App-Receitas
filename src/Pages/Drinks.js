import React, { useContext, useEffect } from 'react';
import FoodCard from '../components/FoodCard';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';
import Filter from '../components/Filter';

function Drinks() {
  const { fetchAPI, dataFiltered } = useContext(MyContext);
  const twelve = 12;

  useEffect(() => {
    fetchAPI('drink');
  }, []);

  return (
    <>
      <Header titlePage="Drinks" hasSearch />
      <Filter />
      <FoodCard
        base={ dataFiltered }
        quantity={ twelve }
        page="principal"
        typeCard="drink"
      />
      <Footer />
    </>
  );
}

export default Drinks;
