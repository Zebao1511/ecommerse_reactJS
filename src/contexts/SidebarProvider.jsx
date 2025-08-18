import { createContext, useEffect, useState } from 'react';
import { getCart } from '@/apis/cartService';
import Cookies from 'js-cookie';

export const SideBarContext = createContext();

export const SideBarProvider = ({ children }) => {
    const [isOpen, setIsOpen] = useState(false);

    const [type, setType] = useState('');

    const [listProductsCart, setListProductsCart] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    const userId = Cookies.get('userId');

    // Lấy dữ liệu từ API để render ra UI
    // Lấy userId và type từ bên ProductItem
    const handleGetListProductsCart = (userId, type) => {
        if (userId && type === 'cart') {
            setIsLoading(true);
            getCart(userId)
                .then((res) => {
                    setListProductsCart(res.data.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    setListProductsCart([]);
                    setIsLoading(false);
                });
        }
    };

    const value = {
        isOpen,
        setIsOpen,
        type,
        setType,
        handleGetListProductsCart,
        listProductsCart,
        isLoading
    };

    useEffect(() => {
        handleGetListProductsCart(userId, 'cart');
    }, []);

    return (
        <SideBarContext.Provider value={value}>
            {children}
        </SideBarContext.Provider>
    );
};
