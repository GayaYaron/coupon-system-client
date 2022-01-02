import { CouponForm } from "../../components/CouponForm";
import { connect } from "react-redux";
import { addCoupon } from "../../redux/actions/index";
import { getCouponFromForm } from "../../services/CouponService";
import { useNavigate } from 'react-router-dom';
import { useEffect } from "react";

function AddCouponComp(props) {
    useEffect(() => {
        if (props.companyCoupons.lastAct === "ADD") {
            navigate("..");
        };
    });

    const navigate = useNavigate();

    const add = (event) => {
        event.preventDefault();
        props.addCoupon(getCouponFromForm(event))
        
    };

    return (
        <div className="d-flex justify-content-center my-2">
            <CouponForm onSubmit={add} submitText="Add" sender="ADD" />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        companyCoupons: state.companyCoupons
    }
};

const mapDispatchActions = () => {
    return {
        addCoupon
    };
};

export const AddCouponPage = connect(
    mapStateToProps, mapDispatchActions()
)(AddCouponComp);