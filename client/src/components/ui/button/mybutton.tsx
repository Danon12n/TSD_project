import { FC, MouseEventHandler } from "react";
import styles from "./mybutton.module.css";

interface MyButtonProps {
    children: React.ReactNode;
    skin: "primary" | "secondary";
    type?: "button" | "submit" | "reset";
    onClick?: MouseEventHandler<HTMLButtonElement>;
    disabled?: boolean;
}

const MyButton: FC<MyButtonProps> = ({
    children,
    skin,
    type,
    onClick,
    disabled,
}) => {
    const color = skin === "primary" ? styles.blue : styles.green;
    return (
        <button
            disabled={disabled}
            type={type}
            className={`${styles.myButton} ${disabled ? "" : color}`}
            onClick={onClick ? onClick : () => {}}
        >
            {children}
        </button>
    );
};
export { MyButton };
