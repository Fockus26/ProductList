export class Product {
    constructor({ name, description, price, sku, currency, pictures }) {

        this.name = name || "Basic Product";
        this.description = description || "";
        this.price = `${currency}: ${parseFloat(price).toFixed(2)}`;
        this.sku = sku;
        this.pictures = pictures?.[0] || "";
    }
}