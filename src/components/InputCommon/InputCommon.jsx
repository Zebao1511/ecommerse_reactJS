import { useState } from 'react';
import styles from './styles.module.scss';
import { FiEye } from 'react-icons/fi';
import { FiEyeOff } from 'react-icons/fi';
import classNames from 'classnames';

function InputCommon({ label, type, isRequired = false, ...props }) {
    const {
        labelInput,
        boxInput,
        container,
        boxIcon,
        error,
        isErrInput,
        errMsg
    } = styles;
    const [showPassword, setShowPassword] = useState(false);

    //Destructering formik
    const { formik, id } = props;

    const isPassword = type === 'password';

    const isShowTextPassword =
        type === 'password' && showPassword ? 'text' : type;

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    //Id được nhận từ thằng cha
    const isErr = formik.touched[id] && formik.errors[id];

    // Show text lỗi là gì
    const messageErr = formik.errors[id];

    return (
        <div className={container}>
            <div className={classNames(labelInput, { [errMsg]: isErr })}>
                {label} {isRequired && <span>*</span>}
            </div>
            <div className={boxInput}>
                {/* Thằng cha truyền props nào thì thằng con đều nhận được props
                đó 1 cách Dyanamic */}
                <input
                    className={classNames({ [isErrInput]: isErr })}
                    type={isShowTextPassword}
                    {...props}
                    onBlur={formik.handleBlur}
                    // Lắng nghe sự thay đổi của form khi nhập vào input
                    onChange={formik.handleChange}
                    // Để 2 way biding cho ô input
                    value={formik.values[id]} // Truy xuất, dynamic theo id được truyền từ thằng cha
                />
                {isPassword && (
                    <div className={boxIcon} onClick={handleShowPassword}>
                        {showPassword ? <FiEyeOff /> : <FiEye />}
                    </div>
                )}

                {/* Hiển thị lỗi */}
                {isErr && <div className={error}>{messageErr}</div>}
            </div>
        </div>
    );
}

export default InputCommon;
