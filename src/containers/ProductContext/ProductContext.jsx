import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [dest, setDest] = useState(['']);
    const [productSelected, setProductSelected] = useState(['']);
    return (
        <ProductContext.Provider value={{
			dest, setDest, productSelected, setProductSelected,
			}}
        >
            {children}
        </ProductContext.Provider>
    );
};

ProductProvider.propTypes = {
	children: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
