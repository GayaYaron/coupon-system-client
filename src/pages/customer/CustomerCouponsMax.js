import { connect } from "react-redux";
import { loadCusCoupMax } from "../../redux/actions";
import { useParams } from 'react-router-dom';
import { CouponView } from "../../components/CouponView";
import { useEffect } from "react";

function CustomerCouponsMaxComp(props) {
    const {max} = useParams();
    useEffect(()=>{
        load();
    },[])

    const couponState = props.customerCoupons;
    const by = "MAX-"+max;

    const load = () => {
        props.loadCusCoupMax(max);
    };

    const isError = () => {
        return(by===couponState.error?.by);
    };

    const isLoaded = () => {
        return(by===couponState.lastAct);
    };

    return(
        <CouponView title={"My Coupons Up To " + max + ":"} coupons={couponState.coupons} error={isError()} loaded={isLoaded()} 
        load={load} couponError={couponState.couponError} />
    );
};

const mapStateToProps = (state) => {
    return {
        customerCoupons : state.customerCoupons
    };
};

const mapDispatchActions = () => {
    return {
        loadCusCoupMax
    };
};

export const CustomerCouponsMax = connect(
    mapStateToProps, mapDispatchActions()
)(CustomerCouponsMaxComp);