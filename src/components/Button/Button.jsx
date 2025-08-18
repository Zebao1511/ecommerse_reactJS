import classNames from 'classnames';
import styles from './styles.module.scss';

function Button({ content, isPrimary = true, fontSize, width, ...props }) {
    const { btn, primaryBtn, secondaryBtn } = styles;

    return (
        <button
            className={classNames(btn, {
                [primaryBtn]: isPrimary,
                [secondaryBtn]: !isPrimary
            })}
            style={{ width, fontSize }}
            {...props}
        >
            {content}
        </button>
    );
}

export default Button;
