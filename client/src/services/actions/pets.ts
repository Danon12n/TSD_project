import { bindActionCreators } from "@reduxjs/toolkit";
import { TPet, TShop } from "../../types/types";
import { SET_PETS, SET_FILTERED_PETS, SET_SHOPS } from "../action-types/pets";
import { store } from "../store";

//types
export interface ISetShops {
    readonly type: typeof SET_SHOPS;
    readonly payload: TShop[];
}
export interface ISetPets {
    readonly type: typeof SET_PETS;
    readonly payload: TPet[];
}
export interface ISetFilteredPets {
    readonly type: typeof SET_FILTERED_PETS;
    readonly payload: TPet[];
}

export type TPetsAction = ISetPets | ISetFilteredPets | ISetShops;

//types

const doSetShops = (shops: TShop[]): ISetShops => ({
    type: SET_SHOPS,
    payload: shops,
});
const doSetPets = (pets: TPet[]): ISetPets => ({
    type: SET_PETS,
    payload: pets,
});
const doSetFilteredPets = (pets: TPet[]): ISetFilteredPets => ({
    type: SET_FILTERED_PETS,
    payload: pets,
});

export const boundPets = bindActionCreators(
    {
        setShops: doSetShops,
        setPets: doSetPets,
        setFilteredPets: doSetFilteredPets,
    },
    store.dispatch
);
