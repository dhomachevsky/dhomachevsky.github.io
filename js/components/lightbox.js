let elements = {};

export function initLightbox() {

    cacheElements();
    bindEvents();

}

function bindEvents() {

    document.addEventListener(
        "portfolio:open",
        handleOpen
    );

    elements.close.addEventListener(
        "click",
        closeLightbox
    );

    elements.backdrop.addEventListener(
        "click",
        closeLightbox
    );

    document.addEventListener(
        "keydown",
        handleKeyDown
    );

}

function handleOpen(event) {

    console.log("Lightbox opened", event.detail);

    renderLightbox(
        event.detail
    );

    openLightbox();

}

function cacheElements() {

    elements = {

        lightbox: document.querySelector(".lightbox"),

        dialog: document.querySelector(".lightbox__dialog"),

        backdrop: document.querySelector(".lightbox__backdrop"),

        close: document.querySelector(".lightbox__close"),

        image: document.querySelector(".lightbox__image"),

        title: document.querySelector(".lightbox__title"),

        category: document.querySelector(".lightbox__category"),

        description: document.querySelector(".lightbox__description")

    };

}

function renderLightbox(item) {

    console.log(item);

    elements.image.src = item.image;

    console.log(elements.image.src);

    elements.image.alt = item.title;

    elements.title.textContent = item.title;

    elements.category.textContent = item.category;

    elements.description.textContent = item.description;

}

function openLightbox() {

    if (!elements.lightbox) return;

    elements.lightbox.hidden = false;

}

function closeLightbox() {

    elements.lightbox.hidden = true;

}