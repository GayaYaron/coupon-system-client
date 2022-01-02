import {FormQuestion} from "../../components/FormQuestion";
import {SubmitButton} from "../../components/SubmitButton";
import {useState} from "react";
import {addAdminCustomer, getAllAdminCustomer} from "../../redux/actions";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";

function AddCustomerForm(props) {

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    let validator = require('validator');

    const navigate = useNavigate();

    const onError = () => {
        if (error === "EMAIL"){
            return <div style={{color: "red"}}>your email is not valid</div>
        } else if (error === "EMAIL-IN-DB"){
            return <div style={{color: "red"}}>email already exists</div>
        }
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        let isEmailInDb = false;

        const newCustomer = {
            id: null,
            firstName,
            lastName,
            email,
            password
        }

        props.customers.forEach(customer => {
            if (customer.email === newCustomer.email){
                isEmailInDb = true;
            }
        })

        let responseEmailValidation = validator.isEmail(newCustomer.email)
        if (!responseEmailValidation) {
            setError("EMAIL")
        } else if (isEmailInDb) {
            setError("EMAIL-IN-DB")
        } else {
            props.addAdminCustomer(newCustomer)
            navigate('../../admin/customer-func')
        }
    }

    return(
        <div className="green-shadow-lg rounded bg-light text-center col-4 " style={{marginLeft: "33%", marginTop: "10%"}} >
            <form onSubmit={(event) => {onSubmitForm(event)}}>
                <FormQuestion name="first name" type="text" onChange={(event) => setFirstName(event.target.value)} valid={true}  quesType="input" required={true} />
                <FormQuestion name="last name" type="text" onChange={(event) => setLastName(event.target.value)} valid={true}  quesType="input" required={true} />
                <FormQuestion name="email" type="text" onChange={(event) => {
                    if (error !== ""){
                        setError("");
                    }
                    setEmail(event.target.value)}
                } valid={true}  quesType="input" required={true} />
                {onError()}
                <FormQuestion name="password" valid={true} onChange={(event) => setPassword(event.target.value)}  quesType="input" required={true} />
                <SubmitButton disabled={false} text="add" />
            </form>
        </div>
    )
}

const mapStateToProp = (state) => {
    return {
        customers: state.adminCustomerState,
    };
};

const mapDispatchActions = () => {
    return {
        addAdminCustomer
    };
};


export const ConnectedAdminAddCustomerForm = connect(mapStateToProp, mapDispatchActions())(AddCustomerForm);