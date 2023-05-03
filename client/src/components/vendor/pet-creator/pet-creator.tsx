import { FC, useEffect, useState } from "react";
import styles from "./pet-creator.module.css";
import { MyInput } from "../../ui/input/myinput";
import { MyDropMenu } from "../../ui/drop-menu/mydrop-menu";
import { MyCheckbox } from "../../ui/check-box/mycheckbox";
import { MyButton } from "../../ui/button/mybutton";
import { useSelector } from "react-redux";
import { TPetsState } from "../../../services/reducers/pets/pets";
import { TShop, TStore } from "../../../types/types";
import { TPetCreatorState } from "../../../services/reducers/pet-creator/pet-creator";
import { boundPetCreator } from "../../../services/actions/pet-creator";
import { createPet, updatePet } from "../../../utils/vendor-api";
import { Redirect } from "react-router";
import { getPets } from "../../../utils/customer-api";
interface PetsCreatorProps {}

//TODO сделать так чтобы можно было заполнить форму при обновлении
const PetsCreator: FC<PetsCreatorProps> = () => {
    const [toggleRedirect, setToggleRedirect] = useState(false);
    const [toggleGetForm, setToggleGetForm] = useState(false);
    const { shops } = useSelector<TStore, TPetsState>((store) => store.pets);

    const { pet, mode } = useSelector<TStore, TPetCreatorState>(
        (store) => store.petCreator
    );

    useEffect(() => {
        let savedForm = localStorage.getItem("petCreationForm");

        if (savedForm) {
            boundPetCreator.setPet(JSON.parse(savedForm));
        }
        setToggleGetForm(true);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (toggleGetForm) {
            localStorage.setItem("petCreationForm", JSON.stringify(pet));
        }
    }, [pet, toggleGetForm]);

    const handleSubmit: React.FormEventHandler = (e) => {
        e.preventDefault();
        if (mode === "Create") {
            console.log(pet);

            createPet({ ...pet });
        } else {
            updatePet({ ...pet })
                .then(() => {
                    getPets();
                })
                .then(() => {
                    setToggleRedirect(true);
                });
        }
    };

    const setShopId = (selected: any) => {
        const newShop = shops.find((shop) => shop.adress === selected) as TShop;

        boundPetCreator.setPetShopId(newShop.Shop_id);
    };

    if (toggleRedirect) {
        return <Redirect to='/vendor' />;
    }

    return (
        <form onSubmit={handleSubmit} className={styles.petsCreatorWrapper}>
            <p className={styles.title}>
                {mode === "Create" ? "Создание питомца" : "Обновление питомца"}
            </p>

            <div className={styles.inputsWrapper}>
                <div className={styles.leftContent}>
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
                        value={pet.pet_type}
                        changeHandler={boundPetCreator.setPetType}
                    />
                    <MyDropMenu
                        id='petGender'
                        options={["Any", "Самец", "Самка", "Не определен"]}
                        title='Пол'
                        value={pet.gender}
                        changeHandler={boundPetCreator.setPetGender}
                    />
                    <MyDropMenu
                        id='shopAddress'
                        options={[...shops.map((shop) => shop.adress)]}
                        title='Магазины'
                        value={pet.shop_address}
                        changeHandler={setShopId}
                    />
                    <MyCheckbox
                        text='Способность плавать'
                        checked={pet.can_swim === 0 ? false : true}
                        setChecked={() => {
                            boundPetCreator.setPetCanSwin(
                                pet.can_swim === 0 ? 1 : 0
                            );
                        }}
                    />
                    <MyCheckbox
                        text='Способность плодиться'
                        checked={pet.reproduce_ability === 0 ? false : true}
                        setChecked={() => {
                            boundPetCreator.setPetCanReproduce(
                                pet.reproduce_ability === 0 ? 1 : 0
                            );
                        }}
                    />
                </div>
                <div className={styles.rightContent}>
                    <>
                        <p>Имя питомца</p>
                        <MyInput
                            value={pet.name}
                            onChange={(e) => {
                                boundPetCreator.setPetName(e.target.value);
                            }}
                            placeholder='Введите породу'
                        />
                    </>
                    <>
                        <p>Порода питомца</p>
                        <MyInput
                            value={pet.pet_breed}
                            onChange={(e) => {
                                boundPetCreator.setPetBreed(e.target.value);
                            }}
                            placeholder='Введите текст'
                        />
                    </>
                    <div>
                        <p>Возраст питомца</p>
                        <MyInput
                            value={pet.age}
                            onChange={(e) => {
                                boundPetCreator.setPetAge(+e.target.value);
                            }}
                            type='number'
                            placeholder='Введите текст'
                        />
                    </div>
                    <div>
                        <p>Цвет питомца</p>
                        <MyInput
                            value={pet.color}
                            onChange={(e) => {
                                boundPetCreator.setPetColor(e.target.value);
                            }}
                            placeholder='Введите текст'
                        />
                    </div>
                    <div>
                        <p>Цена питомца</p>
                        <MyInput
                            value={pet.price}
                            onChange={(e) => {
                                boundPetCreator.setPetPrice(+e.target.value);
                            }}
                            type='number'
                            placeholder='Введите текст'
                        />
                    </div>
                    <div>
                        <p>Ссылка на изображение</p>
                        <MyInput
                            value={pet.img_url}
                            onChange={(e) => {
                                boundPetCreator.setPetImgUrl(e.target.value);
                            }}
                            type='text'
                            placeholder='Вставьте ссылку'
                        />
                    </div>
                </div>
            </div>
            <MyButton type='submit' skin='primary'>
                {mode === "Create" ? "Добавить питомца" : "Обновить питомца"}
            </MyButton>
        </form>
    );
};
export { PetsCreator };
