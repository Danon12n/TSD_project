import { TAnswer, TOrderServer, TPet } from "../types/types";
const VENDOR_API_URL = "http://62.217.180.104:5000/api/vendor";
// const VENDOR_API_URL = "http://localhost:5000/api/vendor";

export const createPet = async (pet: TPet) => {
    return await fetch(`${VENDOR_API_URL}/createPet`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...pet }),
    })
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                alert(answer.message);
                return answer.payload;
            } else return Promise.reject(answer.payload);
        });
};
export const updatePet = async (pet: TPet) => {
    return await fetch(`${VENDOR_API_URL}/updatePet`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...pet }),
    })
        .then((res) => {
            return res.json();
        })
        .then((answer: TAnswer) => {
            if (answer.success) {
                alert(answer.message);
                return answer.payload;
            } else return Promise.reject(answer.payload);
        });
};

export const getShopOrders = async (shop_id: number) => {
    return await fetch(`${VENDOR_API_URL}/getShopOrders`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ shop_id }),
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
export const getShopPets = async (shop_id: number) => {
    return await fetch(`${VENDOR_API_URL}/getShopPets`, {
        method: "post",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ shop_id }),
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

export const deletePet = async (pet_id: number) => {
    return await fetch(`${VENDOR_API_URL}/deletePet`, {
        method: "delete",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ pet_id }),
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

export const acceptOrder = async (order: TOrderServer) => {
    return await fetch(`${VENDOR_API_URL}/acceptOrder`, {
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
