import "../styles/about.css"
import "../styles/general.css"
import { LoginButton } from "../components/LoginButton";
import { connect } from "react-redux";
import { useNavigate } from 'react-router-dom';

function AboutComp(props) {
    const navigate = useNavigate();

    const homeButtonClass = () => {
        let buttonClass = "btn btn-success float-start";
        let d = (props.loginInfo.info) ? "d-inline" : " d-none";
        return buttonClass+d; 
    }

    const goHome = () => {
        const path = props.loginInfo.info.clientType;
        navigate(path);
    }

    return(
        <div className="px-5 pt-5 gradient-back">
            <button className={homeButtonClass()} type="button" onClick={goHome}>Home</button>
            <LoginButton pathBack="" btnClass="btn btn-success d-inline float-end" />
            <div className="flex-grow-1 mx-5">
                <h1 className="text-center mb-2">Welcome To Coupon Application!</h1>
                <img className="rounded mx-auto d-block main_img my-5" src="../images/shopping.png" alt="woman and child going shopping cartoon"/>
                <p className="text-center">Since 2021, the website allows you to sell and buy coupons while being managed by the 
                trusted Admin</p>
            </div>
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        loginInfo: state.loginInfo
    };
};

export const AboutPage = connect(
    mapStateToProps
)(AboutComp);