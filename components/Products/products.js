import { Product } from "./product"

export function ProductsViewModel({authToken}) {
    // Product Variables
    this.allProducts = ko.observableArray([])
    this.batchProducts = ko.observableArray([])
    // Pagination Variables
    this.productsPerPage = 15
    this.totalPages = ko.observable()
    this.actualPage = ko.observable(1)
    this.nextPage = ko.observable(this.actualPage() + 1)
    this.isNextPage = ko.observable(true)
    this.prevPage = ko.observable(this.actualPage() - 1)
    this.isPrevPage = ko.observable(false)
    // Banner Variables
    this.banner = {
        src:'https://www.goya.com/media/3815/argentinean-grilled-steaks-with-salsa-criolla.jpg?quality=80',
        alt: 'churrasco banner'
    }
    // Another Variables
    this.authToken = authToken
    this.isDataLoaded = ko.observable(false)

    // Cuando la url no regresa una imagen
    this.errorImg = function(data, event) {
        event.target.src = 'https://t3.ftcdn.net/jpg/02/50/33/04/360_F_250330477_Um6OZzyxn5zV1TfrMAtedCFkyKnwXqqs.jpg'
    }

    // Agrega estilos dependiendo de la paginacion
    this.updatePaginationStyles = function() {
        const $activePageLink = $(".page-item.active > .page-link");

        // Agrega 'rounded-start-5' si no hay página previa
        if (!this.isPrevPage()) {
            $activePageLink.removeClass("rounded-0");
            $activePageLink.addClass("rounded-start-2");
        } else {
            $activePageLink.addClass("rounded-0");
            $activePageLink.removeClass("rounded-start-2");
        }

        // Agrega 'rounded-end-5' si no hay página siguiente
        if (!this.isNextPage()) {
            $activePageLink.removeClass("rounded-0");
            $activePageLink.addClass("rounded-end-2");
        } else {
            $activePageLink.addClass("rounded-0");
            $activePageLink.removeClass("rounded-end-2");
        }
    };

    // Maneja la paginacion
    this.handlePagination = function(direction) {
        if (direction === 'next') {
            this.actualPage(this.actualPage() + 1)
        } else if (direction === 'prev') {
            this.actualPage(this.actualPage() - 1)
        } else {
            this.actualPage(this.actualPage() === direction ? this.actualPage() : this.actualPage() < direction ? this.actualPage() + 1 : this.actualPage() - 1)
        }
        
        this.prevPage(this.actualPage() - 1)
        this.isPrevPage(this.actualPage() > 1)
        this.nextPage(this.actualPage() + 1)
        this.isNextPage(this.actualPage() < this.totalPages())

        // Actualiza los estilos de paginación después de cambiar la página
        this.updatePaginationStyles();
    }

    this.getData = function(token) {
       
        $.ajax({
            url: "http://vps.churrasco.digital:3000/products", 
            method: "GET",
            contentType: "application/json",
            headers: {'Authorization': 'Bearer ' + token},
            success: (response) => {
                if (response) {
                    const productsMap = response.map(({ name, description, price, sku, currency, pictures }) => new Product({ name, description, price, sku, currency, pictures }))
                    // Obtengo todos los productos
                    this.allProducts(productsMap)
                    // Obtengo el total de paginas segun los productos que deben haber por pagina
                    this.totalPages(Math.ceil(this.allProducts().length / this.productsPerPage) - 1)
                    
                    // Usamos Array.from para crear los lotes de productos
                    const batches = Array.from({ length: this.totalPages() }, (_, index) => {
                        return productsMap.slice(index * this.productsPerPage, (index + 1) * this.productsPerPage);
                    });
                    
                    // Establecemos el valor de batchProducts con los lotes generados
                    this.batchProducts(batches);
                   
                } 
            },
            error: ({error}) => {
                console.log("error", error)
              
            },
            complete: () => {
                this.isDataLoaded(true)
                this.updatePaginationStyles();
            },
        });
    }

    this.getData(this.authToken())

}
