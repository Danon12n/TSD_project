import { boundUser } from "../services/actions/user";
import { TAnswer, TAuthData, TUser } from "../types/types";

const USER_API_URL = "http://62.217.180.104:5000/api/user";
// const USER_API_URL = "http://localhost:5000/api/user";

export const getUsers = () => {
    return fetch(`${USER_API_URL}/getUsers`)
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                boundUser.setUsers(answer.payload);
            } else return Promise.reject(answer.payload);
        });
};

export const deleteUser = (id: number) => {
    return fetch(`${USER_API_URL}/deleteUser`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
    })
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                alert(answer.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
export const changeRole = (id: number, role: string, address: string) => {
    return fetch(`${USER_API_URL}/changeRole`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ id, role, address }),
    })
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                alert(answer.message);
            }
        })
        .catch((error) => {
            console.log(error);
        });
};
export const register = (user: TUser) => {
    return fetch(`${USER_API_URL}/register`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    })
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                localStorage.setItem("token", answer.payload.token);
                boundUser.setUser(answer.payload);
            }
            alert(answer.message);
        });
};

export const auth = (authData: TAuthData) => {
    return fetch(`${USER_API_URL}/auth`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(authData),
    })
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                console.log(answer.payload);
                localStorage.setItem("token", answer.payload.token);
                boundUser.setUser(answer.payload);
            }
            alert(answer.message);
        });
};

export const authWithToken = () => {
    const token = localStorage.getItem("token");
    return fetch(`${USER_API_URL}/authWithToken`, {
        method: "get",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    })
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                console.log(answer.payload);
                boundUser.setUser(answer.payload);
            }
            if (answer.message === "Token Expired") {
                localStorage.removeItem("token");
            }
            alert(answer.message);
        });
};
