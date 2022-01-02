import { useNavigate } from 'react-router-dom';
import { logout } from "../redux/actions/index";
import { connect } from "react-redux";

function LoginButtonComp(props) {
    const navigate = useNavigate();

    const goToLogin = () => {
        navigate(props.pathBack+"login");
    }

    const logoutClicked = () => {
        props.logout();
        goToLogin()
    }

    const loginClicked = () => {
        goToLogin();
    }

    if(props.loginInfo.info) {
        return(
            <button type="button" className={props.btnClass} onClick={logoutClicked}>Logout</button>
        );
    }else {
        return(
            <button type="button" className={props.btnClass} onClick={loginClicked}>Login</button>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.loginInfo
    };
};

const mapDispatchActions = () => {
    return {
        logout
    };
};

export const LoginButton = connect(
    mapStateToProps, mapDispatchActions()
)(LoginButtonComp);