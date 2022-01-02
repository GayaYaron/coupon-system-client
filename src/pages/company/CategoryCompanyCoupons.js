import { connect } from "react-redux";
import { loadCategoryCompCoup, deleteCoupon } from "../../redux/actions";
import { useNavigate, useParams } from 'react-router-dom';
import { CouponView } from "../../components/CouponView";
import { useEffect } from "react";

function CategoryCoupons(props) {
    const navigate = useNavigate();
    const {category} = useParams();
    useEffect(()=>{
        load();
    },[])

    const upperCat = category.toUpperCase();
    const couponState = props.companyCoupons;

    const load = () => {
        const catWithId = props.categories.categories.find((cat) => {return(cat.value === upperCat)});
        props.loadCategoryCompCoup(catWithId.id, upperCat);
    }

    const isError = () => {
        return(upperCat===couponState.error?.by);
    };

    const isLoaded = () => {
        return(upperCat===couponState.lastAct);
    };

    const onEdit = (couponId) => {
        navigate("../editcoupon/" + couponId);
    };

    return(
        <CouponView title={upperCat + ":"} coupons={couponState.coupons} error={isError()} loaded={isLoaded()} load={load} 
        couponError={couponState.couponError} context="SELL" buttonClick={{onEdit, "onDelete":props.deleteCoupon}} />
    );
};

const mapStateToProps = (state) => {
    return {
        companyCoupons: state.companyCoupons,
        categories: state.categories
    };
};

const mapDispatchActions = () => {
    return {
        loadCategoryCompCoup,
        deleteCoupon
    };
};

export const CategoryCompanyCoupons = connect(
    mapStateToProps, mapDispatchActions()
)(CategoryCoupons);