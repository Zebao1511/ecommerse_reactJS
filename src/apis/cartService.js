import axiosClient from './axiosClient';

const addProductToCart = async (data) => {
    return await axiosClient.post('/cart', data);
};

const getCart = async (userId) => {
    return await axiosClient.get(`/cart/${userId}`);
};

const deleteItemCart = async (body) => {
    return await axiosClient.delete('/cart/deleteItem', { data: body });
};

export { addProductToCart, getCart, deleteItemCart };
