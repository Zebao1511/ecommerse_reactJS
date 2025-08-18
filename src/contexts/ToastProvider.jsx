import { createContext, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

export const ToastContext = createContext();

// toast dùng để paste xuống cho tất cả các thằng con (Những nội dung của trang web)
// có thể nhận được hàm này để tương tác và bật lên popup đó và truyền nội dùng vào Popup đó.

//ToastContainer là component.

export const ToastProvider = ({ children }) => {
    const value = {
        toast
    };

    return (
        <ToastContext.Provider value={value}>
            {children}
            <ToastContainer />
        </ToastContext.Provider>
    );
};
