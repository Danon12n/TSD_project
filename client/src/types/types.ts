import { TPetCreatorState } from "../services/reducers/pet-creator/pet-creator";
import { TPetsState } from "../services/reducers/pets/pets";
import { TUserState } from "../services/reducers/user/user";

export type TStore = {
    user: TUserState;
    pets: TPetsState;
    petCreator: TPetCreatorState;
};

export type TTableData = {
    head: string[];
    body: string[][];
    buttons?: Array<TTableButton>;
    icons?: Array<TTableIcon>;
};

export type TTableDataNew = {
    head: string[];
    rows: TTableRow[];
};

export type TTableRow = {
    data: string[];
    buttons?: Array<TTableButton>;
    icons?: Array<TTableIcon>;
};

export type TTableButton = {
    title: string;
    onClickFns: Array<() => void>;
};

export type TTableIcon = { icon: JSX.Element; onClickFns: Array<() => void> };

export type TPetCreatorMode = "Create" | "Update";

export type TUser = {
    name: string;
    surname: string;
    telephone: string;
    login: string;
    password: string;
};

export type TUserClient = {
    user_id: number;
    name: string;
    surname: string;
    telephone: string;
    login: string;
    role: "admin" | "vendor" | "customer" | "notAuthorized";
    shop_address: string;
};

export type TOrderServer = {
    pet_id: number;
    order_number: number;
};

export type TOrder = {
    userId: number;
    petId: number;
};

export type TPetType =
    | "Черепаха"
    | "Коала"
    | "Ленивец"
    | "Улитка"
    | "Ядозуб"
    | "Лори"
    | "Слизень"
    | "Морская звезда"
    | "Морской конек";
export type TPetAvailability = "yes" | "no";
export type TPetGender = "Самка" | "Самец" | "Не определен";

export type TPet = {
    pet_id: number;
    shop_id: number;
    price: number;
    available: TPetAvailability;
    pet_type: TPetType;
    name: string;
    age: number;
    color: string;
    can_swim: 0 | 1;
    reproduce_ability: 0 | 1;
    gender: TPetGender;
    pet_breed: string;
    img_url: string;
    shop_address?: string;
    shop_phone?: string;
    order_number?: number;
};

export type TShop = {
    Shop_id: number;
    adress: string;
    city: string;
    owner: string;
    telephone: string;
};

export type TAnswer = {
    success: boolean;
    payload: any;
    message: string;
};

export type TAuthData = {
    login: string;
    password: string;
};
