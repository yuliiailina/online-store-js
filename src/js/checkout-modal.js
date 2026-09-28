import refs from "./refs";

export function openCheckoutModal() {
        refs.checkoutModal.classList.add("modal--is-open");
    refs.body.style.overflow = "hidden";

    document.addEventListener ("keydown", onEscapePress);
    refs.checkoutModal.addEventListener ("click", onBackdropClick);
    refs.closeCheckoutModalBtn.addEventListener ("click", onCloseButtonClick);

}

export function closeCheckoutModal() {
    refs.checkoutModal.classList.remove("modal--is-open");
    refs.body.style.overflow = "";
    document.removeEventListener ("keydown", onEscapePress);
    refs.checkoutModal.removeEventListener ("click", onBackdropClick);
    refs.closeCheckoutModalBtn.removeEventListener ("click", onCloseButtonClick);
}

function onEscapePress(event) {
    if (event.code === "Escape") {
        closeCheckoutModal();
    }
}

function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
        closeCheckoutModal();
    }
}

function onCloseButtonClick() {
    closeCheckoutModal();
}