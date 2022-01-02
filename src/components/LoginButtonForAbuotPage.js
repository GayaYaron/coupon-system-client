import {useNavigate} from "react-router-dom";

export function LoginButtonForAbuotPage(props) {

    const navigate = useNavigate();

    function onClickBtn(){
        navigate("login")
    }

    return(
        <button type="button" onClick={onClickBtn} className="btn btn-primary btn-lg btn-block">Login</button>
    )
}