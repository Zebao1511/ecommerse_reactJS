import styles from '../styles.module.scss';
import cls from 'classnames';

function SelectBox({ options, getValue, type }) {
    const { selectBox } = styles;
    return (
        // onChange kích hoạt khi giá trị của select thay đỗi (User chọn 1 tùy chọn khác)
        // (e): là 1 arrow function được gọi khi onChange xảy ra. Nhận 1 đối tượng sự kiện e làm tham số
        // e.target.value: Là cách truy cập giá trị của HTML đã kích hoạt sự kiện
        <select
            onChange={(e) => getValue(e.target.value, type)}
            className={selectBox}
        >
            {options.map((option) => {
                return (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                );
            })}
        </select>
    );
}

export default SelectBox;
