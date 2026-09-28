import { clearWishlistSearchInput, clickCartBtn, clickWishlistBtn, handleScroll, handleWishlistSearch, initWishlistPage, scrollUp, showProductDitails } from "./js/handlers";
import { initTheme, toggleTheme } from "./js/helpers";
import refs from "./js/refs";

initTheme();

document.addEventListener('DOMContentLoaded', initWishlistPage);

refs.searchForm.addEventListener("submit", handleWishlistSearch);

refs.clearButton.addEventListener("click", clearWishlistSearchInput);

refs.productsList.addEventListener("click", showProductDitails);

refs.modalBtnWishlist.addEventListener("click", (event) => {
    clickWishlistBtn(event);
    initWishlistPage();
});

refs.modalBtnAddToCart.addEventListener("click", clickCartBtn);

window.addEventListener("scroll", handleScroll);

refs.scrollUpBtn.addEventListener("click", scrollUp);

refs.themeToggleBtn.addEventListener("click", toggleTheme);