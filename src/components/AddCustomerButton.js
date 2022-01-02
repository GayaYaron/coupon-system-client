import {useNavigate} from "react-router-dom";

export function AddCustomerButton(props) {
    let navigate = useNavigate();

    const navigateToAddForm = () => {
        navigate("add-form")
    }
    return (
        <div className='mt-3'>
            <button type="submit" onClick={navigateToAddForm} className="btn btn-primary" disabled={props.disabled}>
                {props.text}</button>
        </div>
    )
}