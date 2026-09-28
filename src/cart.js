import { openCheckoutModal } from "./js/checkout-modal";
import { clearCartSearchInput, clickCartBtn, clickWishlistBtn, handleCartSearch, handleCheckoutSubmit, handleContinueShopping, handleScroll, initCartPage, scrollUp, showProductDitails } from "./js/handlers";
import { initTheme, toggleTheme } from "./js/helpers";
import refs from "./js/refs";

initTheme();

document.addEventListener('DOMContentLoaded', initCartPage);

refs.searchForm.addEventListener("submit", handleCartSearch);

refs.clearButton.addEventListener("click", clearCartSearchInput);

refs.productsList.addEventListener("click", showProductDitails);

refs.modalBtnWishlist.addEventListener("click", clickWishlistBtn);

refs.modalBtnAddToCart.addEventListener("click", (event) => {
    clickCartBtn(event);
    initCartPage();
});

window.addEventListener("scroll", handleScroll);

refs.scrollUpBtn.addEventListener("click", scrollUp);

refs.buyProductsBtn.addEventListener("click", openCheckoutModal);

refs.checkoutForm.addEventListener("submit", handleCheckoutSubmit);

refs.continueShoppingBtn.addEventListener("click", handleContinueShopping);

refs.themeToggleBtn.addEventListener("click", toggleTheme);