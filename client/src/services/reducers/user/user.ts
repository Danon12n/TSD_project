import { TUserClient } from "../../../types/types";
import { TUserAction } from "../../actions/user";

export type TUserState = {
    user: TUserClient;
    users: TUserClient[];
};

const initialState: TUserState = {
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

export const userReducer = (state = initialState, action: TUserAction) => {
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
