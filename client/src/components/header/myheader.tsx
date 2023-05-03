import { FC } from "react";
import styles from "./myheader.module.css";
import { ProfileIcon } from "../ui/icons/icons";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { TUserState } from "../../services/reducers/user/user";
import { TStore } from "../../types/types";

interface MyHeaderProps {}

const MyHeader: FC<MyHeaderProps> = () => {
    const { user } = useSelector<TStore, TUserState>((store) => store.user);
    const type = user.role;
    return (
        <div className={`${styles.myHeader}`}>
            <div className={`${styles.content}`}>
                <div className={`${styles.leftCorner}`}>
                    <NavLink className={styles.myLink} to={"/"}>
                        Главная
                    </NavLink>
                    {type === "customer" ||
                    type === "vendor" ||
                    type === "admin" ? (
                        <NavLink className={styles.myLink} to={"/customer"}>
                            Покупатель
                        </NavLink>
                    ) : (
                        ""
                    )}
                    {type === "vendor" || type === "admin" ? (
                        <NavLink className={styles.myLink} to={"/vendor"}>
                            Продавец
                        </NavLink>
                    ) : (
                        ""
                    )}
                    {type === "admin" ? (
                        <NavLink className={styles.myLink} to={"/admin"}>
                            Администратор
                        </NavLink>
                    ) : (
                        ""
                    )}
                </div>
                <div className={`${styles.rightCorner}`}>
                    <ProfileIcon size='50' color='white' />
                    <NavLink
                        className={styles.myLink}
                        to={
                            user.role === "notAuthorized"
                                ? "/login"
                                : "/customer"
                        }
                    >
                        Личный кабинет
                    </NavLink>
                </div>
            </div>
        </div>
    );
};
export { MyHeader };
