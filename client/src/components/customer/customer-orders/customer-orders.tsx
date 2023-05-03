import { FC, useCallback, useEffect, useState } from "react";
import { MyTable } from "../../ui/table/mytable";
import {
    TOrderServer,
    TPet,
    TStore,
    TTableData,
    TTableIcon,
} from "../../../types/types";
import { getCustomerOrders, refuseOrder } from "../../../utils/customer-api";
import { TUserState } from "../../../services/reducers/user/user";
import { useSelector } from "react-redux";
import { TPetsState } from "../../../services/reducers/pets/pets";
import { CancelIcon } from "../../ui/icons/icons";
interface CustomerOrdersProps {}

const CustomerOrders: FC<CustomerOrdersProps> = () => {
    const [toggleUpdateTable, setToggleUpdateTable] = useState(-1);
    const { user } = useSelector<TStore, TUserState>((store) => store.user);
    const { pets, shops } = useSelector<TStore, TPetsState>(
        (store) => store.pets
    );
    const [tableData, setTableData] = useState<TTableData>({
        head: [
            "Номер Заказа",
            "Вид питомца",
            "Возраст питомца",
            "Номер телефона",
            "Цена",
            "Адрес Магазина",
        ],
        body: [],
        icons: [{ icon: <CancelIcon color='red' size='50' />, onClickFns: [] }],
    });
    useEffect(() => {
        getTableData();
        // eslint-disable-next-line
    }, [toggleUpdateTable]);

    const getTableData = useCallback(() => {
        getCustomerOrders(user.user_id)
            .then((data: TOrderServer[]) => {
                //филтруем только недоступных питомцев
                const filteredPets = pets.filter(
                    (pet) => pet.available === "no"
                );

                let orderedPets = data.map((order) => {
                    let orderedPet = filteredPets.find((pet) => {
                        if (pet.pet_id === order.pet_id) {
                            pet.order_number = order.order_number;
                            return pet;
                        }
                        return undefined;
                    });
                    return orderedPet;
                }) as TPet[];

                orderedPets = orderedPets.filter((pet) => pet !== undefined);

                orderedPets.forEach((pet) => {
                    shops.find((shop) => {
                        if (shop.Shop_id === pet.shop_id) {
                            pet.shop_phone = shop.telephone;
                            pet.shop_address = shop.adress;
                        }
                        return undefined;
                    });
                });

                let newIcons: TTableIcon[] = [];
                if (tableData.icons) {
                    newIcons = [{ ...tableData.icons[0], onClickFns: [] }];
                }

                const newBody = orderedPets.map((pet) => {
                    if (tableData.icons) {
                        newIcons[0].onClickFns.push(async () => {
                            await refuseOrder({
                                pet_id: pet.pet_id,
                                order_number: pet.order_number as number,
                            });
                            setToggleUpdateTable(pet.pet_id);
                        });
                    }
                    return [
                        pet.order_number ? pet.order_number.toString() : "-",
                        pet.pet_type,
                        pet.age.toString(),
                        pet.shop_phone ? pet.shop_phone : "-",
                        pet.price.toString() + " $",
                        pet.shop_address ? pet.shop_address : "-",
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

    if (tableData.body.length === 0) {
        return <h1>У вас нет заказов</h1>;
    }

    return <MyTable skin='primary' tableData={tableData} />;
};
export { CustomerOrders };
