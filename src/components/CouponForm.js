import { useEffect, useState } from "react";
import "../styles/general.css";
import { SubmitButton } from "./SubmitButton";
import { FormQuestion } from "./FormQuestion";
import { ServerError } from "./ServerError";
import { connect } from "react-redux";
import { loadCategories } from "../redux/actions";



function CouponFormComp(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [amount, setAmount] = useState(0);
    const [price, setPrice] = useState(0);
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");

    const setValue = (value) => {
        return (value ? value : "");
    }

    useEffect(() => {
        if (props.coupon) {
            let coupon = props.coupon;
            setTitle(setValue(coupon.title));
            setDescription(setValue(coupon.description));
            setStartDate(setValue(coupon.startDate));
            setEndDate(setValue(coupon.endDate));
            setAmount(setValue(coupon.amount));
            setPrice(setValue(coupon.price));
            setImage(setValue(coupon.image));
            setCategory(setValue(coupon.category?.id.toString()));
        }
    }, [props.coupon])

    const showImage = () => {
        if (image === "") {
            return (<div className="hidden" />)
        } else {
            return (
                <div className="text-center my-1">
                    <img src={image} className="img-fluid rounded" alt="chosen coupon view" />
                </div>
            );
        }
    };

    const setInputInState = (event) => {
        let name = event.target.name;
        let value = event.target.value;
        switch (name) {
            case "title":
                setTitle(value);
                break;
            case "description":
                setDescription(value);
                break;
            case "startDate":
                setStartDate(value);
                break;
            case "endDate":
                setEndDate(value);
                break;
            case "amount":
                setAmount(value);
                break;
            case "price":
                setPrice(value);
                break;
            case "image":
                setImage(value);
                break;
            case "category":
                setCategory(value);
                break;
            default:
                break;
        }
    };

    const categoryDiv = () => {
        if (props.categories.lastAct !== "SET" && props.categories.error?.by !== "SET") {
            props.loadCategories();
            return (
                <div className="text-primary">Loading categories...</div>
            );
        } else if (props.categories.error?.by === "SET") {
            return (
                <div className="text-danger">Problems loading categories, continue without or try again later</div>
            );
        } else {
            const categoryRadios = props.categories.categories.map(cat => { return ({ "name": cat.value, "value": cat.id.toString() }) });
            return (
                <FormQuestion name="category" radios={categoryRadios} onChange={setInputInState} quesType="radio" checked={category} />
            );
        }
    }

    return (
        <div className="green-shadow-lg rounded bg-light text-center col-12 col-sm-8 col-md-6">
            <form onSubmit={props.onSubmit}>
                <FormQuestion name="title" type="text" valid={true} value={title} onChange={setInputInState} quesType="input" required={true} />
                {categoryDiv()}
                <FormQuestion name="startDate" type="date" valid={true} value={startDate} onChange={setInputInState} quesType="input" />
                <FormQuestion name="endDate" type="date" valid={true} value={endDate} onChange={setInputInState} quesType="input" required={true} />
                <FormQuestion name="description" valid={true} value={description} onChange={setInputInState} quesType="textarea" />
                <FormQuestion name="amount" type="number" valid={true} value={amount} onChange={setInputInState} quesType="input" required={true} />
                <FormQuestion name="price" type="number" valid={true} value={price} onChange={setInputInState} quesType="input" />
                <FormQuestion name="image" type="text" valid={true} value={image} onChange={setInputInState} quesType="input" />
                {showImage()}
                <ServerError error={props.companyCoupons.error} sender={props.sender} />
                <SubmitButton disabled={false} text={props.submitText} />
            </form>
        </div>
    )

}

const mapStateToProps = (state) => {
    return {
        companyCoupons: state.companyCoupons,
        categories: state.categories
    };
};

const mapDispatchActions = () => {
    return {
        loadCategories
    }
}

export const CouponForm = connect(
    mapStateToProps, mapDispatchActions()
)(CouponFormComp);