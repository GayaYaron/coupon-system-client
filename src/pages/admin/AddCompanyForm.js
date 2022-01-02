import {FormQuestion} from "../../components/FormQuestion";
import {SubmitButton} from "../../components/SubmitButton";
import {useState} from "react";
import {addAdminCompany} from "../../redux/actions";
import {connect} from "react-redux";
import {useNavigate} from "react-router-dom";



function AddCompanyForm(props) {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")
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
        const newCompany = {
            id: null,
            name,
            email,
            password
        }

        props.companies.forEach(company => {
            if (company.email === newCompany.email){
                isEmailInDb = true;
            }
        })

        let responseEmailCheck = validator.isEmail(newCompany.email);
        if (!responseEmailCheck) {
            setError("EMAIL")
        } else if (isEmailInDb){
            setError("EMAIL-IN-DB")
        } else {
            props.addAdminCompany(newCompany)
            navigate('../../admin/company-func')
        }
    }

    return(
        <div className="green-shadow-lg rounded bg-light text-center col-4 " style={{marginLeft: "33%", marginTop: "10%"}} >
            <form onSubmit={(event) => {onSubmitForm(event)}}>
                <FormQuestion name="name" type="text" onChange={(event) => setName(event.target.value)} valid={true}  quesType="input" required={true} />
                <FormQuestion name="email" type="text" onChange={(event) => {
                    if (error !== "") {
                        setError("")
                    }
                    setEmail(event.target.value)
                }} valid={true}  quesType="input" required={true} />
                {onError()}
                <FormQuestion name="password" valid={true} onChange={(event) => setPassword(event.target.value)}  quesType="input" required={true} />
                <SubmitButton disabled={false} text="add" />
            </form>
        </div>
    )
}

const mapStateToProp = (state) => {
    return {
        companies: state.adminCompanyState,
    };
};

const mapDispatchActions = () => {
    return {
        addAdminCompany
    };
};


export const ConnectedAdminAddCompanyForm = connect(mapStateToProp, mapDispatchActions())(AddCompanyForm);