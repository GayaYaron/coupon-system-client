import { authApi } from "../../services/apiService";
import { useState } from "react";
import { Customer } from "../../model/Customer";

export function CustomerDetailsPage(props) {
    const [customer, setCustomer] = useState(null);
    const [err, setErr] = useState(null);

    const setDetails = async () => {
        try{
            const result = await authApi.get("customer");
            const data = result.data;
            const customerDetail = new Customer(data.id, data.firstName, data.lastName, data.email, data.password);
            setCustomer(customerDetail);
        }catch(err) {
            setErr(err);
        }
    }

    const detailLine = (title, text) => {
        return(
            <p>
                <span className="fs-5 fw-bold">{title + ": "}</span>
                <span className="fs-5">{text}</span>
            </p>
        )
    }

    const infoDiv = () => {
        if(customer === null && err === null) {
            setDetails();
            return(
                <h3>Loading details</h3>
            );
        }else if(customer) {
            return(
                <div>
                    {detailLine("First Name", customer.firstName)}
                    {detailLine("Last Name", customer.lastName)}
                    {detailLine("Email", customer.email)}
                    {detailLine("Password", customer.password)}
                </div>
            );
        }else {
            return (
                <h3 className="text-danger">Could not load details, make sure you are logged in</h3>
            );
        }
    }

    return (
        <div className="mx-sm-2 mx-md-5 my-2">
            <h1>My Details</h1>
            {infoDiv()}
        </div>
    )
}