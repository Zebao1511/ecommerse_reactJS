import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import CountdownBanner from '@components/CountdownBanner/CountdownBanner';
import ProductItem from '@components/ProductItem/ProductItem';

function HeadListProduct({ data }) {
    const { container, title } = styles;

    return (
        <>
            <MainLayout>
                <div className={container}>
                    <CountdownBanner />
                    <div className={title}>
                        {data.map((item) => {
                            return (
                                <ProductItem
                                    key={item.id}
                                    src={item.images[0]}
                                    prevSrc={item.images[1]}
                                    name={item.name}
                                    price={item.price}
                                    detail={item}
                                />
                            );
                        })}
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default HeadListProduct;
