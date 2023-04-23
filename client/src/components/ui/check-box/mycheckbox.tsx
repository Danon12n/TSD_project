import { FC } from "react";
import styles from "./mycheckbox.module.css";
import { ApproveIcon, CancelIcon } from "../icons/icons";

interface MyCheckboxProps {
    text: string;
    checked: boolean;
    setChecked: () => void;
}

const MyCheckbox: FC<MyCheckboxProps> = ({
    text = "something",
    checked,
    setChecked,
}) => {
    return (
        <div className={styles.content}>
            <p>{text}</p>
            <div className={styles.icons} onClick={setChecked}>
                {checked ? (
                    <ApproveIcon size='50' color='green' />
                ) : (
                    <CancelIcon size='50' color='red' />
                )}
            </div>
        </div>
    );
};
export { MyCheckbox };
