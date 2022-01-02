import "../../styles/general.css";
import { MainMenu } from "../../components/MainMenu";
import { MainMenuItem } from "../../components/MainMenuItem";
import { connect } from "react-redux";
import { loadCategories } from "../../redux/actions";
import { Outlet, useNavigate } from 'react-router-dom';

function CompanyHomeComp(props) {
    const navigate = useNavigate();

    const getCategories = () => {
        if(props.categories.lastAct !== "SET" && props.categories.error?.by !== "SET") {
            props.loadCategories();
            return ("Loading categories...");
        }else if(props.categories.error?.by === "SET") {
            return ("Problems loading categories");
        }else {
            let catList = props.categories.categories;
            return (catList.map((cat) => {return({"address":cat.value.toLowerCase(), "text":cat.value.toUpperCase()})}));
        };
    };

    const goToMax = (event) => {
        event.preventDefault();
        const maxPrice = event.target.maxPrice.value;
        navigate("maxprice/"+maxPrice);
    }

    const menuItemList = [
        <MainMenuItem type="reg" address={"../.."} text="About" />,
        <MainMenuItem type="reg" address="" text="Home" />,
        <MainMenuItem type="reg" address="details" text="My Details" />,
        <MainMenuItem type="reg" address="addcoupon" text="Add Coupon" />,
        <MainMenuItem type="dropdown" address="." itemId="ByCategory" text="Categories" dropItemList={getCategories()} />,
        <MainMenuItem type="searchbar" searchType="number" onSubmit={goToMax} placeholder="Max price" 
        description="Coupons by max price" name="maxPrice" />
    ];

    return (
        <div>
            <MainMenu items={menuItemList} />
            <Outlet />
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        categories: state.categories
    };
};

const mapDispatchActions = () => {
    return {
        loadCategories
    };
};

export const CompanyHomePage = connect(
    mapStateToProps, mapDispatchActions()
)(CompanyHomeComp);