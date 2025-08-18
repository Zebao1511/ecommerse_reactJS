import HeaderSideBar from '@components/ContentSideBar/Components/HeaderSideBar/HeaderSideBar';
import { TfiReload } from 'react-icons/tfi';

import styles from './styles.module.scss';
import ItemProduct from '@components/ContentSideBar/Components/ItemProduct/ItemProduct';
import Button from '@components/Button/Button';

function Compare() {
    const { container, boxContent } = styles;

    return (
        <div className={container}>
            <div className={boxContent}>
                <HeaderSideBar
                    icon={<TfiReload size={26} />}
                    title={'COMPARE'}
                />
                <ItemProduct />
            </div>
            <Button content={'VIEW COMPARE'} width={'100%'} />
        </div>
    );
}

export default Compare;
