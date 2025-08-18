import HeaderSideBar from '@components/ContentSideBar/Components/HeaderSideBar/HeaderSideBar';
import styles from './styles.module.scss';
import { FiHeart } from 'react-icons/fi';
import ItemProduct from '@components/ContentSideBar/Components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';

function WishList() {
    const { container, btn } = styles;
    return (
        <div className={container}>
            <div>
                <HeaderSideBar
                    icon={<FiHeart size={26} />}
                    title={'WISHLIST'}
                />
                <ItemProduct />
            </div>

            <div className={btn}>
                <Button content={'VIEW WISHLIST'} width={'100%'} />
                <Button
                    content={'ADD ALL TO CAR'}
                    width={'100%'}
                    isPrimary={false}
                />
            </div>
        </div>
    );
}

export default WishList;
