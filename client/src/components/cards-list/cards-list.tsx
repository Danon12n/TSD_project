import { FC } from "react";
import { Card } from "./card/card";
import styles from "./cards-list.module.css";
import { TPet } from "../../types/types";

interface CardsListProps {
    pets: TPet[];
}

const CardsList: FC<CardsListProps> = ({ pets }) => {
    return (
        <div className={styles.CardsListWrapper}>
            {pets.map((el, index) => {
                return <Card key={el.pet_id} pet={el} />;
            })}
        </div>
    );
};
export { CardsList };
