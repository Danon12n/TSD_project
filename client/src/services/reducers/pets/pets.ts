import { TPet, TShop } from "../../../types/types";
import { TPetsAction } from "../../actions/pets";

export type TPetsState = {
    pets: TPet[];
    filteredPets: TPet[];
    shops: TShop[];
};

const initialState: TPetsState = {
    pets: [],
    filteredPets: [],
    shops: [],
};

export const petsReducer = (state = initialState, action: TPetsAction) => {
    switch (action.type) {
        case "SET_PETS":
            return {
                ...state,
                pets: [...action.payload],
            };
        case "SET_FILTERED_PETS":
            return {
                ...state,
                filteredPets: [...action.payload],
            };
        case "SET_SHOPS":
            return {
                ...state,
                shops: [...action.payload],
            };

        default:
            return state;
    }
};
