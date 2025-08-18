import CountdownTimer from '@components/Timer/CountTimer';
import styles from '../styles.module.scss';
import Button from '@components/Button/Button';
import { useContext } from 'react';
import { OurShopContext } from '@contexts/OurShopContext';

function Banner() {
    const { containerBanner, contentBox, titleBanner, btnBanner } = styles;

    const targetDate = '2025-12-31T00:00:00';

    return (
        <>
            <div className={containerBanner}>
                <div className={contentBox}>
                    <CountdownTimer targetData={targetDate} />
                </div>
                <h2 className={titleBanner}>The Classics Make a Combak</h2>
                <div className={btnBanner}>
                    <Button content={'Buy now'} width={160} />
                </div>
            </div>
        </>
    );
}

export default Banner;
