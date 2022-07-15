import React, { useContext, useEffect } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import MyContext from '../context/MyContext';

function Drinks() {
  const { setTypeFood } = useContext(MyContext);

  useEffect(() => {
    setTypeFood('drink');
  }, []);

  return (
    <>
      <Header titlePage="Drinks" hasSearch />
      <Footer />
    </>
  );
}

export default Drinks;
