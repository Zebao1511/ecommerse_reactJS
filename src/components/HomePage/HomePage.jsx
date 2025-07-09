import Header from '@components/Header/Header';
import Banner from '@components/Banner/Banner';
import Info from '@components/Info/Info';

import styles from './styles.module.scss';
import AdvancedHeading from '@components/AdvancedHeading/AdvancedHeading';
import HeadListProduct from '@components/MenuContent/HeadListProduct/HeadListProdict';

function HomePage() {
    const { container } = styles;

    return (
        <div>
            <div className={container}>
                <Header />
                <Banner />
                <Info />
                <AdvancedHeading />
                <HeadListProduct />
            </div>
        </div>
    );
}

export default HomePage;
