import { connect } from "react-redux";
import { loadCompanyCoupons, deleteCoupon } from "../../redux/actions";
import { useNavigate } from 'react-router-dom';
import { CouponView } from "../../components/CouponView";
import { useEffect } from "react";

function CompanyCoupons(props) {
    const navigate = useNavigate();
    const couponState = props.companyCoupons;
    useEffect(()=>{
        props.loadCompanyCoupons()
    },[])

    const isError = () => {
        return("SET"===couponState.error?.by);
    }

    const isLoaded = () => {
        return("SET"===couponState.lastAct);
    }

    const onEdit = (couponId) => {
        navigate("editcoupon/" + couponId);
    }

    return(
        <CouponView title="My Coupons:" coupons={couponState.coupons} error={isError()} loaded={isLoaded()} 
        load={props.loadCompanyCoupons} couponError={couponState.couponError} context="SELL" 
        buttonClick={{onEdit, "onDelete":props.deleteCoupon}} />
    );
};

const mapStateToProps = (state) => {
    return {
        companyCoupons: state.companyCoupons
    };
};

const mapDispatchActions = () => {
    return {
        loadCompanyCoupons,
        deleteCoupon
    };
};

export const CompanyCouponsPage = connect(
    mapStateToProps, mapDispatchActions()
)(CompanyCoupons);