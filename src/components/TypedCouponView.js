import { useParams } from 'react-router-dom';
import { CouponView } from "./CouponView";
import { useEffect } from 'react';
import { connect } from "react-redux";

function TypedCouponComp(props) {
    const { category } = useParams;
    const { max } = useParams;

    var by = props.by;
    var load = () => { props.load() };
    var title = "Coupons:"
    const couponState = props.couponState;

    useEffect(() => {
        if ("CATEGORY" === props.type) {
            by = category.toUpperCase();
            const catWithId = props.categories.categories.find((cat) => { return (cat.value === by) });
            props.load(catWithId.id, by);
            title = by + " Coupons:";
        } else if ("MAX" === props.type) {
            by = "MAX-" + max;
            props.load(by);
            title = "Coupons up to " + max;
        }
    }, []);

    const isError = () => {
        return(by===couponState.error?.by);
    };

    const isLoaded = () => {
        return(by===couponState.lastAct);
    };

    return(
        <CouponView title={title} coupons={couponState.coupons} error={isError()} loaded={isLoaded()} load={load} 
        couponError={couponState.couponError} context={props.context} buttonClick={props.buttonClick} />
    );

}

const mapStateToProps = (state) => {
    return{
        categories : state.categories
    }
}

export const TypedCouponView = connect(
    mapStateToProps
)(TypedCouponComp);