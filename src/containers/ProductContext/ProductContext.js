import React, {useState, createContext} from 'react';

export const ProductContext = createContext();

export const ProductProvider = (props) => {
    const [dest, setDest] = useState(['']);
    const [productSelected, setProductSelected] = useState(['']);
    return(
        <ProductContext.Provider value={ {dest, setDest, productSelected, setProductSelected}}>
            {props.children}
        </ProductContext.Provider>
    );
}