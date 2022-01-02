import { Coupon } from "../../model/Coupon";
import { authApi, generalApi } from "../../services/apiService";
import { Company } from "../../model/Company";
import { Customer } from "../../model/Customer";
import { Category } from "../../model/Category";
import { ByError } from "../../model/ByError";

export const login = (clientType, email, password) => async (dispatch) => {
    const body = {
        email,
        password
    };
    try {
        const response = await generalApi.post("login/" + clientType, body);
        dispatch(addLoginDataToState(response.data.jwtToken, response.data.id, response.data.name, response.data.expiration, clientType));
    } catch (err) {
        dispatch(loginError(err));
    }

}

export const addLoginDataToState = (clientToken, clientId, clientName, tokenExpiration, clientType) => {
    return {
        type: "LOG/IN",
        payload: {
            clientToken,
            clientId,
            clientName,
            tokenExpiration,
            clientType
        }
    }
}

export const logout = () => {
    return {
        type: "LOG/OUT",
        payload: null
    }
}

export const loginError = (error) => {
    return {
        type: "LOG/ERROR",
        payload: error
    }
}

export const loadCompanyCoupons = () => async (dispatch) => {
    try {
        const response = await authApi.get("company/coupon/all");
        const coupons = response.data.map(json => turnJsonToCoupon(json));
        dispatch(setCompanyCoupons(coupons));
    } catch (err) {
        dispatch(companyCouponsError(new ByError(err, "SET")));
    }

}

const turnJsonToCoupon = (json) => {
    return new Coupon(json.id, json.title, json.description, json.startDate, json.endDate, json.amount, json.price, json.image,
        json.category, json.company);
}

export const setCompanyCoupons = (coupons) => {
    return {
        type: "COMP-COUP/SET",
        payload: coupons
    }
}

export const companyCouponsError = (error) => {
    return {
        type: "COMP-COUP/ERR",
        payload: error
    }
}

export const addCoupon = (coupon) => async (dispatch) => {
    try {
        const response = await authApi.post("company/coupon", coupon);
        if (response.status < 300) {
            dispatch(setCompCoupAct("ADD"));
        }
    } catch (err) {
        dispatch(companyCouponsError(new ByError(err, "ADD")));
    }
}

export const setCompCoupAct = (act) => {
    return {
        type: "COMP-COUP/ACT",
        payload: act
    };
};

export const editCoupon = (coupon) => async (dispatch) => {
    try {
        const response = await authApi.put("company/coupon", coupon);
        if (response.status < 300) {
            dispatch(setCompCoupAct("EDIT"));
        }
    } catch (err) {
        dispatch(companyCouponsError(new ByError(err, "EDIT")));
    }
};

export const deleteCoupon = (couponId) => async (dispatch) => {
    try {
        const response = await authApi.delete("company/coupon", { params: { couponId } });
        if (response.status < 300) {
            dispatch(setCompCoupAct("DELETE"));
        }
    } catch (err) {
        dispatch(compCoupCouponError(new ByError(err, couponId)));
    }
}

export const compCoupCouponError = (error) => {
    return {
        type: "COMP-COUP/COUP-ERR",
        payload: error
    };
};

export const loadCategoryCompCoup = (categoryId, categoryName) => async (dispatch) => {
    const upperCategory = categoryName.toUpperCase();
    try {
        const response = await authApi.get("company/coupon/category", { params: { categoryId } });
        const coupons = response.data.map(json => turnJsonToCoupon(json));
        dispatch(setCompCategoryCoupons(coupons, upperCategory));
    } catch (err) {
        dispatch(companyCouponsError(new ByError(err, upperCategory)));
    }
};

export const setCompCategoryCoupons = (coupons, category) => {
    return {
        type: "COMP-COUP/CATEGORY",
        payload: {
            coupons,
            category
        }
    };
};

export const setCategories = (categories) => {
    return {
        type: "CATEGORY/SET",
        payload: categories
    }
}

export const categoryError = (error) => {
    return {
        type: "CATEGORY/ERROR",
        payload: error
    }
}

export const loadCategories = () => async (dispatch) => {
    try {
        const response = await generalApi.get("category/all");
        const categories = response.data.map(json => new Category(json.id, json.value));
        dispatch(setCategories(categories));
    } catch (err) {
        dispatch(categoryError(new ByError(err, "SET")));
    }
}

export const loadCompCoupMax = (maxPrice) => async (dispatch) => {
    const by = "MAX-" + maxPrice;
    try {
        const response = await authApi.get("company/coupon/price", { params: { maxPrice } });
        const coupons = response.data.map(json => turnJsonToCoupon(json));
        dispatch(setCompCategoryCoupons(coupons, by));
    } catch (err) {
        dispatch(companyCouponsError(new ByError(err, by)));
    }
}

export const addCompany = (company) => {
    return {
        type: "ADMIN/ADD-COMPANY",
        payload: company
    }
}

export const updateCompany = (company) => {
    return {
        type: "ADMIN/UPDATE-COMPANY",
        payload: company
    }
}

export const deleteCompany = (id) => {
    return {
        type: "ADMIN/DELETE-COMPANY",
        payload: id
    }
}

export const getAllCompany = (companies) => {
    return {
        type: "ADMIN/GET-All-COMPANIES",
        payload: companies
    }
}

export const getOneCompany = (company) => {
    return {
        type: "ADMIN/GET-ONE-COMPANY",
        payload: company
    }
}

export const addCustomer = (customer) => {
    return {
        type: "ADMIN/ADD-CUSTOMER",
        payload: customer
    }
}

export const updateCustomer = (customer) => {
    return {
        type: "ADMIN/UPDATE-CUSTOMER",
        payload: customer
    }
}

export const deleteCustomer = (id) => {
    return {
        type: "ADMIN/DELETE-CUSTOMER",
        payload: id
    }
}

export const getAllCustomer = (customer) => {
    return {
        type: "ADMIN/GET-ALL-CUSTOMERS",
        payload: customer
    }
}

export const getOneCustomer = (customer) => {
    return {
        type: "ADMIN/GET-ONE-CUSTOMER",
        payload: customer
    }
}

export const setCompanyName = (name, id) => {
    return {
        type: "ADMIN/COMPANY-NAME",
        payload: { name, id }
    }
}

export const setCompanyEmail = (email, id) => {
    return {
        type: "ADMIN/COMPANY-EMAIL",
        payload: { email, id }
    }
}

export const setCompanyPassword = (password, id) => {
    return {
        type: "ADMIN/COMPANY-PASSWORD",
        payload: { password, id }
    }
}

export const setCustomerFirstName = (firstName, id) => {
    return {
        type: "ADMIN/CUSTOMER-FIRST-NAME",
        payload: { firstName, id }
    }
}

export const setCustomerLastName = (lastName, id) => {
    return {
        type: "ADMIN/CUSTOMER-LAST-NAME",
        payload: { lastName, id }
    }
}

export const setCustomerEmail = (email, id) => {
    return {
        type: "ADMIN/CUSTOMER-EMAIL",
        payload: { email, id }
    }
}

export const setCustomerPassword = (password, id) => {
    return {
        type: "ADMIN/CUSTOMER-PASSWORD",
        payload: { password, id }
    }
}

export const addAdminCompany = (company) => async (dispatch) => {
    try {
        let response = await authApi.post("admin/company", company);
        let newCompany = new Company(response.data.id, company.name, company.email, company.password)
        dispatch(addCompany(newCompany))
    } catch (e) {
        console.log(e);
    }
}

export const updateAdminCompany = (company) => async (dispatch) => {
    try {
        await authApi.put("admin/company", company);
        let newCompany = new Company(company.id, company.name, company.email, company.password)
        dispatch(updateCompany(newCompany))
    } catch (e) {
        console.log(e);
    }
}

export const deleteAdminCompany = (companyId) => async (dispatch) => {
    try {
        await authApi.delete("admin/company", { params: { companyId: companyId } });
        dispatch(deleteCompany(companyId))
    } catch (e) {
        console.log(e);
    }
}

export const getAllAdminCompany = () => async (dispatch) => {
    try {
        let response = await authApi.get("admin/company/all");
        let newCompanyArray = response.data.map(company => new Company(company.id,
            company.name, company.email, company.password))
        dispatch(getAllCompany(newCompanyArray))
    } catch (e) {
        console.log(e);
    }
}

export const getOneAdminCompany = (companyId) => async (dispatch) => {
    try {
        let response = await authApi.get("admin/company/one", { params: {companyId : companyId} })
        let oneCompany = new Company(response.data.id, response.data.name, response.data.email, response.data.password)
        dispatch(getOneCompany(oneCompany));
    } catch (e) {
        console.log(e)
    }
}

export const addAdminCustomer = (customer) => async (dispatch) => {
    try {
        let response = await authApi.post("admin/customer", customer);
        let newCustomer = new Customer(response.data.id, customer.firstName, customer.lastName, customer.email, customer.password)
        dispatch(addCustomer(newCustomer))
    } catch (e) {
        console.log(e);
    }
}

export const updateAdminCustomer = (customer) => async (dispatch) => {
    try {
        await authApi.put("admin/customer", customer);
        let newCustomer = new Customer(customer.id, customer.firstName, customer.lastName, customer.email, customer.password)
        dispatch(updateCustomer(newCustomer))
    } catch (e) {
        console.log(e);
    }
}

export const deleteAdminCustomer = (customerIdParam) => async (dispatch) => {
    try {
        await authApi.delete("admin/customer", { params: { customerId: customerIdParam } });
        dispatch(deleteCustomer(customerIdParam))
    } catch (e) {
        console.log(e);
    }
}

export const getAllAdminCustomer = () => async (dispatch) => {
    try {
        let response = await authApi.get("admin/customer/all");
        let newCustomerArray = response.data.map(customer => new Customer(customer.id,
            customer.firstName, customer.lastName, customer.email, customer.password))
        dispatch(getAllCustomer(newCustomerArray))
    } catch (e) {
        console.log(e);
    }
}

export const getOneAdminCustomer = (id) => async (dispatch) => {
    try {
        let response = await authApi.get("admin/customer/one", { params: {customerId : id} });
        let newCustomer = new Customer(response.data.id, response.data.firstName, response.data.lastName,
            response.data.email, response.data.password)
        dispatch(getOneCustomer(newCustomer))
    } catch (e) {
        console.log(e)
    }
}

export const loadCustomerBuyCoupons = () => async (dispatch) => {
    try {
        const response = await authApi.get("coupon/all");
        const coupons = response.data.map(json => turnJsonToCoupon(json));
        dispatch(setCustomerBuyCoupons(coupons));
    } catch (err) {
        dispatch(customerCouponsError(new ByError(err, "ALL")))
    }
}

export const setCustomerBuyCoupons = (coupons) => {
    return {
        type: "CUS-COUP/ALL",
        payload: coupons
    }
}

export const loadCustomerCoupons = () => async (dispatch) => {
    try {
        const response = await authApi.get("customer/coupon/all");
        const coupons = response.data.map(json => turnJsonToCoupon(json));
        dispatch(setCustomerCoupons(coupons));
    } catch (err) {
        dispatch(customerCouponsError(new ByError(err, "MY")))
    }
}

export const setCustomerCoupons = (coupons) => {
    return {
        type: "CUS-COUP/MY",
        payload: coupons
    }
}

export const customerCouponsError = (error) => {
    return {
        type: "CUS-COUP/ERR",
        payload: error
    }
}

export const setCusCoupAct = (act) => {
    return {
        type: "CUS-COUP/ACT",
        payload: act
    };
};

export const cusCoupCouponError = (error) => {
    return {
        type: "CUS-COUP/COUP-ERR",
        payload: error
    };
};

export const loadCategoryCusCoup = (categoryId, categoryName) => async (dispatch) => {
    const upperCategory = categoryName.toUpperCase();
    try {
        const response = await authApi.get("customer/coupon/category", { params: { categoryId } });
        const coupons = response.data.map(json => turnJsonToCoupon(json));
        dispatch(setCategoryCusCoupons(coupons, upperCategory));
    } catch (err) {
        dispatch(customerCouponsError(new ByError(err, upperCategory)));
    }
};

export const setCategoryCusCoupons = (coupons, category) => {
    return {
        type: "CUS-COUP/CATEGORY",
        payload: {
            coupons,
            category
        }
    };
};

export const loadCusCoupMax = (maxPrice) => async (dispatch) => {
    const by = "MAX-" + maxPrice;
    try {
        const response = await authApi.get("customer/coupon/price", { params: { maxPrice } });
        const coupons = response.data.map(json => turnJsonToCoupon(json));
        dispatch(setCategoryCusCoupons(coupons, by));
    } catch (err) {
        dispatch(customerCouponsError(new ByError(err, by)));
    };
};

export const buyCoupon = (coupon) => async (dispatch) => {
    try {
        const response = await authApi.post("customer/coupon", coupon);
        if (response.status < 300) {
            dispatch(setCusCoupAct("BUY"));
        }
    } catch (err) {
        dispatch(cusCoupCouponError(new ByError(err, coupon.id)));
    }
};