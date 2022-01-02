import {getOneAdminCompany} from "../../redux/actions";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect} from "react";

function SeeCompanyDetailsPage(props) {

    const params = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        props.getOneAdminCompany(params.id);
    }, [])


    return (
        <div className={"m-lg-5"}>
            <div>
              <h1>name : {props.oneCompany?.name}</h1>
            </div>
            <div className={"mt-3"}>
                <h1>email : {props.oneCompany?.email}</h1>
            </div>
            <div className={"mt-3"}>
                <h1>password : {props.oneCompany?.password}</h1>
            </div>
            <div className={"mt-5"}>
                <button onClick={() => {navigate("../company-func")}} className={"btn btn-outline-danger"}>back</button>
            </div>
        </div>
    )
}

const mapStateToProp = (state) => {
    return {
        oneCompany : state.getOneCompany
    };
};

const mapDispatchActions = () => {
    return {
        getOneAdminCompany
    };
};


export const ConnectedCompanyDetailPage = connect(mapStateToProp, mapDispatchActions())(SeeCompanyDetailsPage);