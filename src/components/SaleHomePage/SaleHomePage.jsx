import Button from '@components/Button/Button';
import styles from './styles.module.scss';
import { useEffect } from 'react';
import useTranslateXImage from '@/hooks/useTranslateXImage';

function SaleHomePage() {
    const { container, containerContent, boxImg } = styles;

    const { translateXPosition } = useTranslateXImage();

    return (
        <div className={container}>
            <div
                className={boxImg}
                style={{
                    transform: `translateX(${translateXPosition}px)`,
                    transition: 'transform 0.6s ease'
                }}
            >
                <img
                    src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image_1.jpeg'
                    alt=''
                />
            </div>
            <div className={containerContent}>
                <h2>Sale of The Year</h2>
                <div>
                    Libero sed faucibus facilisis fermentum. Est nibh sed massa
                    sodales.
                </div>
                <Button content={'Read more'} isPrimary={false} />
            </div>
            <div
                className={boxImg}
                style={{
                    transform: `translateX(-${translateXPosition}px)`,
                    transition: 'transform 0.6s ease'
                }}
            >
                <img
                    src='https://xstore.b-cdn.net/elementor2/marseille04/wp-content/uploads/sites/2/2022/12/Image_2.jpeg'
                    alt=''
                />
            </div>
        </div>
    );
}

export default SaleHomePage;
