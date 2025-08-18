import Header from '@components/Header/Header';
import Banner from '@components/Banner/Banner';
import Info from '@components/Info/Info';

import styles from './styles.module.scss';
import AdvancedHeading from '@components/AdvancedHeading/AdvancedHeading';
import HeadListProduct from '@components/MenuContent/HeadListProduct/HeadListProdict';
import { useEffect, useState } from 'react';
import { getProducts } from '@/apis/ProductsService';
import PopularProduct from '@components/PopularProduct/PopularProduct';
import SaleHomePage from '@components/SaleHomePage/SaleHomePage';
import Footer from '@components/Footer/Footer';

function HomePage() {
    const { container } = styles;

    const [listProduct, setListProduct] = useState([]);

    useEffect(() => {
        const query = {
            sortType: 0,
            page: 1,
            limit: 10
        };
        getProducts(query).then((res) => {
            setListProduct(res.contents);
        });
    }, []);

    return (
        <div>
            <div className={container}>
                <Header />
                <Banner />
                <Info />
                <AdvancedHeading />
                <HeadListProduct data={listProduct.slice(0, 2)} />
                <PopularProduct
                    data={listProduct.slice(2, listProduct.length)}
                />
                <SaleHomePage />
                <Footer />
            </div>
        </div>
    );
}

export default HomePage;
