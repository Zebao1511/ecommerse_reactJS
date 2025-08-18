import Header from '@components/Header/Header';
import MainLayout from '@components/Layout/Layout';
import styles from './styles.module.scss';
import { useNavigate } from 'react-router-dom';
import Banner from '@pages/OurShop/components/Banner';
import { OurShopProvider } from '@contexts/OurShopContext';
import FilterShop from '@pages/OurShop/components/Filter';
import ListProducts from '@pages/OurShop/components/ListProducts';
import Footer from '@components/Footer/Footer';

function OurShop() {
    const { container, functionBox, specialText, btnBack } = styles;

    // Quay lại trang trước đó
    const navigate = useNavigate();

    const handleBackPreviousPage = () => {
        navigate(-1);
    };

    // Bọc các component con bằng Provider thì chỉ có những component con mới
    // mới nhận được giá trị từ context để truyển xuống

    // Khi gọi context mà cấp bậc bằng với provider thì sẽ ko lấy đc giá trị
    // => undefined

    return (
        <OurShopProvider>
            <Header />
            <MainLayout>
                <div className={container}>
                    <div className={functionBox}>
                        <div>
                            Home &gt; <span className={specialText}>Shop</span>
                        </div>
                        <div
                            className={btnBack}
                            onClick={() => handleBackPreviousPage()}
                        >
                            {'<'}Return to previouis page{' '}
                        </div>
                    </div>
                </div>

                <Banner />

                <div>
                    <FilterShop />
                    <ListProducts />
                </div>
            </MainLayout>
            <Footer />
        </OurShopProvider>
    );
}

export default OurShop;
