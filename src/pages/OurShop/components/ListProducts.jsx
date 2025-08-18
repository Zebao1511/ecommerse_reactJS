import MainLayout from '@components/Layout/Layout';
import { useContext } from 'react';
import { OurShopContext } from '@/contexts/OurShopContext';
import ProductItem from '@components/ProductItem/ProductItem';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';
import LoadingTextCommon from '@components/LoadingTextCommon/LoadingTextCommon';

function ListProducts() {
    const {
        products,
        isShowGrid,
        isLoading,
        handleLoadMore,
        total,
        isLoadMore
    } = useContext(OurShopContext);
    const { containerProducts, sectionListProdut, loading } = styles;

    return (
        <div className={sectionListProdut}>
            <MainLayout>
                {isLoading ? (
                    <>Loading...</>
                ) : (
                    <>
                        <div className={isShowGrid ? containerProducts : ''}>
                            {products.map((item) => {
                                return (
                                    <ProductItem
                                        key={item.id}
                                        src={item.images[0]}
                                        prevSrc={item.images[1]}
                                        name={item.name}
                                        price={item.price}
                                        detail={item}
                                        isHomePage={false}
                                    />
                                );
                            })}
                        </div>

                        <div
                            style={{
                                display: 'flex',
                                justifyContent: 'center',
                                marginTop: '10px',
                                marginBottom: '10px'
                            }}
                        >
                            {products.length < total && (
                                <Button
                                    content={
                                        isLoadMore ? (
                                            <LoadingTextCommon />
                                        ) : (
                                            'LOAD MORE PRODUCTS'
                                        )
                                    }
                                    fontSize={11}
                                    width={200}
                                    isPrimary={false}
                                    onClick={handleLoadMore}
                                />
                            )}
                        </div>
                    </>
                )}
            </MainLayout>
        </div>
    );
}

export default ListProducts;
