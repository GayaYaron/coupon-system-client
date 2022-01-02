import {MainMenuItem} from "../../components/MainMenuItem";
import {MainMenu} from "../../components/MainMenu";
import {Outlet} from "react-router-dom";

export function AdminDefaultPage(props) {
    const menuItemList = [
        <MainMenuItem type="reg" address={"../.."} text="About"/>,
        <MainMenuItem type="reg" address="" text="Home"/>,
        <MainMenuItem type="reg" address="company-func" text="Companies"/>,
        <MainMenuItem type="reg" address="customer-func" text="Customers"/>,
    ];

    return (
        <div>
            <div>
                <MainMenu items={menuItemList}/>
                <Outlet/>
            </div>
        </div>
    );
}