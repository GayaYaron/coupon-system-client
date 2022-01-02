import { LoginPage } from './pages/LoginPage';
import { AdminDefaultPage } from "./pages/admin/AdminDefaultPage";
import {Route, Routes, useNavigate} from "react-router-dom";
import { CompanyHomePage } from './pages/company/CompanyHomePage';
import { AddCouponPage } from './pages/company/AddCouponPage';
import { EditCouponPage } from './pages/company/EditCouponPage';
import { CompanyDetailsPage } from './pages/company/CompanyDetailsPage';
import { ConnectedAdminCompanyPage } from "./pages/admin/AdminCompanyPage";
import { ConnectedAdminCustomerPage } from "./pages/admin/AdminCustomerPage";
import { ConnectedAdminAddCustomerForm } from "./pages/admin/AddCustomerForm";
import { ConnectedAdminAddCompanyForm } from "./pages/admin/AddCompanyForm";
import { ConnectedAdminEditCompanyForm } from "./pages/admin/AdminEditCompanyForm";
import { CompanyCouponsPage } from './pages/company/CompanyCouponsPage';
import { CategoryCompanyCoupons } from './pages/company/CategoryCompanyCoupons';
import { CategoryCustomerCoupons } from './pages/customer/CategoryCustomerCoupons';
import { CompanyCouponsMax } from './pages/company/CompanyCouponsMax';
import { CustomerHomePage } from './pages/customer/CustomerHomePage';
import { CustomerDetailsPage } from './pages/customer/CustomerDetailsPage';
import {ConnectedAdminEditCustomerForm} from "./pages/admin/AdminEditCustomerForm";
import jwt from "jsonwebtoken";
import { BuyCouponsPage } from './pages/customer/BuyCouponsPage';
import { connect } from "react-redux";
import {useEffect} from "react";
import {logout} from "./redux/actions";
import {AdminHomePage} from "./pages/admin/AdminHomePage";
import { CustomerCouponsPage } from './pages/customer/CustomerCouponsPage';
import {AboutPage} from "./pages/About";
import {ConnectedCompanyDetailPage} from "./pages/admin/SeeCompanyDetailsPage";
import {ConnectedCustomerDetailPage} from "./pages/admin/SeeCustomerDetailsPage";
import { CustomerCouponsMax } from './pages/customer/CustomerCouponsMax';
import {NotFound} from "./pages/NotFound";

function App(props) {

    const history = useNavigate();
    const secretKey = "dfjbv87yfni4rht8hvfhb8r7eyehrdljfcnvbefjhisfhuisfuehghbgruonjv";

    useEffect(() => {
        if (props.token.info !== null) {
            jwt.verify(props.token.info.clientToken,
                secretKey , (err, decode) => {
                    if (err) {
                        if (err.message === "jwt expired"){
                            alert("Login expired Please login");
                            props.logout();
                            history("login");
                        } else {
                            alert("Something go wrong please login again")
                            props.logout();
                            history("login");
                        }
                    } else {
                        if ((decode.exp * 1000) < Date.now()) {
                            alert("Login expired Please login")
                            props.logout();
                            history("login");
                        }
                    }
                })
        }
    })
    
    return (
        <div className='App'>
            <Routes>
                <Route path={"/"} element={<AboutPage />}/>
                <Route path="login" element={<LoginPage />} />
                <Route path="admin" element={<AdminDefaultPage />}>
                    <Route path="" element={<AdminHomePage />} />
                    <Route path="company-func/detail/:id" element={<ConnectedCompanyDetailPage />} />
                    <Route path="customer-func/detail/:id" element={<ConnectedCustomerDetailPage />} />
                    <Route path="company-func" element={<ConnectedAdminCompanyPage />} />
                    <Route path="company-func/:id" element={<ConnectedAdminEditCompanyForm />} />
                    <Route path="customer-func/:id" element={<ConnectedAdminEditCustomerForm />} />
                    <Route path="customer-func" element={<ConnectedAdminCustomerPage />} />
                    <Route path="customer-func/add-form" element={<ConnectedAdminAddCustomerForm />} />
                    <Route path="company-func/add-form" element={<ConnectedAdminAddCompanyForm />} />
                </Route>

                <Route path="company" element={<CompanyHomePage />}>
                    <Route path="" element={<CompanyCouponsPage />} />
                    <Route path="addcoupon" element={<AddCouponPage />} />
                    <Route path="editcoupon/:id" element={<EditCouponPage />} />
                    <Route path="details" element={<CompanyDetailsPage />} />
                    <Route path=":category" element={<CategoryCompanyCoupons />} />
                    <Route path="maxprice/:max" element={<CompanyCouponsMax />} />
                </Route>

                <Route path="customer" element={<CustomerHomePage />}>
                    <Route path="" element={<BuyCouponsPage />} />
                    <Route path="details" element={<CustomerDetailsPage />} />
                    <Route path="coupons" element={<CustomerCouponsPage />} />
                    <Route path=":category" element={<CategoryCustomerCoupons />} />
                    <Route path="maxprice/:max" element={<CustomerCouponsMax />} />
                </Route>
                <Route path="*" element={<NotFound/>} />
            </Routes>
        </div>
    );
}

const mapStateToProp = (state) => {
    return {
        token : state.loginInfo
    };
};

const mapDispatchActions = () => {
    return {
        logout
    };
};

export const ConnectedApp = connect(mapStateToProp, mapDispatchActions())(App);

export default App;
