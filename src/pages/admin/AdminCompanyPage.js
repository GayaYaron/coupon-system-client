import {useEffect} from "react";
import {connect} from "react-redux";
import {deleteAdminCompany, getAllAdminCompany} from "../../redux/actions";
import {AddCompanyButton} from "../../components/AddCompanyButton";
import {CompanyCard} from "../../components/CompanyCard";

function AdminCompanyPage(props) {

    useEffect(() => {
        props.getAllAdminCompany();
    }, [])

    const showCompanies = () => {
        let key = 0 ;
        return props.companies.map(company =>
            <div key={key++} className={"col"}>
                <CompanyCard
                    id={company.id}
                    name={company.name}
                    email={company.email}
                    password={company.password}
                    deleteCompanyCard={props.deleteAdminCompany}/>
            </div>);
    }

    return (
        <div>
            <div className="m-lg-2">
                <AddCompanyButton text="Add Company"/>
            </div>
            <div className={"row row-cols-auto g-4"}>
                {showCompanies()}
            </div>
        </div>
    )
}

const mapStateToProp = (state) => {
    return {
        companies : state.adminCompanyState,
    };
};

const mapDispatchActions = () => {
    return {
        getAllAdminCompany,
        deleteAdminCompany
    };
};


export const ConnectedAdminCompanyPage = connect(mapStateToProp, mapDispatchActions())(AdminCompanyPage);