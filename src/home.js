import { clearSearchInput, clickCartBtn, clickWishlistBtn, filterProductsByCategory, handleLoadMore, handleScroll, handleSubmitSearchForm, initHomePage, scrollUp, showProductDitails } from "./js/handlers";
import { initTheme, toggleTheme } from "./js/helpers";
import refs from "./js/refs";

initTheme();

document.addEventListener('DOMContentLoaded', initHomePage);

refs.productsList.addEventListener("click", showProductDitails);

refs.categorieList.addEventListener("click", filterProductsByCategory);

refs.searchForm.addEventListener("submit", handleSubmitSearchForm);

refs.clearButton.addEventListener("click", clearSearchInput);

refs.loadMore.addEventListener("click", handleLoadMore);

refs.modalBtnWishlist.addEventListener("click", clickWishlistBtn);

refs.modalBtnAddToCart.addEventListener("click", clickCartBtn);

window.addEventListener("scroll", handleScroll);

refs.scrollUpBtn.addEventListener("click", scrollUp);

refs.themeToggleBtn.addEventListener("click", toggleTheme);
