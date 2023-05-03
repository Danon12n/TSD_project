import { store } from "../store";
import { bindActionCreators } from "redux";
import { SET_USER, SET_USERS, LOGOUT } from "../action-types/user";
import { TUserClient } from "../../types/types";

//types

export interface ISetUser {
    readonly type: typeof SET_USER;
    readonly payload: TUserClient;
}
export interface ISetUsers {
    readonly type: typeof SET_USERS;
    readonly payload: TUserClient[];
}
export interface ILogout {
    readonly type: typeof LOGOUT;
}

export type TUserAction = ISetUser | ISetUsers | ILogout;

//types

const doSetUser = (user: TUserClient): ISetUser => ({
    type: SET_USER,
    payload: user,
});
const doSetUsers = (users: TUserClient[]): ISetUsers => ({
    type: SET_USERS,
    payload: users,
});
const doLogout = (): ILogout => ({
    type: LOGOUT,
});

export const boundUser = bindActionCreators(
    {
        setUser: doSetUser,
        setUsers: doSetUsers,
        logout: doLogout,
    },
    store.dispatch
);
