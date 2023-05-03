import { FC, useCallback, useEffect, useState } from "react";
import { ApproveIcon, CancelIcon } from "../../ui/icons/icons";
import { MyTable } from "../../ui/table/mytable";
import { useSelector } from "react-redux";
import { TPetsState } from "../../../services/reducers/pets/pets";
import { TUserState } from "../../../services/reducers/user/user";
import {
    TUserClient,
    TStore,
    TTableData,
    TTableIcon,
} from "../../../types/types";
import { refuseOrder } from "../../../utils/customer-api";
import { acceptOrder, getShopOrders } from "../../../utils/vendor-api";

const VendorOrders: FC = () => {
    const { users, user } = useSelector<TStore, TUserState>(
        (store) => store.user
    );
    const { shops, pets } = useSelector<TStore, TPetsState>(
        (store) => store.pets
    );
    const [toggleUpdateTable, setToggleUpdateTable] = useState(-1);
    const [tableData, setTableData] = useState<TTableData>({
        head: [
            "Номер Заказа",
            "Имя заказчика",
            "Номер телефона",
            "Вид питомца",
            "Цена",
        ],
        body: [],
        icons: [
            { icon: <CancelIcon size='50' color='red' />, onClickFns: [] },
            { icon: <ApproveIcon size='50' color='green' />, onClickFns: [] },
        ],
    });

    const getTableData = useCallback(() => {
        getShopOrders(
            {
                ...shops.find((shop) => shop.adress === user.shop_address),
            }.Shop_id as number
        )
            .then((orders) => {
                let newIcons: TTableIcon[] = [];

                console.log(orders);

                if (tableData.icons) {
                    newIcons = [
                        { ...tableData.icons[0], onClickFns: [] },
                        { ...tableData.icons[1], onClickFns: [] },
                    ];
                }

                const newBody: string[][] = orders.map((order: any) => {
                    newIcons[0].onClickFns.push(async () => {
                        await refuseOrder({
                            order_number: order.order_number,
                            pet_id: order.pet_id,
                        });
                        setToggleUpdateTable(order.order_number);
                    });
                    newIcons[1].onClickFns.push(async () => {
                        await acceptOrder({
                            order_number: order.order_number,
                            pet_id: order.pet_id,
                        });
                        setToggleUpdateTable(order.order_number);
                    });

                    const newUser = users.find(
                        (user) => user.user_id === order.user_id
                    ) as TUserClient;

                    console.log(newUser);

                    const newPetType = pets.find(
                        (pet) => order.pet_id === pet.pet_id
                    )?.pet_type;

                    return [
                        order.order_number.toString(),
                        newUser.name,
                        newUser.telephone,
                        newPetType ? newPetType : "",
                        order.price + " $",
                    ];
                });

                return { newBody, newIcons };
            })
            .then(({ newBody, newIcons }) => {
                setTableData({
                    ...tableData,
                    body: [...newBody],
                    icons: [...newIcons],
                });
            });
        // eslint-disable-next-line
    }, [toggleUpdateTable, setToggleUpdateTable]);

    useEffect(() => {
        getTableData();
        // eslint-disable-next-line
    }, [toggleUpdateTable]);

    if (tableData.body.length === 0) {
        return <h1>В магазине нет заказов</h1>;
    }
    return <MyTable skin='primary' tableData={tableData} />;
};
export { VendorOrders };
