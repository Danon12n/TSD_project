import { FC, useCallback, useEffect, useState } from "react";
import styles from "./admin-page.module.css";
import { MyTable } from "../../components/ui/table/mytable";
import { Modal } from "../../components/ui/modal/modal";
import { MyDropMenu } from "../../components/ui/drop-menu/mydrop-menu";
import { MyButton } from "../../components/ui/button/mybutton";
import { changeRole, deleteUser, getUsers } from "../../utils/user-api";
import {
    TStore,
    TTableButton,
    TTableData,
    TTableIcon,
    TUserClient,
} from "../../types/types";
import { useSelector } from "react-redux";
import { TPetsState } from "../../services/reducers/pets/pets";
import { TUserState } from "../../services/reducers/user/user";
import { DeleteIcon } from "../../components/ui/icons/icons";

const AdminMenuPage: FC = () => {
    const [toggleUpdateTable, setToggleUpdateTable] = useState(-1);
    const [isVisible, setIsVisible] = useState(false);
    const [shop, setShop] = useState("NULL");
    const [selectedUser, setSelectedUser] = useState<TUserClient>({
        user_id: 0,
        name: "",
        surname: "",
        login: "",
        role: "customer",
        telephone: "",
        shop_address: "null",
    });
    const { users } = useSelector<TStore, TUserState>((store) => store.user);
    const { shops } = useSelector<TStore, TPetsState>((store) => store.pets);
    const [tableData, setTableData] = useState<TTableData>({
        head: ["ID", "Логин", "Имя", "Роль", "Адрес магазина"],
        body: [],
        buttons: [
            {
                title: "сделать покупателем",
                onClickFns: [],
            },
            {
                title: "сделать продавцом",
                onClickFns: [],
            },
        ],
        icons: [
            { icon: <DeleteIcon size='50' color='black' />, onClickFns: [] },
        ],
    });

    useEffect(() => {
        getTableData();
        // eslint-disable-next-line
    }, [toggleUpdateTable]);

    const getTableData = useCallback(() => {
        getUsers()
            .then(() => {
                let newButtons: TTableButton[] = [];
                if (tableData.buttons) {
                    newButtons = [
                        { ...tableData.buttons[0], onClickFns: [] },
                        { ...tableData.buttons[1], onClickFns: [] },
                    ];
                }

                let newIcons: TTableIcon[] = [];
                if (tableData.icons) {
                    newIcons = [{ ...tableData.icons[0], onClickFns: [] }];
                }

                const newBody: string[][] = users.map((user) => {
                    newButtons[0].onClickFns.push(async () => {
                        await changeRole(user.user_id, "customer", "NULL");
                        setToggleUpdateTable(Math.random());
                    });
                    newButtons[1].onClickFns.push(() => {
                        setSelectedUser(user);
                        setIsVisible(true);
                        setToggleUpdateTable(Math.random());
                    });
                    newIcons[0].onClickFns.push(async () => {
                        await deleteUser(user.user_id);
                        setToggleUpdateTable(Math.random());
                    });
                    return [
                        user.user_id.toString(),
                        user.login,
                        user.name,
                        user.role,
                        user.shop_address === null ||
                        user.shop_address === "null"
                            ? "no address"
                            : user.shop_address,
                    ];
                });
                return { newBody, newIcons, newButtons };
            })
            .then(({ newBody, newIcons, newButtons }) => {
                setTableData({
                    ...tableData,
                    body: [...newBody],
                    buttons: [...newButtons],
                    icons: [...newIcons],
                });
            });
    }, [toggleUpdateTable]);

    return (
        <>
            <MyTable skin='primary' tableData={tableData} />
            {isVisible && (
                <Modal
                    onClose={() => {
                        setIsVisible(false);
                    }}
                >
                    <>
                        <MyDropMenu
                            options={[
                                "ANY",
                                ...shops.map((shop) => shop.adress),
                            ]}
                            changeHandler={setShop}
                        />
                        <div className={styles.buttonsWrapper}>
                            <MyButton
                                onClick={async () => {
                                    await changeRole(
                                        selectedUser.user_id,
                                        "vendor",
                                        shop
                                    )
                                        .then(() => {
                                            setIsVisible(false);
                                            setToggleUpdateTable(Math.random());
                                        })
                                        .catch((error) => {
                                            console.log(error);
                                        });
                                }}
                                skin='primary'
                            >
                                Выбрать
                            </MyButton>
                            <MyButton
                                onClick={() => {
                                    setIsVisible(false);
                                }}
                                skin='primary'
                            >
                                Отменить
                            </MyButton>
                        </div>
                    </>
                </Modal>
            )}
        </>
    );
};
export { AdminMenuPage };
