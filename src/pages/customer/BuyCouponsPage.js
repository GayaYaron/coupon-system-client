import { connect } from "react-redux";
import { loadCustomerBuyCoupons, buyCoupon } from "../../redux/actions";
import { CouponView } from "../../components/CouponView";
import { useEffect } from "react";

function BuyCoupons(props) {
    useEffect(()=> {
        props.loadCustomerBuyCoupons();
    },[]);

    const couponState = props.customerCoupons;

    const isError = () => {
        return("ALL"===couponState.error?.by);
    }

    const isLoaded = () => {
        return("ALL"===couponState.lastAct);
    }

    return(
        <CouponView title="Coupons:" coupons={couponState.coupons} error={isError()} loaded={isLoaded()} 
        load={props.loadCustomerBuyCoupons} couponError={couponState.couponError} context="BUY" 
        buttonClick={{"onBuy":props.buyCoupon}} />
    );
};

const mapStateToProps = (state) => {
    return {
        customerCoupons: state.customerCoupons
    };
};

const mapDispatchActions = () => {
    return {
        loadCustomerBuyCoupons,
        buyCoupon
    };
};

export const BuyCouponsPage = connect(
    mapStateToProps, mapDispatchActions()
)(BuyCoupons);