export class Product {
    constructor({ name, description, price, sku, currency, pictures }) {

        this.name = name || "Basic Product";
        this.description = description || "";
        this.price = `${currency}: ${parseFloat(price).toFixed(2)}`;
        this.sku = sku;
        this.pictures = (typeof(pictures?.[0]) == "string" && pictures[0].includes("https")) ? pictures[0] : (pictures?.[0] && typeof(pictures[0]) == "object") ? pictures[0][0] : "https://t3.ftcdn.net/jpg/02/50/33/04/360_F_250330477_Um6OZzyxn5zV1TfrMAtedCFkyKnwXqqs.jpg";
    }
}

