import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Navigation } from "../../components/vendor/navigation/navigation";
import { VendorOrders } from "../../components/vendor/vendor-orders/vendor-orders";
import { PetsCreator } from "../../components/vendor/pet-creator/pet-creator";
import { CreatedPets } from "../../components/vendor/created-pets/created-pets";

const VendorMenuPage: FC = () => {
    const { pathname } = useLocation();

    return (
        <>
            {pathname === "/vendor" && <Navigation />}
            {pathname === "/vendor/orders" && <VendorOrders />}
            {pathname === "/vendor/pets" && <CreatedPets />}
            {pathname === "/vendor/petsCreation" && <PetsCreator />}
        </>
    );
};
export { VendorMenuPage };
