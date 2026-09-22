import { clearSearchInput, clickWishlistBtn, filterProductsByCategory, handleLoadMore, handleSubmitSearchForm, initHomePage, showProductDitails } from "./js/handlers";
import refs from "./js/refs";

document.addEventListener('DOMContentLoaded', initHomePage);

refs.productsList.addEventListener("click", showProductDitails);

refs.categorieList.addEventListener("click", filterProductsByCategory);

refs.searchForm.addEventListener("submit", handleSubmitSearchForm);

refs.clearButton.addEventListener("click", clearSearchInput);

refs.loadMore.addEventListener("click", handleLoadMore);

refs.modalBtnWishlist.addEventListener("click", clickWishlistBtn);
