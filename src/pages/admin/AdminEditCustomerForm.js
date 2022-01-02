import {FormQuestion} from "../../components/FormQuestion";
import {SubmitButton} from "../../components/SubmitButton";
import {useNavigate, useParams} from "react-router-dom";
import {
    getAllAdminCustomer,
    setCustomerEmail,
    setCustomerFirstName,
    setCustomerLastName,
    setCustomerPassword,
    updateAdminCustomer
} from "../../redux/actions";
import {connect} from "react-redux";
import {useState} from "react";

function AdminEditCustomerForm(props) {

    let params = useParams();
    const navigate = useNavigate();
    let oneCustomer = props.customer.find(customer => customer.id == params.id);
    let validator = require('validator');
    const [error, setError] = useState("");

    const onError = () => {
        if (error === "EMAIL"){
            return <div style={{color: "red"}}>your email is not valid</div>
        } else if (error === "EMAIL-IN-DB"){
            return <div style={{color: "red"}}>email already exists</div>
        }
    }

    const onSubmit = (event) => {
        event.preventDefault()
        let isEmailInDb = false;
        const editedCustomer = {
            "id" : oneCustomer.id,
            "firstName": oneCustomer.firstName,
            "lastName": oneCustomer.lastName,
            "email" : oneCustomer.email,
            "password": oneCustomer.password
        }

        props.customer.forEach(customer => {
            if (customer.id !== editedCustomer.id) {
                if (customer.email === editedCustomer.email) {
                    isEmailInDb = true;
                }
            }
        })

        let responseEmailValidator = validator.isEmail(editedCustomer.email);
        if (!responseEmailValidator){
            setError("EMAIL")
        } else if (isEmailInDb){
            setError("EMAIL-IN-DB")
        } else {
            props.updateAdminCustomer(editedCustomer);
            navigate("../customer-func");
        }
    }

    return(
        <div className="green-shadow-lg rounded bg-light text-center col-4 " style={{marginLeft: "33%", marginTop: "10%"}} >
            <form onSubmit={onSubmit}>
                <FormQuestion name="first name" type="text" value={oneCustomer ? oneCustomer.firstName : ""} onChange={(event) => {
                    event.preventDefault();
                    props.setCustomerFirstName(event.target.value, parseInt(params.id))}}  valid={true}  quesType="input" required={true} />
                <FormQuestion name="last name name" type="text" value={oneCustomer ? oneCustomer.lastName : ""} onChange={(event) => {
                    event.preventDefault();
                    props.setCustomerLastName(event.target.value, parseInt(params.id))}}  valid={true}  quesType="input" required={true} />
                <FormQuestion name="email" type="text" value={oneCustomer ? oneCustomer.email : ""} onChange={(event) => {
                    event.preventDefault();
                    if (error !== ""){
                        setError("")
                    }
                    props.setCustomerEmail(event.target.value, parseInt(params.id))}}  valid={true}  quesType="input" required={true} />
                {onError()}
                <FormQuestion name="password" valid={true} value={oneCustomer ? oneCustomer.password : ""} onChange={
                    (event) => {
                        event.preventDefault();
                        props.setCustomerPassword(event.target.value, parseInt(params.id))}}   quesType="input" required={true} />
                <SubmitButton disabled={false} text="EDIT" />
            </form>
        </div>
    )
}

const mapStateToProp = (state) => {
    return {
        customer: state.adminCustomerState,
    };
};

const mapDispatchActions = () => {
    return {
        getAllAdminCustomer,
        updateAdminCustomer,
        setCustomerFirstName,
        setCustomerLastName,
        setCustomerEmail,
        setCustomerPassword

    };
};


export const ConnectedAdminEditCustomerForm = connect(mapStateToProp, mapDispatchActions())(AdminEditCustomerForm);