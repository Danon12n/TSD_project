// import { userReducer } from "./user";

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: { ...action.payload },
            };
        case "SET_USERS":
            return {
                ...state,
                users: [...action.payload],
            };
        case "LOGOUT":
            return {
                ...state,
                user: {
                    user_id: 0,
                    login: "",
                    name: "",
                    surname: "",
                    telephone: "",
                    role: "notAuthorized",
                    shop_address: "null",
                },
            };

        default:
            return state;
    }
};

const initialState = {
    user: {
        user_id: 0,
        login: "",
        name: "",
        surname: "",
        telephone: "",
        role: "notAuthorized",
        shop_address: "null",
    },
    users: [],
};

const testUser = {
    name: "name",
    login: "login",
    shop_address: "addr",
    user_id: 0,
    surname: "surname",
    role: "customer",
};

describe("user reducer", () => {
    it("should return the initial state", () => {
        expect(userReducer(undefined, {})).toEqual(initialState);
    });
    it("should handle SET_USER", () => {
        expect(
            userReducer(initialState, {
                payload: testUser,
                type: "SET_USER",
            })
        ).toEqual({
            ...initialState,
            user: { ...testUser },
        });
    });
    it("should handle SET_USERS", () => {
        expect(
            userReducer(initialState, {
                payload: [testUser, testUser],
                type: "SET_USERS",
            })
        ).toEqual({
            ...initialState,
            users: [testUser, testUser],
        });
    });
    it("should handle LOGOUT", () => {
        expect(
            userReducer({ ...initialState, user: testUser }, { type: "LOGOUT" })
        ).toEqual(initialState);
    });
});
