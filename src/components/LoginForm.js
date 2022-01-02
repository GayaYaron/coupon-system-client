import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { login } from "../redux/actions/index";
import "../styles/loginPageStyle.css";
import { SubmitButton } from "./SubmitButton";
import { useNavigate } from 'react-router-dom';
import { FormQuestion } from "./FormQuestion";
import { ServerError } from "./ServerError";


function LoginFormComp(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [emailStatus, setEmailStatus] = useState("");
    const [passwordStatus, setPasswordStatus] = useState("");
    const navigate = useNavigate();


    const onSubmit = (event) => {
        event.preventDefault();
        const target = event.target;
        props.login(target.userType.value, target.email.value, target.password.value);
    };

    useEffect(() => {
        if (props.loginInfo.info) {
            navigate(`/${props.loginInfo.info.clientType}`);
        }
    });

    const validateEmail = (event) => {
        const validEmailExpression = /^[a-zA-Z0-9_!#$%&'*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;
        const email = "" + event.target.value;
        let status = "";
        if (email === "" || email === null) {
            status = "null error";
        } else if (!validEmailExpression.test(String(email).toLowerCase())) {
            status = "invalid email error";
        } else {
            status = "valid";
        }
        setEmail(email)
        setEmailStatus(status);
    };

    const validatePassword = (event) => {
        const password = event.target.value;
        let status = ""
        if (password === "" || password === null) {
            status = "null error";
        } else {
            status = "valid";
        }
        setPassword(password)
        setPasswordStatus(status);
    };

    const statusIsValid = (status) => {
        return status === "" || status === "valid";
    }

    const emailError = () => {
        switch (emailStatus) {
            case "null error":
                return "You must enter an email";
            case "invalid email error":
                return "Email is invalid, please enter a valid email address";
            default:
                return null;
        }
    }

    const passwordError = () => {
        return (passwordStatus === "null error") ? "You must enter a password" : null;
    }

    return (
        <div className="login-form col-12 col-sm-8 col-md-6 col-lg-4">
            <div>
                <h1>Login</h1>
            </div>
            <form onSubmit={onSubmit}>
                <FormQuestion name="email" type="text" valid={statusIsValid(emailStatus)} placeholder="Enter email" value={email}
                    onChange={validateEmail} errorMessage={emailError()} quesType="input" />
                <FormQuestion name="password" type="password" valid={statusIsValid(passwordStatus)} placeholder="Password" value={password}
                    onChange={validatePassword} errorMessage={passwordError()} quesType="input" />
                <FormQuestion quesType="select" name="userType" options={["admin","company","customer"]} />
                <ServerError error={props.loginInfo.error} />
                <SubmitButton disabled={emailStatus !== "valid" || passwordStatus !== "valid"}
                    text="Submit" />
                <br />
            </form>
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.loginInfo
    };
};

const mapDispatchActions = () => {
    return {
        login
    };
};

export const LoginForm = connect(
    mapStateToProps, mapDispatchActions()
)(LoginFormComp);