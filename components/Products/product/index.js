export class Product {
    constructor({ name, description, price, sku, currency, pictures }) {

        this.name = name || "Basic Product";
        this.description = description || "";
        this.price = price || '0'
        this.currency = currency || '$'
        this.pricing = `${currency}: ${parseFloat(price).toFixed(2)}`;
        this.sku = sku || '';
        this.pictures = pictures?.length // Comprueba si hay imagenes
            ? Array.from({ length: pictures.length }, (_, index) => { // En caso de habre creamos un array, con cada elemento
                return (
                    typeof(pictures?.[index]) == "string" && pictures[index].includes("https") // Comprueba si la imagen esta como texto y si esta en la web
                    ? pictures[index] // De ser asi obtenemos esa imagen
                    : (typeof(pictures[index]) == "object") // De no ser asi comprobamos si es un objeto
                    ? pictures[index][0] // Obtenemos el primer elemento de ese objeto 
                    : "https://t3.ftcdn.net/jpg/02/50/33/04/360_F_250330477_Um6OZzyxn5zV1TfrMAtedCFkyKnwXqqs.jpg" // Si no cumple ninguna condicion agregamos la imagen
                )
            }) : ["https://t3.ftcdn.net/jpg/02/50/33/04/360_F_250330477_Um6OZzyxn5zV1TfrMAtedCFkyKnwXqqs.jpg"] // Si no hay imagenes agregamos la imagen
    }
}

