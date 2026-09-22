import refs from "./refs";

export function openModal() {
    refs.modal.classList.add("modal--is-open");
    refs.body.style.overflow = "hidden";

    document.addEventListener ("keydown", onEscapePress);
    refs.modal.addEventListener ("click", onBackdropClick);
    refs.closeModal.addEventListener ("click", onCloseButtonClick);

}

export function closeModal() {
    refs.modal.classList.remove("modal--is-open");
    refs.body.style.overflow = "";
    document.removeEventListener ("keydown", onEscapePress);
    refs.modal.removeEventListener ("click", onBackdropClick);
    refs.closeModal.removeEventListener ("click", onCloseButtonClick);
}

function onEscapePress(event) {
    if (event.code === "Escape") {
        closeModal();
    }
}

function onBackdropClick(event) {
    if (event.target === event.currentTarget) {
        closeModal();
    }
}

function onCloseButtonClick() {
    closeModal();
}