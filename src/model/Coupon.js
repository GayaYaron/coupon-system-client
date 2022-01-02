export class Coupon {
    constructor(id, title, description, startDate, endDate, amount, price, image, category, company) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.startDate = startDate;
        this.endDate = endDate;
        this.amount = amount;
        this.price = price;
        this.image = image;
        this.category = category;
        this.company = company;
    }
}