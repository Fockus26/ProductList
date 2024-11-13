import { Product } from "./product"

export function ProductsViewModel({authToken, context}) {

    const self = this

    // Banner Variables
    self.banner = {
        src: 'https://www.goya.com/media/3815/argentinean-grilled-steaks-with-salsa-criolla.jpg?quality=80',
        alt: 'churrasco banner'
    }

    // When the URL does not return an image
    self.errorImg = function(_, event) {
        event.target.src = 'https://t3.ftcdn.net/jpg/02/50/33/04/360_F_250330477_Um6OZzyxn5zV1TfrMAtedCFkyKnwXqqs.jpg'
    }

    // Pagination
        // Pagination Variables
        self.productsPerPage = 15
        self.totalPages = ko.observable()
        self.actualPage = ko.observable(1)
        self.nextPage = ko.observable(self.actualPage() + 1)
        self.isNextPage = ko.observable(self)
        self.prevPage = ko.observable(self.actualPage() - 1)
        self.isPrevPage = ko.observable(self.actualPage() > 1)
        self.scrollTimeout = null;
        // Adds styles based on pagination
        self.updatePaginationStyles = function() {
            const $activePageLink = $(".page-item.active > .page-link");

            // Adds 'rounded-start-5' if there's no previous page
            if (!self.isPrevPage()) {
                $activePageLink?.removeClass("rounded-0");
                $activePageLink?.addClass("rounded-start-2");
            } else {
                $activePageLink?.addClass("rounded-0");
                $activePageLink?.removeClass("rounded-start-2");
            }

            // Adds 'rounded-end-5' if there's no next page
            if (!self.isNextPage()) {
                $activePageLink?.removeClass("rounded-0");
                $activePageLink?.addClass("rounded-end-2");
            } else {
                $activePageLink?.addClass("rounded-0");
                $activePageLink?.removeClass("rounded-end-2");
            }
        };
        // Handles pagination
        this.handlePagination = function(direction) {
            if (direction === 'next') {
                self.actualPage(this.actualPage() + 1)
            } else if (direction === 'prev') {
                self.actualPage(self.actualPage() - 1)
            } else {
                self.actualPage(self.actualPage() === direction ? self.actualPage() : self.actualPage() < direction ? self.actualPage() + 1 : self.actualPage() - 1)
            }
            
            self.prevPage(self.actualPage() - 1)
            self.isPrevPage(self.actualPage() > 1)
            self.nextPage(self.actualPage() + 1)
            self.isNextPage(self.actualPage() < self.totalPages() - 1)

            // Updates pagination styles after changing the page
            this.updatePaginationStyles();
            // Cancel timeout
            if (this.scrollTimeout) {
                clearTimeout(this.scrollTimeout);
            }
            // Wait 2 seconds
            this.scrollTimeout = setTimeout(() => {
                $(".container")[0].scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }, 500); 
        }

    // Sort
        // Sort Variables
        self.showOptions = ko.observable(false)
        self.options = ko.observableArray(
            [
                {type: "alphabetic", title: "By Name", value: null}, 
                {type: "numeric", title: "By Price", value: null}
            ]
        )
        self.actualOption = ko.observable(self.options()[0].title)
        self.currencies = ko.observableArray([])
        self.showCurrencies = ko.observable(false)
        // Changes the style of the icon
        self.swapFilterIcon = function() {
            const $filterIcon = $(".sort button i");

            if (!self.showOptions()) {
                $filterIcon?.removeClass("bi-filter");
                $filterIcon?.addClass("bi-filter-left");
            } else {
                $filterIcon?.addClass("bi-filter");
                $filterIcon?.removeClass("bi-filter-left");
            }
        };
        self.swapSortIcon = function(title, value) {
            let option = self.options().filter((option) => option.title === title)[0]

            const $sortIcon = $(`.sort .options .option i[aria-label=${option.type}]`);

            let direction = value === 'asc' ? 'up' : 'down'
            let latestDirection = value === 'asc' ? 'down' : 'up'

            $sortIcon?.removeClass(`bi-sort-${latestDirection}`);
            $sortIcon?.addClass(`bi-sort-${direction}`);
        }
        // Handles the options
        self.handleShowOptions = function(data, event) {
            self.showOptions(!self.showOptions())
            self.swapFilterIcon()
            
        }
        self.selectOption = function(title) {
            let option = self.options().filter((option) => option.title === title)[0]
            option.value = option.value || 'desc'
            option.value === 'asc' ? option.value = 'desc' : option.value = 'asc'

            self.groupProducts(option.type, option.value)
            self.actualOption(title)
            self.styleSelectedOption()
            self.swapSortIcon(title, option.value)
        }
      
        self.styleSelectedOption = function() {
            // Removes the class from the previous element
            $(".sort .options .option.selected").removeClass('selected');
            // Gets the option we're looking for
            const $selectedOption = $(".sort .options .option").filter(function() {
                return $(this).text() === self.actualOption()
            })
            // Adds the class to this option
            $selectedOption?.addClass('selected')
        }
        self.appContext = context
        self.goToCreate = function(_, event) {
            event.preventDefault()
            return self.appContext.redirect("#/create")
        }

    // Data
        // Product Variables
        self.allProducts = ko.observableArray([])
        self.batchProducts = ko.observableArray([])
        // Data Variables
        self.authToken = authToken
        self.isDataLoaded = ko.observable(false)
        // Uses Array.from to create batches of products
        self.groupProducts = function(type = null, value = null) {
            let products = self.allProducts();

            [type, value] = [type || 'alphabetic', value || 'asc']

            if (type === 'alphabetic') {
                if (value === 'asc') {
                    products = products.sort((a, b) => a.name.localeCompare(b.name)); // Ascending order
                } else if (value === 'desc') {
                    products = products.sort((a, b) => b.name.localeCompare(a.name)); // Descending order
                }
            } else if (type === 'numeric') {
                if (value === 'asc') {
                    products = products.sort((a, b) => a.price - b.price); // Ascending order
                } else if (value === 'desc') {  
                    products = products.sort((a, b) => b.price - a.price); // Descending order
                }
            }
        
            // After sorting, we create product batches
            self.batchProducts(
                Array.from({ length: self.totalPages() }, (_, index) => {
                    return products.slice(index * self.productsPerPage, (index + 1) * self.productsPerPage);
                })
            );
        }
        self.getData = function(token) {
            
            $.ajax({
                url: "http://vps.churrasco.digital:3000/products",
                method: "GET",
                contentType: "application/json",
                headers: {'Authorization': 'Bearer ' + token},
                success: (response) => {
                    if (response) {
                        // Gets all products
                        this.allProducts(response.map(({ name, description, price, SKU, currency, pictures }) => new Product({ name, description, price, sku:SKU, currency, pictures })))
                        // Gets the total number of pages based on the products per page
                        this.totalPages(Math.ceil(this.allProducts().length / this.productsPerPage))
                        self.isNextPage(self.actualPage() < this.totalPages())
                        // Groups products into batches based on the maximum products per page
                        this.groupProducts()

                        // Get all currencies of the products
                        const allCurrencies = this.allProducts().map(product => product.currency);
                        // Remove duplicates using a Set
                        this.currencies([...new Set(allCurrencies)]);
                    } 
                },
                error: () => {
                        if(self.authToken()) {
                            self.authToken("");
                        context.redirect("/");
                        }
                },
                complete: () => {
                    this.isDataLoaded(true)
                    this.updatePaginationStyles();       
                    this.swapFilterIcon();      
                },
            });
        }

        self.getData(self.authToken())
}
