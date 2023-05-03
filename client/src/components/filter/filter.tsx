import { FC, FormEventHandler, useCallback, useState } from "react";
import styles from "./filter.module.css";
import { MyDropMenu } from "../ui/drop-menu/mydrop-menu";
import { MyCheckbox } from "../ui/check-box/mycheckbox";
import { MyInput } from "../ui/input/myinput";
import { MyButton } from "../ui/button/mybutton";
import { TPet, TShop, TStore } from "../../types/types";
import { useForm } from "../../hooks/useForm";
import { useSelector } from "react-redux";
import { TPetsState } from "../../services/reducers/pets/pets";
import { boundPets } from "../../services/actions/pets";
interface FilterProps {}

const Filter: FC<FilterProps> = () => {
    const [canSwim, setCanSwim] = useState<0 | 1>(0);
    const [canReproduce, setCanReproduce] = useState<0 | 1>(0);

    const { pets, shops } = useSelector<TStore, TPetsState>(
        (store) => store.pets
    );

    const { values, handleChange } = useForm({
        priceFrom: "0",
        priceTo: "1000",
    });
    const onFormSubmit: FormEventHandler = (e) => {
        e.preventDefault();
        const res = filterPets(pets);
        boundPets.setFilteredPets(res);
    };

    const filterPets = useCallback(
        (list: TPet[]) => {
            const petTypeSelect = document.querySelector(
                "#petType"
            ) as HTMLSelectElement;
            const petGenderSelect = document.querySelector(
                "#petGender"
            ) as HTMLSelectElement;
            const shopAddressSelect = document.querySelector(
                "#shopAddress"
            ) as HTMLSelectElement;

            let result: TPet[] = list.filter((pet) => pet.available === "yes");

            let petType = petTypeSelect.value;
            let petGender = petGenderSelect.value;
            let shopAddress = shopAddressSelect.value;

            if (petType !== "Any") {
                result = result.filter((pet) => pet.pet_type === petType);
            }

            if (petGender !== "Any") {
                result = result.filter((pet) => pet.gender === petGender);
            }

            if (shopAddress !== "Any") {
                const selectedShop = shops.find(
                    (shop) => shop.adress === shopAddress
                ) as TShop;

                result = result.filter(
                    (pet) => pet.shop_id === selectedShop.Shop_id
                );
            }
            result = result.filter(
                (pet) =>
                    pet.price >= values.priceFrom && pet.price <= values.priceTo
            );

            result = result.filter(
                (el) =>
                    el.can_swim === canSwim &&
                    el.reproduce_ability === canReproduce
            );

            return result;
        },
        [canSwim, shops, values, canReproduce]
    );

    return (
        <form
            id='filterForm'
            onSubmit={onFormSubmit}
            className={styles.filterWrapper}
        >
            <p className={styles.filterTitle}>Фильтр</p>
            <MyDropMenu
                id='petType'
                options={[
                    "Any",
                    "Черепаха",
                    "Коала",
                    "Ленивец",
                    "Улитка",
                    "Ядозуб",
                    "Лори",
                    "Слизень",
                    "Морская звезда",
                    "Морской конек",
                ]}
                title='Вид'
            />
            <MyDropMenu
                id='petGender'
                options={["Any", "Самец", "Самка", "Не определен"]}
                title='Пол'
            />
            <MyDropMenu
                id='shopAddress'
                options={["Any", ...shops.map((shop) => shop.adress)]}
                title='Магазины'
            />
            <MyCheckbox
                text='Способность плавать'
                checked={canSwim === 0 ? false : true}
                setChecked={() => {
                    setCanSwim(canSwim === 0 ? 1 : 0);
                }}
            />
            <MyCheckbox
                text='Способность плодиться'
                checked={canReproduce === 0 ? false : true}
                setChecked={() => {
                    setCanReproduce(canReproduce === 0 ? 1 : 0);
                }}
            />

            <div className={styles.priceWrapper}>
                <p>Цена</p>
                <div className={styles.inputsWrapper}>
                    <MyInput
                        type='number'
                        name='priceFrom'
                        placeholder='0'
                        value={values.priceFrom}
                        onChange={handleChange}
                    />
                    <MyInput
                        type='number'
                        name='priceTo'
                        placeholder='1000'
                        value={values.priceTo}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <MyButton type='submit' skin='primary'>
                Поиск
            </MyButton>
        </form>
    );
};
export { Filter };
