import React from 'react';
import MyContext from './MyContext';

function MyProvider(children) {
  return (
    <MyContext.Provider
      value={ {} } // consumir valor inicial vazio., para depois fazermos de todos
    >
      {children}
    </MyContext.Provider>);
}

MyProvider.propTypes = {
  children: propTypes.node,
}.isRequired;

export default MyProvider;
