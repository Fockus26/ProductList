import { Product } from "./product"

export function ProductsViewModel({authToken, context}) {
    // Banner Variables
    this.banner = {
        src:'https://www.goya.com/media/3815/argentinean-grilled-steaks-with-salsa-criolla.jpg?quality=80',
        alt: 'churrasco banner'
    }

    // Cuando la url no regresa una imagen
    this.errorImg = function(data, event) {
        event.target.src = 'https://t3.ftcdn.net/jpg/02/50/33/04/360_F_250330477_Um6OZzyxn5zV1TfrMAtedCFkyKnwXqqs.jpg'
    }

    // Pagination
        // Pagination Variables
        this.productsPerPage = 15
        this.totalPages = ko.observable()
        this.actualPage = ko.observable(1)
        this.nextPage = ko.observable(this.actualPage() + 1)
        this.isNextPage = ko.observable(true)
        this.prevPage = ko.observable(this.actualPage() - 1)
        this.isPrevPage = ko.observable(false)
        this.scrollTimeout = null;
        // Agrega estilos dependiendo de la paginacion
        this.updatePaginationStyles = function() {
            const $activePageLink = $(".page-item.active > .page-link");

            // Agrega 'rounded-start-5' si no hay página previa
            if (!this.isPrevPage()) {
                $activePageLink?.removeClass("rounded-0");
                $activePageLink?.addClass("rounded-start-2");
            } else {
                $activePageLink?.addClass("rounded-0");
                $activePageLink?.removeClass("rounded-start-2");
            }

            // Agrega 'rounded-end-5' si no hay página siguiente
            if (!this.isNextPage()) {
                $activePageLink?.removeClass("rounded-0");
                $activePageLink?.addClass("rounded-end-2");
            } else {
                $activePageLink?.addClass("rounded-0");
                $activePageLink?.removeClass("rounded-end-2");
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
            this.isNextPage(this.actualPage() < this.totalPages() - 1)

            // Actualiza los estilos de paginación después de cambiar la página
            this.updatePaginationStyles();
            // Si ya existe un temporizador, cancelarlo
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            // Espera 2 segundos antes de hacer scroll hasta el contenedor de los productos
            this.scrollTimeout = setTimeout(() => {
                document.querySelector('.container').scrollIntoView({ behavior: 'smooth' });
            }, 500); 
        }

    // Sort
        // Sort Variables
        this.showOptions = ko.observable(false)
        this.options = ko.observableArray(
            [
                {type: "alphabetic", title: "Por Titulo", value: null}, 
                {type: "numeric", title: "Por Precio", value: null}
            ]
        )
        this.actualOption = ko.observable(this.options()[0].title)
        this.currencies = ko.observableArray([])
        this.showCurrencies = ko.observable(false)
        // Cambia el estilo del icono
        this.swapFilterIcon = function() {
            const $filterIcon = $(".sort button i");

            if (!this.showOptions()) {
                $filterIcon?.removeClass("bi-filter");
                $filterIcon?.addClass("bi-filter-left");
            } else {
                $filterIcon?.addClass("bi-filter");
                $filterIcon?.removeClass("bi-filter-left");
            }
        };
        this.swapSortIcon = function(title, value) {
            let option = this.options().filter((option) => option.title === title)[0]

            const $sortIcon = $(`.sort .options .option i[aria-label=${option.type}]`);

            let direction = value === 'asc' ? 'up' : 'down'
            let latestDirection = value === 'asc' ? 'down' : 'up'

            $sortIcon?.removeClass(`bi-sort-${latestDirection}`);
            $sortIcon?.addClass(`bi-sort-${direction}`);
        }
        // Maneja las opciones
        this.handleShowOptions = function() {
            this.showOptions(!this.showOptions())
            this.swapFilterIcon()
        }
        this.selectOption = function(title) {
            let option = this.options().filter((option) => option.title === title)[0]
            option.value = option.value || 'desc'
            option.value === 'asc' ? option.value = 'desc' : option.value = 'asc'

            this.groupProducts(option.type, option.value)
            this.actualOption(title)
            this.styleSelectedOption()
            this.swapSortIcon(title, option.value)
        }
        const productViewModel = this
        this.styleSelectedOption = function() {
            // Remueve la clase al anterior elemento
            $(".sort .options .option.selected").removeClass('selected');
            // Obtiene la opcion que estamos buscando
            const $selectedOption = $(".sort .options .option").filter(function() {
                return $(this).text() === productViewModel.actualOption()
            })
            // Agregamos la clase a esta opcion
            $selectedOption?.addClass('selected')
        }
        this.appContext = context
        this.goToCreate = function(data,event) {
            event.preventDefault()
            return this.appContext.redirect("#/create")
        }

    // Data
        // Product Variables
        this.allProducts = ko.observableArray([])
        this.batchProducts = ko.observableArray([])
        // Data Variables
        this.authToken = authToken
        this.isDataLoaded = ko.observable(false)
        // Usamos Array.from para crear los lotes de productos
        this.groupProducts = function(type=null, value=null) {
            let products = this.allProducts();

            [type, value] = [type || 'alphabetic', value || 'asc']

            if (type === 'alphabetic') {
                if (value === 'asc') {
                    products = products.sort((a, b) => a.name.localeCompare(b.name)); // Orden ascendente
                } else if (value === 'desc') {
                    products = products.sort((a, b) => b.name.localeCompare(a.name)); // Orden descendente
                }
            } else if (type === 'numeric') {
                if (value === 'asc') {
                    products = products.sort((a, b) => a.price - b.price); // Orden ascendente
                } else if (value === 'desc') {  
                    products = products.sort((a, b) => b.price - a.price); // Orden descendente
                }
            }
        
            // Después de ordenar, creamos los lotes de productos
            this.batchProducts(
                Array.from({ length: this.totalPages() }, (_, index) => {
                    return products.slice(index * this.productsPerPage, (index + 1) * this.productsPerPage);
                })
            );
        }
        this.getData = function(token) {
        
            $.ajax({
                url: "http://vps.churrasco.digital:3000/products", 
                method: "GET",
                contentType: "application/json",
                headers: {'Authorization': 'Bearer ' + token},
                success: (response) => {
                    if (response) {
                        // Obtengo todos los productos
                        this.allProducts(response.map(({ name, description, price, sku, currency, pictures }) => new Product({ name, description, price, sku, currency, pictures })))
                        // Obtengo el total de paginas segun los productos que deben haber por pagina
                        this.totalPages(Math.ceil(this.allProducts().length / this.productsPerPage))
                        // Obtenemos lotes de productos segun la cantidad maxima que debe haber en una pagina
                        this.groupProducts()

                        // Obtener todas las currencies de los productos
                        const allCurrencies = this.allProducts().map(product => product.currency);
                        // Eliminar duplicados usando un Set
                        this.currencies([...new Set(allCurrencies)]);
                    } 
                },
                error: ({error}) => {
                    console.log("error", error)
                
                },
                complete: () => {
                    this.isDataLoaded(true)
                    this.updatePaginationStyles();       
                    this.swapFilterIcon();      
                    this.updateCarouselIconColor(4)
                },
            });
        }

        this.getData(this.authToken())
}
