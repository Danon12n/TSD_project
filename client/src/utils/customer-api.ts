import { boundPets } from "../services/actions/pets";
import { boundUser } from "../services/actions/user";
import { TAnswer, TOrder, TOrderServer } from "../types/types";
const CUSTOMER_API_URL = "http://62.217.180.104:5000/api/customer";
// const CUSTOMER_API_URL = "http://localhost:5000/api/customer";

export const getPets = () => {
    return fetch(`${CUSTOMER_API_URL}/getPets`)
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                boundPets.setPets(answer.payload);
                return answer.payload;
            } else return Promise.reject(answer.payload);
        });
};

export const getShops = async () => {
    return await fetch(`${CUSTOMER_API_URL}/getShops`)
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                boundPets.setShops(answer.payload);
                return answer.payload;
            } else return Promise.reject(answer.payload);
        });
};

export const getCustomerOrders = async (user_id: number) => {
    const token = localStorage.getItem("token");
    return await fetch(`${CUSTOMER_API_URL}/getCustomerOrders`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ user_id }),
    })
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                return answer.payload;
            } else {
                if (answer.message === "Token Expired") {
                    alert("Token Expired. Logging out!");
                    localStorage.removeItem("token");
                    boundUser.logout();
                } else {
                    return Promise.reject(answer.payload);
                }
            }
        });
};

export const createOrder = async (order: TOrder) => {
    return await fetch(`${CUSTOMER_API_URL}/createOrder`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                return answer.payload;
            } else return Promise.reject(answer.payload);
        });
};

export const refuseOrder = async (order: TOrderServer) => {
    return await fetch(`${CUSTOMER_API_URL}/refuseOrder`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
    })
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            console.log(answer);
            if (answer.success) {
                return answer.payload;
            } else return Promise.reject(answer.payload);
        });
};
