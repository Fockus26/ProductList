export class Product {
  constructor({ name, description, price, sku, currency, pictures }) {
    this.name = name || "Basic Product";
    this.description = description || "";
    this.price = price || "0";
    this.currency = currency || "$";
    this.pricing = `${currency}: ${parseFloat(price).toFixed(2)}`;
    this.sku = sku || "";
    this.pictures = pictures?.length // Check Pictures
      ? Array.from({ length: pictures.length }, (_, index) => {
          // In that case we create an array with each element
          return typeof pictures?.[index] == "string" &&
            pictures[index].includes("https") // Check if picture is string and work in the web
            ? pictures[index] // In that case we get picture
            : typeof pictures[index] == "object" // Otherwise check if is an object
            ? pictures[index][0] ?? "/assets/card-placeholder.webp" // We get first element
            : "/assets/card-placeholder.webp"; // Si no cumple ninguna condicion agregamos la imagen
        })
      : ["/assets/card-placeholder.webp"]; // Si no hay imagenes agregamos la imagen
  }
}
