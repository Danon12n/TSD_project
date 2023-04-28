import { TPet, TPetCreatorMode } from "../../../types/types";
import { TPetCreatorActions } from "../../actions/pet-creator";

export type TPetCreatorState = {
    pet: TPet;
    mode: TPetCreatorMode;
};
const initialState = {
    pet: {
        pet_id: -1,
        shop_id: 0,
        price: 0,
        available: "no",
        pet_type: "Cat",
        name: "",
        age: 0,
        color: "",
        can_swim: 0,
        reproduce_ability: 0,
        gender: "Male",
        pet_breed: "",
    },
    mode: "Create",
};

export const petCreatorReducer = (
    state = initialState,
    action: TPetCreatorActions
) => {
    switch (action.type) {
        case "SET_PET":
            return {
                ...state,
                pet: { ...action.payload },
            };
        case "SET_PET_CREATOR_MODE":
            return {
                ...state,
                mode: action.payload,
            };
        case "SET_PET_AGE":
            return {
                ...state,
                pet: { ...state.pet, age: action.payload },
            };
        case "SET_PET_AVAILABILITY":
            return {
                ...state,
                pet: { ...state.pet, available: action.payload },
            };
        case "SET_PET_BREED":
            return {
                ...state,
                pet: { ...state.pet, pet_breed: action.payload },
            };
        case "SET_PET_CAN_REPRODUCE":
            return {
                ...state,
                pet: { ...state.pet, reproduce_ability: action.payload },
            };
        case "SET_PET_CAN_SWIM":
            return {
                ...state,
                pet: { ...state.pet, can_swim: action.payload },
            };
        case "SET_PET_COLOR":
            return {
                ...state,
                pet: { ...state.pet, color: action.payload },
            };
        case "SET_PET_GENDER":
            return {
                ...state,
                pet: { ...state.pet, gender: action.payload },
            };
        case "SET_PET_NAME":
            return {
                ...state,
                pet: { ...state.pet, name: action.payload },
            };
        case "SET_PET_PRICE":
            return {
                ...state,
                pet: { ...state.pet, price: action.payload },
            };
        case "SET_PET_SHOP_ID":
            return {
                ...state,
                pet: { ...state.pet, shop_id: action.payload },
            };
        case "SET_PET_TYPE":
            return {
                ...state,
                pet: { ...state.pet, pet_type: action.payload },
            };
        case "SET_PET_IMG_URL":
            return {
                ...state,
                pet: { ...state.pet, img_url: action.payload },
            };
        default:
            return state;
    }
};
