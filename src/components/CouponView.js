import { CouponCard } from "./CouponCard";

export function CouponView(props) {
    const showCoupons = () => {
        if(props.error) {
            return (
                <h3 className="text-danger">Could not load coupons, make sure you are logged in</h3>
            );
        } else if(!props.loaded) {
            props.load();
            return (
                <h3>Loading coupons...</h3>
            );
        }else {
            return (
                <div className="row row-cols-auto g-4">
                    {mapCoupons()}
                </div>
            );
        };
    };

    const mapCoupons = () => {
        const coupons = props.coupons;
        if (coupons.length === 0) {
            return (
                <div />
            );
        } else {
            const divs = coupons.map((coupon) =>
                <div key={coupon.id} className="col">
                    <CouponCard coupon={coupon} context={props.context} buttonClick={props.buttonClick} error={props.couponError} />
                </div>);
            return (
                divs
            );
        };
    };

    return(
        <div className="mx-sm-2 mx-md-5 my-2">
            <h1>{props.title}</h1>
            {showCoupons()}
        </div>
    )
}