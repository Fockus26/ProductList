export class Product {
    constructor({ name, description, price, sku, currency, pictures }) {
        
        this.name = name || "Basic Product";
        this.description = description || "";
        this.price = price || '0'
        this.currency = currency || '$'
        this.pricing = `${currency}: ${parseFloat(price).toFixed(2)}`;
        this.sku = sku || '';
        this.pictures = pictures?.length // Check Pictures
            ? Array.from({ length: pictures.length }, (_, index) => { // In that case we create an array with each element
                return (
                    typeof(pictures?.[index]) == "string" && pictures[index].includes("https") // Check if picture is string and work in the web
                    ? pictures[index] // In that case we get picture
                    : (typeof(pictures[index]) == "object") // Otherwise check if is an object
                    ? pictures[index][0] ?? "https://t3.ftcdn.net/jpg/02/50/33/04/360_F_250330477_Um6OZzyxn5zV1TfrMAtedCFkyKnwXqqs.jpg"  // We get first element
                    : "https://t3.ftcdn.net/jpg/02/50/33/04/360_F_250330477_Um6OZzyxn5zV1TfrMAtedCFkyKnwXqqs.jpg" // Si no cumple ninguna condicion agregamos la imagen
                )
            }) : ["https://t3.ftcdn.net/jpg/02/50/33/04/360_F_250330477_Um6OZzyxn5zV1TfrMAtedCFkyKnwXqqs.jpg"] // Si no hay imagenes agregamos la imagen
        
          
    };
}

