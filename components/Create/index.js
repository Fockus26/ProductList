export function CreateViewModel({authToken}) {
    this.sku = ko.observable('');
    this.code = ko.observable('');
    this.name = ko.observable('');
    this.description = ko.observable('');
    this.pictures = ko.observableArray([]);
    this.price = ko.observable('');
    this.currency = ko.observable('');

    // Actualizar imágenes cuando el usuario selecciona archivos
    this.actualizarImagenes = (data, event) => {
        const files = event.target.files;
        const imagesArray = Array.from(files).map(file => URL.createObjectURL(file));
        this.pictures(imagesArray);
    };

    // Función para manejar el envío del formulario
    this.enviarFormulario = () => {
        const productoData = {
            sku: this.sku(),
            code: this.code(),
            name: this.name(),
            description: this.description(),
            pictures: this.pictures(),
            price: this.price(),
            currency: this.currency()
        };

        // Aquí puedes agregar la lógica para enviar los datos
        console.log('Producto creado:', productoData);
    };
}
