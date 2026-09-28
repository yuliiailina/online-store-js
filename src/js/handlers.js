import iziToast from "izitoast";
import 'izitoast/dist/css/iziToast.min.css'; 
import { getCategories, getProductByCategory, getProductById, getProductByQuery, getProducts, getProductsByIds } from "./products-api";
import { changeTextOfCartBtn, changeTextOfWishlistBtn, clearGallery, clearModal, hideLoadMore, hideModalLoader, hideProductListLoader, hideScrollUpBtn, renderCategories, renderModalProduct, renderProducts, setActiveCategory, showLoadMore, showModalLoader, showNotFound, showProductListLoader, showScrollUpBtn, updateCartCount, updateWishlistCount } from "./render-function";
import { checkLoadMore } from "./helpers";
import { openModal } from "./modal";
import refs from "./refs";
import { checkLocalStorage, getFromStorage, removeFromStorage, saveToStorage } from "./storage";
import { STORAGE_KEYS } from "./constants";
import { closeCheckoutModal } from "./checkout-modal";

let currentPage = 1;
let currentCategory = "";
let currentQuery = "";
let id = null;

export async function initHomePage() {
    updateWishlistCount ();
    updateCartCount();

    try {
        showProductListLoader();
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
        hideProductListLoader();
    }
}

export async function showProductDitails(event) {
    if (event.target.nodeName === "UL") return;
    const productItem = event.target.closest(".products__item");
    if (!productItem) return;
    id = productItem.dataset.id;
    clearModal();
    
    openModal();
    showModalLoader();

    try {
        const product = await getProductById(id);
        changeTextOfWishlistBtn(STORAGE_KEYS.WISHLIST, id);
        changeTextOfCartBtn(STORAGE_KEYS.CART, id);
        if (product) {
            renderModalProduct(product);
        }
    } catch(error) {
        console.log(error)
        iziToast.error('Something went wrong. Please try again.')
    } finally {
        hideModalLoader();
    }
}

export async function filterProductsByCategory(event) {
    if (!event.target.classList.contains('categories__btn')) return;
    const category = event.target.innerText;
    setActiveCategory(event.target);

    try {
        if (category === 'ALL') {
            currentCategory = "";
            currentQuery = "";
            currentPage = 1;
            const {products, total, skip, limit} = await getProducts(currentPage);
            clearGallery();
            renderProducts(products);
            checkLoadMore(total, skip, limit)? showLoadMore() : hideLoadMore();
            return;
        }
        currentCategory = category;
        currentQuery = "";
        currentPage = 1;
        clearGallery();
        hideLoadMore();
        showProductListLoader();
        
        const {products, total, skip, limit} = await getProductByCategory(currentCategory, currentPage);
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
        hideProductListLoader();
    }
}

export async function handleSubmitSearchForm(event) {
    event.preventDefault();
    const query = event.currentTarget.elements.searchValue.value.trim();    

    try {
        if (query === "") {
            return iziToast.error('Enter your search query...');
        };
        currentQuery = query;
        currentCategory = "";
        currentPage = 1;
        clearGallery();
        hideLoadMore();
        showProductListLoader();

        const {products, total, skip, limit} = await getProductByQuery(currentQuery, currentPage);
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
        hideProductListLoader();
    }
}

export async function clearSearchInput(event) {
    event.currentTarget.form.elements.searchValue.value = "";

    try {
        showProductListLoader();
        hideLoadMore();
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
        hideProductListLoader();
    }
}

export async function handleLoadMore() {
    currentPage++;
    hideLoadMore();
    showProductListLoader();

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
        hideProductListLoader();
    }
}

export function clickWishlistBtn() {
    if (!id) return;
    if (checkLocalStorage(STORAGE_KEYS.WISHLIST, id)) {
        removeFromStorage(STORAGE_KEYS.WISHLIST, id);
    } else {
        saveToStorage(STORAGE_KEYS.WISHLIST, id);
    }
    updateWishlistCount();
    changeTextOfWishlistBtn(STORAGE_KEYS.WISHLIST, id);
}

export function clickCartBtn() {
    if (!id) return;
    if (checkLocalStorage(STORAGE_KEYS.CART, id)) {
        removeFromStorage(STORAGE_KEYS.CART, id);
    } else {
        saveToStorage(STORAGE_KEYS.CART, id);
    }
    updateCartCount();
    changeTextOfCartBtn(STORAGE_KEYS.CART, id);
}

let wishlistProducts = [];

export async function initWishlistPage() {
    updateWishlistCount();
    updateCartCount();

    const data = getFromStorage(STORAGE_KEYS.WISHLIST);
    clearGallery();

    if (data.length > 0) {
        showProductListLoader();
        try {
            wishlistProducts = await getProductsByIds(data);
            if (wishlistProducts.length > 0) {
                renderProducts(wishlistProducts);
            } else {
                showNotFound();
            }
            
        } catch (error) {
            console.log(error);
            iziToast.error('Something went wrong. Please try again.');
        } finally {
            hideProductListLoader();
        }
    } else {
        showNotFound();
    }
}

let cartProducts = [];

export async function initCartPage() {
    updateWishlistCount();
    updateCartCount();

    const data = getFromStorage(STORAGE_KEYS.CART);
    clearGallery();
    refs.cartItems.textContent = data.length;

    if (data.length > 0) {
        showProductListLoader();
        try {
            cartProducts = await getProductsByIds(data);
            if (cartProducts.length > 0) {
                renderProducts(cartProducts);
                const totalPrice = cartProducts.reduce((acc, product) => acc + product.price, 0);
                refs.checkoutPrice.textContent = `$ ${totalPrice.toFixed(2)}`;
                const shippingPrice = totalPrice > 50 ? 0 : 10;
                refs.checkoutShipping.textContent = shippingPrice === 0 ? "Free" : `$ ${shippingPrice}`;
                const finalPrice = totalPrice + shippingPrice;
                refs.checkoutTotal.textContent = `$ ${finalPrice.toFixed(2)}`;

                refs.totalPrice.textContent = `$ ${totalPrice.toFixed(2)}`
                refs.shippingPrice.textContent = shippingPrice === 0 ? "Free" : `$ ${shippingPrice}`;
            } else {
                showNotFound();
            }
            
        } catch (error) {
            console.log(error);
            iziToast.error('Something went wrong. Please try again.');
        } finally {
            hideProductListLoader();
        }
    } else {
        refs.totalPrice.textContent = '$ 0.00';
        refs.shippingPrice.textContent = 'Free';
        refs.checkoutPrice.textContent = '$ 0.00';
        refs.checkoutShipping.textContent = 'Free';
        refs.checkoutTotal.textContent = '$ 0.00';
        
        showNotFound();
    }
}

export function handleWishlistSearch(event) {
    event.preventDefault();
    const query = event.currentTarget.elements.searchValue.value.toLowerCase().trim();    

    try {
        if (query === "") {
            return iziToast.error('Enter your search query...');
        };
        
        const filteredProducts = wishlistProducts.filter(product => product.title.toLowerCase().includes(query));
        clearGallery();

        if (filteredProducts.length > 0) {
            renderProducts(filteredProducts);
        } else {
            showNotFound();
        }
    } catch(error) {
        console.log(error)
        iziToast.error('Something went wrong. Please try again.')
    }
}

export function clearWishlistSearchInput(event) {
    event.currentTarget.form.elements.searchValue.value = "";

        clearGallery();
        if (wishlistProducts.length > 0) {
            renderProducts(wishlistProducts);
        } else {
            showNotFound();
        } 
}

export function handleCartSearch(event) {
    event.preventDefault();
    const query = event.currentTarget.elements.searchValue.value.toLowerCase().trim();    

    try {
        if (query === "") {
            return iziToast.error('Enter your search query...');
        };
        
        const filteredProducts = cartProducts.filter(product => product.title.toLowerCase().includes(query));
        clearGallery();

        if (filteredProducts.length > 0) {
            renderProducts(filteredProducts);
        } else {
            showNotFound();
        }
    } catch(error) {
        console.log(error)
        iziToast.error('Something went wrong. Please try again.')
    }
}

export function clearCartSearchInput(event) {
    event.currentTarget.form.elements.searchValue.value = "";

        clearGallery();
        if (cartProducts.length > 0) {
            renderProducts(cartProducts);
        } else {
            showNotFound();
        } 
}

export function handleScroll() {
    if (window.scrollY > 300) {
        showScrollUpBtn();
    } else {
        hideScrollUpBtn();
    }
}

export function scrollUp() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    })
}

export function handleCheckoutSubmit(event) {
    event.preventDefault();

    const orderNumber = Math.floor(100000 + Math.random() * 900000);

    refs.orderNumber.textContent = `#${orderNumber}`;

    refs.checkoutSummary.classList.add('is-hidden');
    refs.checkoutForm.classList.add('is-hidden');
    refs.checkoutSuccess.classList.remove('is-hidden');
}

export async function handleContinueShopping() {
    localStorage.removeItem(STORAGE_KEYS.CART);

    refs.checkoutForm.reset();
    refs.checkoutForm.classList.remove('is-hidden');
    refs.checkoutSuccess.classList.add('is-hidden');

    closeCheckoutModal();

    await initCartPage();
}