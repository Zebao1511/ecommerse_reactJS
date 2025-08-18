import { deleteItemCart } from '@/apis/cartService';
import styles from './styles.module.scss';
import { IoClose } from 'react-icons/io5';
import { useContext, useState } from 'react';
import { SideBarContext } from '@/contexts/SidebarProvider';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

function ItemProduct({
    src,
    nameProduct,
    priceProduct,
    skuProduct,
    sizeProduct,
    quantityProduct,
    productId,
    userId
}) {
    const {
        container,
        boxContent,
        boxTitle,
        boxPrice,
        boxClose,
        size,
        overlayLoading
    } = styles;

    const [isDelete, setIsDelete] = useState(false);
    const { handleGetListProductsCart } = useContext(SideBarContext);

    const handleRemoveItem = () => {
        setIsDelete(true);
        deleteItemCart({
            productId,
            userId
        })
            .then((res) => {
                console.log(res);
                setIsDelete(false);
                handleGetListProductsCart(userId, 'cart');
            })
            .catch((err) => {
                console.log(err);
                setIsDelete(false);
            });
    };

    return (
        <div className={container}>
            <img src={src} alt='' />

            <div className={boxClose} onClick={handleRemoveItem}>
                <IoClose opacity={0.5} size={20} />
            </div>

            <div className={boxContent}>
                <div className={boxTitle}>{nameProduct}</div>
                <div className={size}>Size: {sizeProduct}</div>
                <div className={boxPrice}>
                    {quantityProduct} x ${priceProduct}
                </div>
                <div className={boxTitle}>SKU: {skuProduct}</div>
            </div>

            {isDelete && (
                <div className={overlayLoading}>
                    <LoadingTextCommon />
                </div>
            )}
        </div>
    );
}

export default ItemProduct;
