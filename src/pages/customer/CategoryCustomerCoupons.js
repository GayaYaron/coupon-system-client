import { connect } from "react-redux";
import { loadCategoryCusCoup } from "../../redux/actions";
import { useParams } from 'react-router-dom';
import { CouponView } from "../../components/CouponView";
import { useEffect } from "react";

function CategoryCustomerCouponsComp(props) {
    const {category} = useParams();
    useEffect(()=>{
        load()
    },[])

    const upperCat = category.toUpperCase();
    const couponState = props.customerCoupons;

    const load = () => {
        const catWithId = props.categories.categories.find((cat) => {return(cat.value === upperCat)});
        props.loadCategoryCusCoup(catWithId.id, upperCat);
    }

    const isError = () => {
        return(upperCat===couponState.error?.by);
    };

    const isLoaded = () => {
        return(upperCat===couponState.lastAct);
    };

    return(
        <CouponView title={"My " + upperCat + ":"} coupons={couponState.coupons} error={isError()} loaded={isLoaded()} load={load} 
        couponError={couponState.couponError} />
    );
};

const mapStateToProps = (state) => {
    return {
        customerCoupons: state.customerCoupons,
        categories: state.categories
    };
};

const mapDispatchActions = () => {
    return {
        loadCategoryCusCoup
    };
};

export const CategoryCustomerCoupons = connect(
    mapStateToProps, mapDispatchActions()
)(CategoryCustomerCouponsComp);