import { Coupon } from "../model/Coupon";

export const getCouponFromForm = (event) => {
    const target = event.target;
    const coupon = new Coupon(null, target.title.value, target.description.value, target.startDate.value, target.endDate.value,
        target.amount.value, target.price.value, target.image.value, { "id": target.category.value }, null);
    return coupon;
}