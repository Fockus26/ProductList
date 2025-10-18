import { Product } from "./product/product.js";

export function ProductsViewModel({ authToken, context, products }) {
  const self = this;

  // Banner Variables
  self.banner = {
    src: "/assets/banner.webp",
    alt: "churrasco banner",
  };

  // When the URL does not return an image
  self.errorImg = function (_, event) {
    event.target.src = "/assets/card-placeholder.webp";
  };

  // Pagination Variables
  self.productsPerPage = 15;
  self.totalPages = ko.observable();
  self.actualPage = ko.observable(1);
  self.nextPage = ko.observable(self.actualPage() + 1);
  self.isNextPage = ko.observable(self);
  self.prevPage = ko.observable(self.actualPage() - 1);
  self.isPrevPage = ko.observable(self.actualPage() > 1);
  self.scrollTimeout = null;

  // Adds styles based on pagination
  self.updatePaginationStyles = function () {
    const $activePageLink = $(".page-item.active > .page-link");

    if (!self.isPrevPage()) {
      $activePageLink?.removeClass("rounded-0");
      $activePageLink?.addClass("rounded-start-2");
    } else {
      $activePageLink?.addClass("rounded-0");
      $activePageLink?.removeClass("rounded-start-2");
    }

    if (!self.isNextPage()) {
      $activePageLink?.removeClass("rounded-0");
      $activePageLink?.addClass("rounded-end-2");
    } else {
      $activePageLink?.addClass("rounded-0");
      $activePageLink?.removeClass("rounded-end-2");
    }
  };

  // Handles pagination
  self.handlePagination = function (direction) {
    if (direction === "next") {
      self.actualPage(self.actualPage() + 1);
    } else if (direction === "prev") {
      self.actualPage(self.actualPage() - 1);
    } else {
      self.actualPage(
        self.actualPage() === direction
          ? self.actualPage()
          : self.actualPage() < direction
          ? self.actualPage() + 1
          : self.actualPage() - 1
      );
    }

    self.prevPage(self.actualPage() - 1);
    self.isPrevPage(self.actualPage() > 1);
    self.nextPage(self.actualPage() + 1);
    self.isNextPage(self.actualPage() < self.totalPages() - 1);

    self.updatePaginationStyles();

    if (self.scrollTimeout) clearTimeout(self.scrollTimeout);

    self.scrollTimeout = setTimeout(() => {
      $(".container")[0].scrollIntoView({ behavior: "smooth", block: "start" });
    }, 500);
  };

  // Sort
  self.showOptions = ko.observable(false);
  self.options = ko.observableArray([
    { type: "alphabetic", title: "By Name", value: null },
    { type: "numeric", title: "By Price", value: null },
  ]);
  self.actualOption = ko.observable(self.options()[0].title);
  self.currencies = ko.observableArray([]);
  self.showCurrencies = ko.observable(false);

  self.swapFilterIcon = function () {
    const $filterIcon = $(".sort button i");
    if (!self.showOptions()) {
      $filterIcon?.removeClass("bi-filter");
      $filterIcon?.addClass("bi-filter-left");
    } else {
      $filterIcon?.addClass("bi-filter");
      $filterIcon?.removeClass("bi-filter-left");
    }
  };

  self.swapSortIcon = function (title, value) {
    let option = self.options().filter((option) => option.title === title)[0];
    const $sortIcon = $(`.sort .options .option i[aria-label=${option.type}]`);
    let direction = value === "asc" ? "up" : "down";
    let latestDirection = value === "asc" ? "down" : "up";
    $sortIcon?.removeClass(`bi-sort-${latestDirection}`);
    $sortIcon?.addClass(`bi-sort-${direction}`);
  };

  self.handleShowOptions = function () {
    self.showOptions(!self.showOptions());
    self.swapFilterIcon();
  };

  self.selectOption = function (title) {
    let option = self.options().filter((option) => option.title === title)[0];
    option.value = option.value || "desc";
    option.value === "asc" ? (option.value = "desc") : (option.value = "asc");

    self.groupProducts(option.type, option.value);
    self.actualOption(title);
    self.styleSelectedOption();
    self.swapSortIcon(title, option.value);
    self.initCarousels(); // Re-initialize carousels after sorting
  };

  self.styleSelectedOption = function () {
    $(".sort .options .option.selected").removeClass("selected");
    const $selectedOption = $(".sort .options .option").filter(function () {
      return $(this).text() === self.actualOption();
    });
    $selectedOption?.addClass("selected");
  };

  self.appContext = context;
  self.goToCreate = function (_, event) {
    event.preventDefault();
    return self.appContext.redirect("#/create");
  };

  // Data
  self.allProducts = products;
  self.batchProducts = ko.observableArray([]);
  self.authToken = authToken;
  self.isDataLoaded = ko.observable(false);

  self.groupProducts = function (type = null, value = null) {
    let products = self.allProducts();
    [type, value] = [type || "alphabetic", value || "asc"];

    if (type === "alphabetic") {
      products.sort((a, b) =>
        value === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name)
      );
    } else if (type === "numeric") {
      products.sort((a, b) =>
        value === "asc" ? a.price - b.price : b.price - a.price
      );
    }

    self.batchProducts(
      Array.from({ length: self.totalPages() }, (_, index) =>
        products.slice(
          index * self.productsPerPage,
          (index + 1) * self.productsPerPage
        )
      )
    );

    self.initCarousels(); // Re-initialize carousels after paging
  };

  // Initialize Bootstrap carousels for dynamically added HTML
  self.initCarousels = function () {
    const carousels = document.querySelectorAll(".carousel");
    carousels.forEach((carouselEl) => {
      if (!carouselEl.classList.contains("carousel-initialized")) {
        new bootstrap.Carousel(carouselEl, { interval: false, wrap: true });
        carouselEl.classList.add("carousel-initialized");
      }
    });
  };

  // Fetch Products
  self.getData = function (token) {
    if (self.allProducts().length) {
      self.totalPages(
        Math.ceil(self.allProducts().length / self.productsPerPage)
      );
      self.isNextPage(self.actualPage() < self.totalPages());
      self.groupProducts();
      const allCurrencies = self
        .allProducts()
        .map((product) => product.currency);
      self.currencies([...new Set(allCurrencies)]);
      self.isDataLoaded(true);
      self.updatePaginationStyles();
      self.swapFilterIcon();
      self.initCarousels();
      return;
    }

    const BASE_URL = import.meta.env.VITE_SERVER_URL;
    const endpoint = "/products";
    const url = BASE_URL + endpoint;

    $.ajax({
      url: url,
      method: "GET",
      contentType: "application/json",
      headers: { Authorization: "Bearer " + token },
      success: (response) => {
        if (response) {
          self.allProducts(
            response.map(
              ({ name, description, price, SKU, currency, pictures }) =>
                new Product({
                  name,
                  description,
                  price,
                  sku: SKU,
                  currency,
                  pictures,
                })
            )
          );
          self.totalPages(
            Math.ceil(self.allProducts().length / self.productsPerPage)
          );
          self.isNextPage(self.actualPage() < self.totalPages());
          self.groupProducts();
          const allCurrencies = self
            .allProducts()
            .map((product) => product.currency);
          self.currencies([...new Set(allCurrencies)]);
        }
      },
      error: () => {
        if (self.authToken()) {
          self.authToken("");
          context.redirect("/");
        }
      },
      complete: () => {
        self.isDataLoaded(true);
        self.updatePaginationStyles();
        self.swapFilterIcon();
        self.initCarousels();
      },
    });
  };

  self.getData(self.authToken());
}
