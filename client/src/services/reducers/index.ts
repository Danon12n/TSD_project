import { combineReducers } from "redux";
import { userReducer } from "./user/user";
import { petsReducer } from "./pets/pets";
import { petCreatorReducer } from "./pet-creator/pet-creator";

export const rootReducer = combineReducers({
    user: userReducer,
    pets: petsReducer,
    petCreator: petCreatorReducer,
});
