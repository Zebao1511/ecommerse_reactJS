import InputCommon from '@components/InputCommon/InputCommon';
import styles from './styles.module.scss';
import Button from '@components/Button/Button';

//Import thư viện Formik để quản lý form
import { useFormik } from 'formik';
//Import thư viện Yup để xác thực dữ liệu
import * as Yup from 'yup';
import { useContext, useEffect, useState } from 'react';
import { ToastContext } from '@/contexts/ToastProvider';
import { register, signIn } from '@/apis/authService';

import Cookies from 'js-cookie';
import { SideBarContext } from '@/contexts/SidebarProvider';
import { StoreContext } from '@/contexts/storeProvider';

function Login() {
    const { container, title, inputFrom, boxRememberMe, lostPass, btn, error } =
        styles;

    // Check trạng thái Register hay Login
    const [isRegister, setIsRegister] = useState(false);

    // Theo dõi xem 1 thao tác bất động bộ có đang diễn ra không
    // False là không có thao tác nào đang hoạt động
    const [isLoading, setIsLoading] = useState(false);

    // Sử dụng lại context của Toast
    const { toast } = useContext(ToastContext);

    const { setIsOpen, handleGetListProductsCart } = useContext(SideBarContext);
    const { setUserId } = useContext(StoreContext);

    const formik = useFormik({
        //Khởi tạo giá trị ban đầu cho form
        initialValues: {
            email: '',
            password: ''
        },

        //Kết hợp với Yup để xác thực dữ liệu
        validationSchema: Yup.object({
            email: Yup.string()
                .email('Invalid email address')
                .required('Email is required'),
            password: Yup.string()
                .min(6, 'Password must be at least 6 characters')
                .required('Password is required'),
            // Validate Confrim Password
            // oneOf dùng để so sánh với 1 trường nào đó
            // Yup.ref dùng để tham chiếu 1 trường mong muốn
            cfmpassword: Yup.string().oneOf(
                [Yup.ref('password'), null],
                'Password must be match'
            )
        }),

        // Khi submit thì nhưng giá trị sẽ đc nhận lại từ tham số trong hàm onSubmit
        onSubmit: async (values) => {
            // Ngăn chặn việc gửi nhiều lần nếu một lần gửi trước đó đang trong quá trình xử lý
            if (isLoading) return;

            const { email: username, password } = values;
            setIsLoading(true);

            if (isRegister) {
                await register({ username, password })
                    .then((res) => {
                        toast.success(res.data.message);
                        setIsLoading(false);
                    })
                    .catch((err) => {
                        toast.error(err.response.data.message);
                        setIsLoading(false);
                    });
            }

            if (!isRegister) {
                await signIn({ username, password })
                    .then((res) => {
                        setIsLoading(false);
                        const { id, token, refreshToken } = res.data;

                        setUserId(id);

                        // Lưu vào Cookies
                        // Tham số đầu là tên của gtri mà muốn lưu trong Cookies, Tham số thứ 2 là value tương ứng với tên đó.
                        Cookies.set('token', token);
                        Cookies.set('refreshToken', refreshToken);
                        Cookies.set('userId', id);
                        toast.success('Sign in successfully!');
                        setIsOpen(false);
                        handleGetListProductsCart(id, 'cart');
                    })
                    .catch((err) => {
                        setIsLoading(false);
                        toast.error('Sign in failed!');
                    });
            }
        }
    });

    const handleToggle = () => {
        setIsRegister(!isRegister);
        // Xóa các nội dung nhập khi chuyển từ SIGN UP qua SIGN IN và ngược lại
        formik.resetForm();
    };

    return (
        <div className={container}>
            <div className={title}>{isRegister ? 'SIGN UP' : 'SIGN IN'}</div>
            {/* Form Login */}
            <form onSubmit={formik.handleSubmit}>
                {/* Nhập Email */}
                <div className={inputFrom}>
                    <InputCommon
                        id='email'
                        label={'Username or email'}
                        type={'text'}
                        isRequired={true}
                        formik={formik}
                    />
                </div>

                {/* Nhập Password */}
                <div className={inputFrom}>
                    <InputCommon
                        id='password'
                        label={'Password'}
                        type={'password'}
                        isRequired={true}
                        formik={formik}
                    />
                </div>

                {/* Nhập Confrim Password */}
                {isRegister && (
                    <div className={inputFrom}>
                        <InputCommon
                            id='cfmpassword'
                            label={'Comfirm password'}
                            type={'password'}
                            isRequired={true}
                            formik={formik}
                        />
                    </div>
                )}

                {!isRegister && (
                    <div className={boxRememberMe}>
                        <input type='checkbox' />
                        <span>Remember me</span>
                    </div>
                )}

                <div className={btn}>
                    {/* Khi nhấn vào btn có type submit thì sẽ trigger hàm onSubmit của form 
                    => formik gọi handleSubmit để xử lý */}
                    <Button
                        content={
                            isLoading
                                ? 'LOADING...'
                                : isRegister
                                ? 'REGISTER'
                                : 'LOGIN'
                        }
                        width={'100%'}
                        type='submit'
                        // onClick={() => toast.success('Success')}
                    />
                </div>
            </form>

            <div className={btn}>
                <Button
                    content={
                        isRegister
                            ? 'Already have an account?'
                            : "Don't have any account?"
                    }
                    width={'100%'}
                    type='submit'
                    isPrimary={false}
                    onClick={handleToggle}
                />
            </div>
            {!isRegister && <div className={lostPass}>Lost your password?</div>}
        </div>
    );
}

export default Login;
