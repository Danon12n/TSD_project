import { FC } from "react";
import { useLocation } from "react-router-dom";
import { Profile } from "../../components/customer/profile/profile";
import { CustomerOrders } from "../../components/customer/customer-orders/customer-orders";

const CustomerMenuPage: FC = () => {
    const { pathname } = useLocation();

    return (
        <>
            {pathname === "/customer" && <Profile />}
            {pathname === "/customer/orders" && <CustomerOrders />}
        </>
    );
};
export { CustomerMenuPage };
