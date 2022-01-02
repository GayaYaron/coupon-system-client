import {combineReducers} from "redux";

const loginReducer = (currentState = {info: null, error: null}, action) => {
    const state = {...currentState, error: null};
    switch (action.type) {
        case "LOG/IN":
            return {...state, info: action.payload};
        case "LOG/OUT":
            return {...state, info: null};
        case "LOG/ERROR":
            return {...state, error: action.payload};
        default:
            return currentState;
    }
}

const categoriesReducer = (currentState = {categories: [], error: null, lastAct: ""}, action) => {
    const state = {...currentState, error: null};
    switch (action.type) {
        case "CATEGORY/SET":
            return {...state, categories: action.payload, lastAct: "SET"};
        default:
            return currentState;
    }
}

const companyCouponsReducer = (currentState = {coupons: [], error: null, lastAct: "", couponError: null}, action) => {
    const state = {...currentState, error: null, couponError: null};
    switch (action.type) {
        case "COMP-COUP/SET":
            return {...state, coupons: action.payload, lastAct: "SET"};
        case "COMP-COUP/CATEGORY":
            return {...state, coupons: action.payload.coupons, lastAct: action.payload.category}
        case "COMP-COUP/ERR":
            return {...state, error: action.payload};
        case "COMP-COUP/ACT":
            return {...state, lastAct: action.payload};
        case "COMP-COUP/COUP-ERR":
            return {...state, couponError: action.payload};
        default:
            return currentState;
    }
}

const adminCompanyReducer = (currentState = [], action) => {
    switch (action.type) {
        case "ADMIN/GET-All-COMPANIES":
            return action.payload
        case "ADMIN/ADD-COMPANY":
            return [...currentState, action.payload]
        case "ADMIN/DELETE-COMPANY":
            let index = currentState.findIndex(company => company.id === action.payload);
            let newCompanyArray = [...currentState];
            newCompanyArray.splice(index, 1);
            return newCompanyArray
        case "ADMIN/UPDATE-COMPANY":
            let editedCompany = currentState.find(x => x.id === action.payload.id);
            Object.assign(editedCompany, action.payload);
            return [...currentState];
        case "ADMIN/COMPANY-NAME":
            let companyName = currentState.find(x => x.id === action.payload.id);
            companyName.name = action.payload.name;
            return [...currentState];
        case "ADMIN/COMPANY-PASSWORD":
            let companyPassword = currentState.find(x => x.id === action.payload.id);
            companyPassword.password = action.payload.password;
            return [...currentState];
        case "ADMIN/COMPANY-EMAIL":
            let companyEmail = currentState.find(x => x.id === action.payload.id);
            companyEmail.email = action.payload.email;
            return [...currentState];
        default:
            return [...currentState]
    }
}

const adminCustomerReducer = (currentState = [], action) => {
    switch (action.type) {
        case "ADMIN/GET-ALL-CUSTOMERS":
            return action.payload
        case "ADMIN/ADD-CUSTOMER":
            return [...currentState, action.payload]
        case "ADMIN/DELETE-CUSTOMER":
            let index = currentState.findIndex(customer => customer.id === action.payload);
            let newCustomerArray = [...currentState];
            newCustomerArray.splice(index, 1);
            return newCustomerArray
        case "ADMIN/UPDATE-CUSTOMER":
            let editedCompany = currentState.find(x => x.id === action.payload.id);
            Object.assign(editedCompany, action.payload);
            return [...currentState];
        case "ADMIN/CUSTOMER-FIRST-NAME":
            let customerFirstName = currentState.find(x => x.id === action.payload.id);
            customerFirstName.firstName = action.payload.firstName;
            return [...currentState];
        case "ADMIN/CUSTOMER-LAST-NAME":
            let customerLastName = currentState.find(x => x.id === action.payload.id);
            customerLastName.lastName = action.payload.lastName;
            return [...currentState];
        case "ADMIN/CUSTOMER-EMAIL":
            let customerEmail = currentState.find(x => x.id === action.payload.id);
            customerEmail.email = action.payload.email;
            return [...currentState];
        case "ADMIN/CUSTOMER-PASSWORD":
            let customerPassword = currentState.find(x => x.id === action.payload.id);
            customerPassword.password = action.payload.password;
            return [...currentState];
        default:
            return [...currentState]
    }
}

const customerCouponsReducer = (currentState = {coupons: [], error: null, lastAct: "", couponError: null}, action) => {
    const state = {...currentState, error: null, couponError: null};
    switch (action.type) {
        case "CUS-COUP/ALL":
            return {...state, coupons: action.payload, lastAct: "ALL"};
        case "CUS-COUP/MY":
            return {...state, coupons: action.payload, lastAct: "MY"};
        case "CUS-COUP/CATEGORY":
            return {...state, coupons: action.payload.coupons, lastAct: action.payload.category}
        case "CUS-COUP/ERR":
            return {...state, error: action.payload};
        case "CUS-COUP/ACT":
            return {...state, lastAct: action.payload};
        case "CUS-COUP/COUP-ERR":
            return {...state, couponError: action.payload};
        default:
            return currentState;
    }
}

const oneCompany = (currentState = null, action) => {
    switch (action.type) {
        case "ADMIN/GET-ONE-COMPANY" :
            currentState = action.payload;
            return currentState;
        default :
            return currentState;
    }
}

const oneCustomer = (currentState = null, action) => {
    switch (action.type) {
        case "ADMIN/GET-ONE-CUSTOMER" :
            currentState = action.payload;
            return currentState
        default :
            return currentState;
    }
}

export default combineReducers({
    loginInfo: loginReducer,
    companyCoupons: companyCouponsReducer,
    adminCompanyState: adminCompanyReducer,
    adminCustomerState: adminCustomerReducer,
    categories: categoriesReducer,
    customerCoupons: customerCouponsReducer,
    getOneCustomer: oneCustomer,
    getOneCompany: oneCompany
});