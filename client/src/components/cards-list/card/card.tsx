import { FC } from "react";
import { MyButton } from "../../ui/button/mybutton";
import pic from "../../../img/test.jpg";
import styles from "./card.module.css";
import { TPet, TStore } from "../../../types/types";
import { createOrder, getPets } from "../../../utils/customer-api";
import { TUserState } from "../../../services/reducers/user/user";
import { useSelector } from "react-redux";
import { boundPets } from "../../../services/actions/pets";
import { TPetsState } from "../../../services/reducers/pets/pets";

interface CardProps {
    pet: TPet;
}

const Card: FC<CardProps> = ({ pet }) => {
    const { user } = useSelector<TStore, TUserState>((store) => store.user);
    const { filteredPets } = useSelector<TStore, TPetsState>(
        (store) => store.pets
    );

    const orderPet = () => {
        createOrder({ userId: user.user_id, petId: pet.pet_id }).then(() => {
            getPets().then((data: TPet[]) => {
                boundPets.setPets(data);
                let updatedFP = [...filteredPets];
                let index = updatedFP.findIndex(
                    (arrPet) => arrPet.pet_id === pet.pet_id
                );
                updatedFP.splice(index, 1);
                boundPets.setFilteredPets([...updatedFP]);
            });
        });
    };
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.cardImgWrapper}>
                <img src={pet.img_url} width={319} height={223} alt={pic} />
            </div>
            <div className={styles.cardContent}>
                <div className={styles.cardOption}>
                    <p>Тип</p> <p>{pet.pet_type}</p>
                </div>
                <div className={styles.cardOption}>
                    <p>Вид</p> <p>{pet.pet_breed}</p>
                </div>
                <div className={styles.cardOption}>
                    <p>Возраст</p> <p>{pet.age}</p>
                </div>
                <div className={styles.cardOption}>
                    <p>Пол</p> <p>{pet.gender}</p>
                </div>
                <div className={styles.cardOption}>
                    <p>Цена</p> <p>{pet.price}$</p>
                </div>
            </div>
            <MyButton
                disabled={user.role === "notAuthorized" ? true : false}
                onClick={orderPet}
                skin='primary'
            >
                Оформить заказ
            </MyButton>
        </div>
    );
};
export { Card };
