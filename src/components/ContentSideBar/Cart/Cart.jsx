import styles from './styles.module.scss';
import { FiShoppingCart } from 'react-icons/fi';
import HeaderSideBar from '@components/ContentSideBar/Components/HeaderSideBar/HeaderSideBar';
import ItemProduct from '@components/ContentSideBar/Components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';
import { useContext } from 'react';
import { SideBarContext } from '@/contexts/SidebarProvider';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

function Cart() {
    const {
        container,
        btn,
        total,
        subtotal,
        price,
        containerProductCart,
        overlayLoading,
        contentWrapper
    } = styles;

    const { listProductsCart, isLoading } = useContext(SideBarContext);

    return (
        <div className={container}>
            <div className={contentWrapper}>
                <HeaderSideBar
                    icon={<FiShoppingCart size={26} />}
                    title={'CART'}
                />

                <div className={containerProductCart}>
                    {isLoading ? (
                        <div className={overlayLoading}>
                            <LoadingTextCommon />{' '}
                        </div>
                    ) : (
                        listProductsCart.map((item, index) => {
                            return (
                                <ItemProduct
                                    key={index}
                                    src={item.images[0]}
                                    nameProduct={item.name}
                                    priceProduct={item.price}
                                    skuProduct={item.sku}
                                    sizeProduct={item.size}
                                    quantityProduct={item.quantity}
                                    productId={item.productId}
                                    userId={item.userId}
                                />
                            );
                        })
                    )}
                </div>
            </div>

            <div>
                <div className={total}>
                    <p className={subtotal}>Subtotal:</p>
                    <p className={price}>$119.99</p>
                </div>
                <div className={btn}>
                    <Button content={'VIEW CART'} width={'100%'} />
                    <Button
                        content={'CHECKOUT'}
                        width={'100%'}
                        isPrimary={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default Cart;
