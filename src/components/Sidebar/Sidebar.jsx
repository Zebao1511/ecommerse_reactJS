import { SideBarContext } from '@/contexts/SidebarProvider';
import styles from './styles.module.scss';
import { useContext } from 'react';
import classNames from 'classnames';
import { TfiClose } from 'react-icons/tfi';
import Login from '@components/ContentSideBar/Login/Login';
import Compare from '@components/ContentSideBar/Compare/Compare';
import WishList from '@components/ContentSideBar/WishList/WishList';
import Cart from '@components/ContentSideBar/Cart/Cart';

function SideBar() {
    const { container, sidebar, overlay, sliderSideBar, boxIcon } = styles;
    const { isOpen, setIsOpen, type } = useContext(SideBarContext);

    const handleToggle = () => {
        setIsOpen(!isOpen);
    };

    const handleRenderContent = () => {
        switch (type) {
            case 'login':
                return <Login />;

            case 'compare':
                return <Compare />;

            case 'wishList':
                return <WishList />;

            case 'cart':
                return <Cart />;

            default:
                return <Login />;
        }
    };

    return (
        <div className={container}>
            <div
                className={classNames({ [overlay]: isOpen })}
                onClick={handleToggle}
            />
            <div
                className={classNames(sidebar, {
                    [sliderSideBar]: isOpen
                })}
            >
                {isOpen && (
                    <div className={boxIcon} onClick={handleToggle}>
                        <TfiClose />
                    </div>
                )}
                {handleRenderContent()}
            </div>
        </div>
    );
}

export default SideBar;
