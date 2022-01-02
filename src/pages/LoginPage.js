import {LoginForm} from "../components/LoginForm";
import "../styles/loginPageStyle.css";
import "../styles/general.css"

export function LoginPage(props) {
    return (
        <div className='center-login gradient-back'>
            <LoginForm/>
        </div>
    )
}
