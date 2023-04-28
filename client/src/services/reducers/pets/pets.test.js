const petsReducer = (state = initialState, action) => {
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
const initialState = {
    pets: [],
    filteredPets: [],
    shops: [],
};

const testPet = {};

const testShop = {};

describe("pets reducer", () => {
    it("should return the initial state", () => {
        expect(petsReducer(undefined, {})).toEqual(initialState);
    });
    it("should handle SET_PETS", () => {
        expect(
            petsReducer(initialState, {
                payload: [testPet, testPet, testPet],
                type: "SET_PETS",
            })
        ).toEqual({ ...initialState, pets: [testPet, testPet, testPet] });
    });
    it("should handle SET_FILTERED_PETS", () => {
        expect(
            petsReducer(initialState, {
                payload: [testPet, testPet],
                type: "SET_FILTERED_PETS",
            })
        ).toEqual({ ...initialState, filteredPets: [testPet, testPet] });
    });
    it("should handle SET_SHOPS", () => {
        expect(
            petsReducer(initialState, {
                payload: [testShop, testShop],
                type: "SET_SHOPS",
            })
        ).toEqual({ ...initialState, shops: [testShop, testShop] });
    });
});
