import { BsGrid3X3Gap } from 'react-icons/bs';
import { BsListUl } from 'react-icons/bs';
import styles from '../styles.module.scss';
import cls from 'classnames';
import { useContext } from 'react';
import { OurShopContext } from '@contexts/OurShopContext';
import SelectBox from '@pages/OurShop/components/SelectBox';

function FilterShop() {
    const { containerFilter, boxIconFilter, boxLeft, selectBox, show, sort } =
        styles;

    const { showOptions, sortOptions, setSortId, setShowId, setIsShowGrid } =
        useContext(OurShopContext);

    const getValueSelect = (value, type) => {
        if (type === 'sort') {
            setSortId(value);
        } else {
            setShowId(value);
        }
    };

    const handleGetShowGrid = (type) => {
        setIsShowGrid(type === 'grid');
    };

    return (
        <div className={containerFilter}>
            <div className={boxLeft}>
                <SelectBox
                    options={sortOptions}
                    getValue={getValueSelect}
                    type={'sort'}
                />

                <div className={boxIconFilter}>
                    <BsGrid3X3Gap
                        size={20}
                        cursor={'pointer'}
                        onClick={() => handleGetShowGrid('grid')}
                    />
                    <div
                        style={{
                            height: '20px',
                            width: '1px',
                            backgroundColor: '#e1e1e1'
                        }}
                    />
                    <BsListUl
                        size={24}
                        cursor={'pointer'}
                        onClick={() => handleGetShowGrid('list')}
                    />
                </div>
            </div>

            <div className={boxLeft}>
                <div>Show</div>
                <SelectBox
                    options={showOptions}
                    getValue={getValueSelect}
                    type={'show'}
                />
            </div>
        </div>
    );
}

export default FilterShop;
