import { SideBarContext } from '@/contexts/SidebarProvider';
import styles from '../styles.module.scss';
import { useContext, useState } from 'react';
import { StoreContext } from '@/contexts/storeProvider';

import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

function Menu({ content, href }) {
    const { menu, subMenu } = styles;
    const { setIsOpen, setType } = useContext(SideBarContext);
    const { userInfo, handleLogOut } = useContext(StoreContext);

    const [isShowSubMenu, setIsShowSubMenu] = useState(false);

    const navigate = useNavigate();

    const handleClickShowLogin = () => {
        if (content === 'Sign in' && !userInfo) {
            setIsOpen(true);
            setType('login');
        }

        if (content === 'Our Shop') {
            navigate('/shop');
        }
    };

    const handleRenderText = () => {
        if (content === 'Sign in' && userInfo) {
            return `Hello: ${userInfo?.username}`;
        } else {
            return content;
        }
    };

    const handleHover = () => {
        console.log(content);

        if (content === 'Sign in' && userInfo) {
            setIsShowSubMenu(true);
        }
    };

    return (
        <div
            className={menu}
            onMouseEnter={handleHover}
            onClick={handleClickShowLogin}
        >
            {handleRenderText(content)}

            {isShowSubMenu && (
                <div
                    onMouseLeave={() => setIsShowSubMenu(false)}
                    className={subMenu}
                    onClick={handleLogOut}
                >
                    Log out
                </div>
            )}
        </div>
    );
}

export default Menu;
