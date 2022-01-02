import {getOneAdminCustomer} from "../../redux/actions";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

export function SeeCustomerDetailsPage(props) {

    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        props.getOneAdminCustomer(params.id)
    }, [])

    return (
        <div className={"m-lg-5"}>
            <div>
                <h1>first-name : {props.oneCustomer?.firstName}</h1>
            </div>
            <div className={"mt-3"}>
                <h1>last-name : {props.oneCustomer?.lastName}</h1>
            </div>
            <div className={"mt-3"}>
                <h1>email : {props.oneCustomer?.email}</h1>
            </div>
            <div className={"mt-3"}>
                <h1>password : {props.oneCustomer?.password}</h1>
            </div>
            <div className={"mt-5"}>
                <button onClick={() => {navigate("../customer-func")}} className={"btn btn-outline-danger"}>back</button>
            </div>
        </div>
    )
}

const mapStateToProp = (state) => {
    return {
        oneCustomer : state.getOneCustomer
    };
};

const mapDispatchActions = () => {
    return {
        getOneAdminCustomer
    };
};


export const ConnectedCustomerDetailPage = connect(mapStateToProp, mapDispatchActions())(SeeCustomerDetailsPage);