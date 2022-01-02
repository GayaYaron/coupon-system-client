import { connect } from "react-redux";
import { loadCompCoupMax, deleteCoupon } from "../../redux/actions";
import { useNavigate, useParams } from 'react-router-dom';
import { CouponView } from "../../components/CouponView";
import { useEffect } from "react";

function MaxPriceCoupons(props) {
    const navigate = useNavigate();
    const {max} = useParams();
    useEffect(()=>{
        load();
    },[])

    const couponState = props.companyCoupons;
    const by = "MAX-"+max;

    const load = () => {
        props.loadCompCoupMax(max);
    };

    const isError = () => {
        return(by===couponState.error?.by);
    };

    const isLoaded = () => {
        return(by===couponState.lastAct);
    };

    const onEdit = (couponId) => {
        navigate("../editcoupon/" + couponId);
    };

    return(
        <CouponView title={"Coupons Up To " + max + ":"} coupons={couponState.coupons} error={isError()} loaded={isLoaded()} load={load} 
        couponError={couponState.couponError} context="SELL" buttonClick={{onEdit, "onDelete":props.deleteCoupon}} />
    );
};

const mapStateToProps = (state) => {
    return {
        companyCoupons: state.companyCoupons
    };
};

const mapDispatchActions = () => {
    return {
        loadCompCoupMax,
        deleteCoupon
    };
};

export const CompanyCouponsMax = connect(
    mapStateToProps, mapDispatchActions()
)(MaxPriceCoupons);