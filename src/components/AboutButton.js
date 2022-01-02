import {useNavigate} from "react-router-dom";
import {addAdminCompany} from "../redux/actions";
import {connect} from "react-redux";

export function AboutButton(props) {

    const navigate = useNavigate();

    function onClickBtn()  {
        if (props.name === "ADMIN"){
            if (props.token.info){
                if (props.token.info.clientType === "admin"){
                    navigate("admin")
                } else {
                    alert("you are :" + props.token.info.clientType.toString())
                }
            } else {
                alert("please login")
            }
        } else if (props.name === "COMPANY"){
            if (props.token.info){
                if (props.token.info.clientType === "company"){
                        navigate("company")
                    } else {
                    alert("you are :" + props.token.info.clientType.toString())
                }
            } else {
                alert("please login")
            }
        } else if (props.name === "CUSTOMER") {
            if (props.token.info) {
                if (props.token.info.clientType === "customer") {
                    navigate("customer")
                } else {
                    alert("you are :" + props.token.info.clientType.toString())
                }
            } else {
                alert("please login")
            }
        }
    }

    function buttonColor(){
        if (props.name === "ADMIN"){
            return <button type="button" onClick={onClickBtn} className="btn btn-outline-success">{props.text}</button>
        } else if (props.name === "COMPANY"){
            return <button type="button" onClick={onClickBtn} className="btn btn-outline-danger">{props.text}</button>
        } else if (props.name === "CUSTOMER"){
            return  <button type="button" onClick={onClickBtn} className="btn btn-outline-warning">{props.text}</button>
        }
    }
    return(
        <div>
            {buttonColor()}
        </div>
    )
}

const mapStateToProp = (state) => {
    return {
        token : state.loginInfo
    };
};

const mapDispatchActions = () => {
    return {
        addAdminCompany
    };
};


export const ConnectedAdminAboutButton = connect(mapStateToProp, mapDispatchActions())(AboutButton);