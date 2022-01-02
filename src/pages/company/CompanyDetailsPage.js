import { authApi } from "../../services/apiService";
import { Company } from "../../model/Company";
import { useState } from "react";

export function CompanyDetailsPage(props) {
    const [company, setCompany] = useState(null);
    const [err, setErr] = useState(null);

    const setDetails = async () => {
        try{
            const result = await authApi.get("company");
            const data = result.data;
            const companyDetail = new Company(data.id, data.name, data.email, data.password);
            setCompany(companyDetail);
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
        if(company === null && err === null) {
            setDetails();
            return(
                <h3>Loading details</h3>
            );
        }else if(company) {
            return(
                <div>
                    {detailLine("Name", company.name)}
                    {detailLine("Email", company.email)}
                    {detailLine("Password", company.password)}
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
