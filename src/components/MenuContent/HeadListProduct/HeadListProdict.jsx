import MainLayout from '@components/Layout/Layout';
import CountdownTimer from '@components/Timer/CountTimer';
import styles from './styles.module.scss';
import CountdownBanner from '@components/CountdownBanner/CountdownBanner';

function HeadListProduct() {
    const { container, title } = styles;
    const targetData = '2025-12-31T23:59:59'; // Thay đổi thời gian đích theo nhu cầu
    return (
        <>
            <MainLayout>
                {/* <CountdownTimer targetData={targetData} /> */}
                <div className={container}>
                    <CountdownBanner />
                    <div className={title}>
                        <div>1</div>
                        <div>2</div>
                    </div>
                </div>
            </MainLayout>
        </>
    );
}

export default HeadListProduct;
