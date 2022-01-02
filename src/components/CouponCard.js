import "../styles/coupon.css";
import "../styles/general.css";
import { ServerError } from "./ServerError";

export function CouponCard(props) {
    const editCoupon = () => {
        props.buttonClick.onEdit(props.coupon.id);
    }

    const deleteCoupon = () => {
        props.buttonClick.onDelete(props.coupon.id);
    }

    const buyCoupon = () => {
        props.buttonClick.onBuy(props.coupon);
    }

    const buttonDiv = () => {
        switch (props.context) {
            case "SELL":
                return (
                    <div>
                        <span>
                            <button type="button" className="btn btn-info" onClick={editCoupon}><i className="fas fa-edit"></i></button>
                        </span>
                        <span>
                            <button type="button" className="btn btn-danger delete-button" onClick={deleteCoupon}><i className="fas fa-trash-alt"></i></button>
                        </span>
                    </div>
                );
            case "BUY":
                return (
                    <div className="d-flex justify-content-center">
                        <button type="button" className="btn btn-success" onClick={buyCoupon}>BUY</button>
                    </div>
                );
            default:
                return (
                    <div />
                );
        }
    }

    return (
        <div className="card h-100 coupon-card" id={props.coupon.id+""}>
            <div className="card-body">
                {buttonDiv()}
                <ServerError error={props.error} sender={props.coupon.id + ""} />
                <p className="card-text blue-text">{props.coupon.category? props.coupon.category.value : ""}</p>
                <h5 className="card-title">{props.coupon.title + " "}</h5> 
                <p className="card-text green-text">{props.coupon.price + "$"}</p>
                <p className="card-text">{props.coupon.startDate + " - " + props.coupon.endDate}</p>
                <p className="card-text">{"coupons left: " + props.coupon.amount}</p>
                <p className="card-text">{props.coupon.description}</p>
            </div>
            <img src={props.coupon.image} alt="coupon"></img>
        </div>
    )
}