import refs from "./refs";

export function renderCategories(categories) {
    const markup = categories.map(category => 
        `<li class="categories__item">
   <button class="categories__btn" type="button">${category}</button>
 </li>`
    ).join("");

    refs.categorieList.innerHTML = markup;
}

export function renderProducts(products) {
    const markup = products.map(({id, title, thumbnail, brand, category, price}) => `<li class="products__item" data-id="${id}">
    <img class="products__image" src="${thumbnail}" alt="${title}"/>
    <p class="products__title">${title}</p>
    <p class="products__brand"><span class="products__brand--bold">Brand: ${brand}</span></p>
    <p class="products__category">Category: ${category}</p>
    <p class="products__price">Price: $${price}</p>
 </li>
`).join("");

    refs.productsList.insertAdjacentHTML('beforeend', markup)
} 

export function showNotFound() {
    refs.notFound.classList.add('not-found--visible')
}

export function hideNotFound() {
    refs.notFound.classList.remove('not-found--visible')
}

export function showLoadMore() {
    refs.loadMore.classList.remove('is-hidden')
}

export function hideLoadMore() {
    refs.loadMore.classList.add('is-hidden')
}

export function showLoader() {
    refs.loader.forEach(container => container.classList.remove('is-hidden'))
}

export function hideLoader() {
    refs.loader.forEach(container => container.classList.add('is-hidden'))
}

export function setActiveCategory(button) {
    const activeButton = document.querySelector('.categories__btn--active');

    if (activeButton) {
        setInactiveCategory(activeButton);
    }
    button.classList.add('categories__btn--active')
}

export function setInactiveCategory(button) {
    button.classList.remove('categories__btn--active')
}

export function renderModalProduct({thumbnail, title, tags, description, shippingInformation, returnPolicy, price}) {
    const markup = `<img class="modal-product__img" src="${thumbnail}" alt="${title}" />
      <div class="modal-product__content">
        <p class="modal-product__title">${title}</p>
        <ul class="modal-product__tags">${tags.map(tag => `<li>${tag}</li>`).join("")}</ul>
        <p class="modal-product__description">${description}</p>
        <p class="modal-product__shipping-information">Shipping:${shippingInformation}</p>
        <p class="modal-product__return-policy">Return Policy:${returnPolicy}</p>
        <p class="modal-product__price">Price: $${price}</p>
      </div>
`
    refs.modalProduct.innerHTML = markup;
}

export function clearGallery() {
    refs.productsList.innerHTML = "";
}

export function clearModal() {
    refs.modalProduct.innerHTML = "";
}

export function changeTextOfWishlistBtn() {
    if (refs.modalBtnWishlist.textContent === "Add to Wishlist") {
        refs.modalBtnWishlist.textContent = "Remove from Wishlist";
    } else {
        refs.modalBtnWishlist.textContent = "Add to Wishlist"
    }
 }

 export function changeTextOfCartBtn() {
    if (refs.modalBtnAddToCart.textContent === "Add to Cart") {
        refs.modalBtnAddToCart.textContent = "Remove from Cart";
    } else {
        refs.modalBtnAddToCart.textContent = "Add to Cart"
    }
 }