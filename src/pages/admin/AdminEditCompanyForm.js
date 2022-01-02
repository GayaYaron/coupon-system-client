import {FormQuestion} from "../../components/FormQuestion";
import {SubmitButton} from "../../components/SubmitButton";
import {
    getAllAdminCompany,
    setCompanyEmail,
    setCompanyPassword,
    updateAdminCompany
} from "../../redux/actions";
import {connect} from "react-redux";
import {useNavigate, useParams} from "react-router-dom";
import {useState} from "react";

function AdminEditCompanyForm(props) {

    const params = useParams();
    const oneCompany = props.company.find(company => company.id == params.id);
    const navigate = useNavigate();
    const [error, setError] = useState("");
    let validator = require('validator');

    const onError = () => {
        if (error === "EMAIL"){
            return <div style={{color: "red"}}>your email is not valid</div>
        } else if (error === "EMAIL-IN-DB"){
            return <div style={{color: "red"}}>email already exists</div>
        }
    }

    const onSubmit = (event) =>{
        event.preventDefault()

        let isCompanyInDb = false;

        const newCompany = {
            "id" : oneCompany.id,
            "name" : oneCompany.name,
            "email" : oneCompany.email,
            "password": oneCompany.password
        }

        props.company.forEach(company => {
            if (company.id !== newCompany.id) {
                if (company.email === newCompany.email){
                    isCompanyInDb = true;
                }
            }
        })

        let responseEmailValidator = validator.isEmail(newCompany.email);
        if (!responseEmailValidator) {
            setError("EMAIL")
        } else if (isCompanyInDb) {
            setError("EMAIL-IN-DB")
        } else {
            props.updateAdminCompany(newCompany);
            navigate('../company-func')
        }
    }

    return(
        <div className="green-shadow-lg rounded bg-light text-center col-4 " style={{marginLeft: "33%", marginTop: "10%"}} >
            <form onSubmit={onSubmit}>
                <FormQuestion name="email" type="text" value={oneCompany ? oneCompany.email : ""} onChange={(event) => {
                    event.preventDefault();
                    if (error !== "") {
                        setError("");
                    }
                    props.setCompanyEmail(event.target.value, parseInt(params.id))}}  valid={true}  quesType="input" required={true} />
                {onError()}
                <FormQuestion name="password" valid={true} value={oneCompany ? oneCompany.password : ""} onChange={
                    (event) => {
                        event.preventDefault();
                        props.setCompanyPassword(event.target.value, parseInt(params.id))}}   quesType="input" required={true} />
                <SubmitButton disabled={false} text="EDIT" />
            </form>
        </div>
    )
}

const mapStateToProp = (state) => {
    return {
        company: state.adminCompanyState,
    };
};

const mapDispatchActions = () => {
    return {
        getAllAdminCompany,
        updateAdminCompany,
        setCompanyEmail,
        setCompanyPassword
    };
};


export const ConnectedAdminEditCompanyForm = connect(mapStateToProp, mapDispatchActions())(AdminEditCompanyForm);