import iziToast from "izitoast";
import { getCategories, getProductByCategory, getProductById, getProductByQuery, getProducts } from "./products-api";
import { changeTextOfWishlistBtn, clearGallery, clearModal, hideLoader, hideLoadMore, renderCategories, renderModalProduct, renderProducts, setActiveCategory, showLoader, showLoadMore, showNotFound } from "./render-function";
import { checkLoadMore } from "./helpers";
import { openModal } from "./modal";
import refs from "./refs";
import { checkLocalStorage, removeFromStorage, saveToStorage } from "./storage";
import { STORAGE_KEYS } from "./constants";

let currentPage = 1;
let currentCategory = "";
let currentQuery = "";
let id = null;

export async function initHomePage() {
    try {
        showLoader();
        hideLoadMore();
        const result = await getCategories();
        const categories = ['all', ...result];
        renderCategories(categories);
        const {products, total, skip, limit} = await getProducts(currentPage);
        if (products.length > 0) {
            renderProducts(products);
            checkLoadMore(total, skip, limit)? showLoadMore() : hideLoadMore();
        } else {
            showNotFound();
        } 
    } catch(error) {
        console.log(error)
        iziToast.error('Something went wrong. Please try again.')
    } finally {
        hideLoader();
    }
}

export async function showProductDitails(event) {
    if (event.target.nodeName === "UL") return;
    const productItem = event.target.closest(".products__item");
    if (!productItem) return;
    id = productItem.dataset.id;
    clearModal();
    if (checkLocalStorage(STORAGE_KEYS.WISHLIST, id)) {
        changeTextOfWishlistBtn();
    }
    openModal();
    showLoader();

    try {
        const product = await getProductById(id);
        if (product) {
            renderModalProduct(product);
        }
    } catch(error) {
        console.log(error)
        iziToast.error('Something went wrong. Please try again.')
    } finally {
        hideLoader();
    }
}

export async function filterProductsByCategory(event) {
    if (!event.target.classList.contains('categories__btn')) return;
    const category = event.target.innerText;
    setActiveCategory(event.target);
    showLoader();

    try {
        if (category === 'ALL') {
            currentCategory = "";
            currentQuery = "";
            currentPage = 1;
            const {products, total, skip, limit} = await getProducts(currentPage);
            clearGallery();
            // refs.productsList.innerHTML = "";
            renderProducts(products);
            checkLoadMore(total, skip, limit)? showLoadMore() : hideLoadMore();
            return;
        }
        currentCategory = category;
        currentQuery = "";
        currentPage = 1;
        const {products, total, skip, limit} = await getProductByCategory(currentCategory, currentPage);
        // refs.productsList.innerHTML = "";
        clearGallery();
        if (products.length > 0) {
            renderProducts(products);
            checkLoadMore(total, skip, limit)? showLoadMore() : hideLoadMore();
        } else {
            showNotFound();
            hideLoadMore();
        }
    } catch(error) {
        console.log(error)
        iziToast.error('Something went wrong. Please try again.')
    } finally {
        hideLoader();
    }
}

export async function handleSubmitSearchForm(event) {
    event.preventDefault();
    const query = event.currentTarget.elements.searchValue.value.trim();    
    showLoader();

    try {
        if (query === "") {
            return iziToast.error('Enter your search query...');
        };
        currentQuery = query;
        currentCategory = "";
        currentPage = 1;
        const {products, total, skip, limit} = await getProductByQuery(currentQuery, currentPage);
        // refs.productsList.innerHTML = "";
        clearGallery();
        if (products.length > 0) {
            renderProducts(products);
            checkLoadMore(total, skip, limit)? showLoadMore() : hideLoadMore();
        } else {
            showNotFound();
            hideLoadMore();
        }
    } catch(error) {
        console.log(error)
        iziToast.error('Something went wrong. Please try again.')
    } finally {
        hideLoader();
    }
}

export async function clearSearchInput(event) {
    event.currentTarget.form.elements.searchValue.value = "";

    try {
        showLoader();
        hideLoadMore();
        // refs.productsList.innerHTML = "";
        clearGallery();
        const {products, total, skip, limit} = await getProducts(currentPage);
        if (products.length > 0) {
            renderProducts(products);
            checkLoadMore(total, skip, limit)? showLoadMore() : hideLoadMore();
        } else {
            showNotFound();
        }  
    } catch(error) {
        console.log(error)
        iziToast.error('Something went wrong. Please try again.')
    } finally {
        hideLoader();
    }
}

export async function handleLoadMore() {
    currentPage++;
    hideLoadMore();
    showLoader();

    try {
        if (currentQuery !== "") {
        const { products, total, skip, limit } = await getProductByQuery(currentQuery, currentPage);
        renderProducts(products);
        checkLoadMore(total, skip, limit)? showLoadMore() : hideLoadMore();
    } else if (currentCategory !== "") {
        const { products, total, skip, limit } = await getProductByCategory(currentCategory, currentPage);
        renderProducts(products);
        checkLoadMore(total, skip, limit)? showLoadMore() : hideLoadMore();
    } else {
        const { products, total, skip, limit } = await getProducts(currentPage);
        renderProducts(products);
        checkLoadMore(total, skip, limit)? showLoadMore() : hideLoadMore();
    }
    } catch(error) {
        console.log(error)
        iziToast.error('Something went wrong. Please try again.')
    } finally {
        hideLoader();
    }
}

export function clickWishlistBtn() {
    if (!id) return;
    if (checkLocalStorage(STORAGE_KEYS.WISHLIST, id)) {
        removeFromStorage(STORAGE_KEYS.WISHLIST, id);
    } else {
        saveToStorage(STORAGE_KEYS.WISHLIST, id);
    }
    changeTextOfWishlistBtn();
}