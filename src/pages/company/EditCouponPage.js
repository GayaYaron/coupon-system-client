import { CouponForm } from "../../components/CouponForm";
import { connect } from "react-redux";
import { editCoupon } from "../../redux/actions/index";
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect } from "react";
import { getCouponFromForm } from "../../services/CouponService";

function EditCouponComp(props) {
    useEffect(() => {
        if (props.companyCoupons.lastAct === "EDIT") {
            navigate(-1);
        }
    });

    const {id} = useParams();

    const navigate = useNavigate();

    const initialCoupon = props.companyCoupons.coupons.find(coupon => coupon.id.toString() === id.toString());

    const edit = (event) => {
        event.preventDefault();
        let updatedCoupon = getCouponFromForm(event);
        updatedCoupon.id = initialCoupon.id;
        updatedCoupon.company = initialCoupon.company;
        console.log(updatedCoupon);
        props.editCoupon(updatedCoupon);
    };

    return (
        <div className="d-flex justify-content-center my-2">
            <CouponForm onSubmit={edit} submitText="Edit" coupon={initialCoupon} sender="EDIT" />
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
        editCoupon
    };
};

export const EditCouponPage = connect(
    mapStateToProps, mapDispatchActions()
)(EditCouponComp);