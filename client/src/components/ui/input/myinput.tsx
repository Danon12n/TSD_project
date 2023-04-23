import { FC, HTMLInputTypeAttribute } from "react";
import styles from "./myinput.module.css";

interface MyInputProps {
    placeholder?: string;
    type?: HTMLInputTypeAttribute;
    required?: boolean;
    name?: string;
    value?: string | number | readonly string[];
    onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

const MyInput: FC<MyInputProps> = ({
    placeholder,
    type,
    required,
    name,
    value,
    onChange,
}) => {
    return (
        <input
            type={type}
            required={required}
            name={name}
            value={value}
            onChange={onChange}
            className={`${styles.myInput}`}
            placeholder={placeholder}
        />
    );
};
export { MyInput };
