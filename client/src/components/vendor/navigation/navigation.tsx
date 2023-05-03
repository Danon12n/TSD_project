import { FC } from "react";
import { Link } from "react-router-dom";
import { MyButton } from "../../ui/button/mybutton";
import styles from "./navigation.module.css";
import { boundPetCreator } from "../../../services/actions/pet-creator";

const Navigation: FC = () => {
    return (
        <div className={styles.buttonsWrapper}>
            <Link className={styles.myLink} to='/vendor/orders'>
                <MyButton skin='primary'>Проверить заказы</MyButton>
            </Link>
            <Link
                onClick={() => {
                    boundPetCreator.setPetCreatorMode("Create");
                }}
                className={styles.myLink}
                to='/vendor/petsCreation'
            >
                <MyButton skin='primary'>Добавить питомца</MyButton>
            </Link>
            <Link className={styles.myLink} to='/vendor/pets'>
                <MyButton skin='primary'>Редактировать питомцев</MyButton>
            </Link>
        </div>
    );
};
export { Navigation };
