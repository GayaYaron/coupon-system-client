import { connect } from "react-redux";
import { loadCustomerCoupons } from "../../redux/actions";
import { CouponView } from "../../components/CouponView";
import { useEffect } from "react";

function CustomerCoupons(props) {
    useEffect(()=> {
        props.loadCustomerCoupons()
    },[])
    const couponState = props.customerCoupons;

    const isError = () => {
        return("MY"===couponState.error?.by);
    }

    const isLoaded = () => {
        return("MY"===couponState.lastAct);
    }

    return(
        <CouponView title="My Coupons:" coupons={couponState.coupons} error={isError()} loaded={isLoaded()} 
        load={props.loadCustomerCoupons} couponError={couponState.couponError} />
    );
};

const mapStateToProps = (state) => {
    return {
        customerCoupons: state.customerCoupons
    };
};

const mapDispatchActions = () => {
    return {
        loadCustomerCoupons
    };
};

export const CustomerCouponsPage = connect(
    mapStateToProps, mapDispatchActions()
)(CustomerCoupons);