import React from 'react';
import MyContext from './MyContext';

function MyProvider({ children }) {
  // const [email, setEmail] = useState('');
  // const context = {
  //   email,
  // };

  return (
    <MyContext.Provider
      value={ context }
    >
      {' '}
      {children}
    </MyContext.Provider>);
}

MyProvider.propTypes = { children: PropTypes.arrayOf(PropTypes.shape({})).isRequired };

export default MyProvider;
