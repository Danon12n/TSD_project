import { FC } from "react";
import styles from "./myfooter.module.css";

interface MyFooterProps {
    type: "admin" | "vendor" | "customer" | "notAuthorized";
}

const MyFooter: FC<MyFooterProps> = ({ type }) => {
    return (
        <div className={`${styles.myFooter}`}>
            <div className={`${styles.content}`}>
                <p>VK: ssylkaa.ru</p>
                <p>Yandex: mailbox@yandex.ru</p>
                <p>Discord:@nickname</p>
            </div>
        </div>
    );
};
export { MyFooter };
