import { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { TPetsState } from "../../../services/reducers/pets/pets";
import { TUserState } from "../../../services/reducers/user/user";
import { TPet, TStore, TTableData, TTableIcon } from "../../../types/types";
import { getShopPets, deletePet } from "../../../utils/vendor-api";
import { DeleteIcon, EditIcon } from "../../ui/icons/icons";
import { MyTable } from "../../ui/table/mytable";
import { boundPetCreator } from "../../../services/actions/pet-creator";
import { Redirect } from "react-router";

const CreatedPets: FC = () => {
    const { user } = useSelector<TStore, TUserState>((store) => store.user);
    const [toggleUpdateTable, setToggleUpdateTable] = useState(-1);
    const { shops, pets } = useSelector<TStore, TPetsState>(
        (store) => store.pets
    );
    const [toggleRedirect, setToggleRedirect] = useState<boolean>(false);
    const [tableData, setTableData] = useState<TTableData>({
        head: [
            "ID питомца",
            "Имя питомца",
            "Пол питомца",
            "Вид питомца",
            "Цена",
        ],
        body: [],
        icons: [
            { icon: <DeleteIcon size='50' />, onClickFns: [] },
            { icon: <EditIcon size='50' />, onClickFns: [] },
        ],
    });

    const getTableData = useCallback(() => {
        getShopPets(
            {
                ...shops.find((shop) => shop.adress === user.shop_address),
            }.Shop_id as number
        )
            .then((data) => {
                let newIcons: TTableIcon[] = [];

                if (tableData.icons) {
                    newIcons = [
                        { ...tableData.icons[0], onClickFns: [] },
                        { ...tableData.icons[1], onClickFns: [] },
                    ];
                }

                let shopPets = data.map(
                    (el: any) =>
                        pets.find((pet) => pet.pet_id === el.pet_id) as TPet
                );

                const newBody: string[][] = shopPets.map((shopPet: TPet) => {
                    newIcons[0].onClickFns.push(async () => {
                        await deletePet(shopPet.pet_id);
                        setToggleUpdateTable(shopPet.pet_id);
                    });
                    newIcons[1].onClickFns.push(() => {
                        boundPetCreator.setPetCreatorMode("Update");
                        boundPetCreator.setPet(shopPet);
                        localStorage.setItem(
                            "petCreationForm",
                            JSON.stringify(shopPet)
                        );
                        setToggleRedirect(true);
                    });

                    return [
                        shopPet.pet_id,
                        shopPet.name,
                        shopPet.gender,
                        shopPet.pet_type,
                        shopPet.price + " $",
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
    }, [toggleUpdateTable]);

    useEffect(() => {
        getTableData();
        // eslint-disable-next-line
    }, [toggleUpdateTable]);

    if (toggleRedirect) return <Redirect to={"/vendor/petsCreation"} />;

    return <MyTable skin='primary' tableData={tableData} />;
};
export { CreatedPets };
