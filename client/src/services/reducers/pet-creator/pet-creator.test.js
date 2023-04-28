//import { petCreatorReducer } from "./pet-creator";
const petCreatorReducer = (state = initialState, action) => {
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
        default:
            return state;
    }
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

const testPet = {
    pet_id: -1,
    shop_id: 10,
    price: 22222,
    available: "no",
    pet_type: "Dog",
    name: "Valaha",
    age: 0,
    color: "Red",
    can_swim: 1,
    reproduce_ability: 0,
    gender: "Male",
    pet_breed: "breed",
};

describe("pets reducer", () => {
    it("should return the initial state", () => {
        expect(petCreatorReducer(undefined, {})).toEqual(initialState);
    });
    it("should handle SET_PET", () => {
        expect(
            petCreatorReducer(initialState, {
                payload: testPet,
                type: "SET_PET",
            })
        ).toEqual({ ...initialState, pet: { ...testPet } });
    });
    it("should handle SET_PET_TYPE", () => {
        expect(
            petCreatorReducer(initialState, {
                payload: "Raccoon",
                type: "SET_PET_TYPE",
            })
        ).toEqual({
            ...initialState,
            pet: { ...initialState.pet, pet_type: "Raccoon" },
        });
    });
    it("should handle SET_PET_CREATOR_MODE", () => {
        expect(
            petCreatorReducer(initialState, {
                payload: "Update",
                type: "SET_PET_CREATOR_MODE",
            })
        ).toEqual({ ...initialState, mode: "Update" });
    });
});
