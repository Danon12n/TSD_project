import { FC, useEffect } from "react";
import styles from "./home-page.module.css";
import { CardsList } from "../../components/cards-list/cards-list";
import { getPets } from "../../utils/customer-api";
import { TPet, TStore } from "../../types/types";
import { useSelector } from "react-redux";
import { boundPets } from "../../services/actions/pets";
import { TPetsState } from "../../services/reducers/pets/pets";

const HomePage: FC = () => {
    const { filteredPets } = useSelector<TStore, TPetsState>(
        (store) => store.pets
    );
    useEffect(() => {
        getPets()
            .then((data: TPet[]) => {
                boundPets.setPets(data);
                boundPets.setFilteredPets(
                    data.filter((pet) => pet.available === "yes")
                );
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <div className={styles.homePageWrapper}>
            <CardsList pets={[...filteredPets]} />
        </div>
    );
};
export { HomePage };
