import { ByError } from "../model/ByError";

export function ServerError(props) {
    const showMessage = () => {
        const err = props.error;
        if(err instanceof ByError) {
            return byErrorMessage(err);
        }else {
            return generalMessage(err);
        }
        
    }

    const byErrorMessage = (err) => {
        const sender = props.sender;
        if (sender !== err.by.toString()) {
            return (<div className="hidden" />);
        } else {
            return errorMessage(err.error);
        }
    }

    const generalMessage = (err) => {
        if (err === null) {
            return (<div className="hidden" />);
        } else {
            return errorMessage(err);
        }
    }

    const errorMessage = (err) => {
        if (err.response?.data.couponSystemCode) {
            return (<div className="invalid-feedback d-block">{err.response.data.message}</div>);
        } else {
            return (<div className="invalid-feedback d-block">Something went wrong</div>);
        };
    }

    return(
        showMessage()
    )
}