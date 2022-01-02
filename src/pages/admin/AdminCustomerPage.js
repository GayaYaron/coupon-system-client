import {useEffect} from "react";
import {connect} from "react-redux";
import {deleteAdminCustomer, getAllAdminCustomer} from "../../redux/actions";
import {AddCustomerButton} from "../../components/AddCustomerButton";
import {CustomerCard} from "../../components/CustomerCard";

function AdminCustomerPage(props) {

    useEffect(() => {
        props.getAllAdminCustomer()
    }, [])

    const showCustomers = () => {
        let key = 0;
        return props.customers.map(customer =>
            <div key={key++} className={"col"}>
                <CustomerCard
                    id={customer.id}
                    firstName={customer.firstName}
                    lastName={customer.lastName}
                    email={customer.email}
                    password={customer.password}
                    deleteCard={props.deleteAdminCustomer}/>
            </div>);
    }

    return (
        <div>
            <div className="m-lg-2">
                <AddCustomerButton text="Add Customer"/>
            </div>
            <div className={"row row-cols-auto g-4"}>
                {showCustomers()}
            </div>
        </div>
    )
}

const mapStateToProp = (state) => {
    return {
        customers: state.adminCustomerState
    };
};

const mapDispatchActions = () => {
    return {
        getAllAdminCustomer,
        deleteAdminCustomer
    };
};


export const ConnectedAdminCustomerPage = connect(mapStateToProp, mapDispatchActions())(AdminCustomerPage);
