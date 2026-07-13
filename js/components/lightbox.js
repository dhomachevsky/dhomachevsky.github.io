import { PORTFOLIO_OPEN_EVENT } from "../core/events.js";

let elements = {};

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

function bindEvents() {

    document.addEventListener(
        PORTFOLIO_OPEN_EVENT,
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

function handleKeyDown(event) {

    if (
        event.key !== "Escape" ||
        elements.lightbox.hidden
    ) {
        return;
    }

    closeLightbox();

}

function handleOpen(event) {

    openLightbox();

    renderLightbox(event.detail);

    toggleScrollLock(true);

}

function renderLightbox(item) {

    elements.image.src = item.image;

    elements.image.alt = item.title;

    elements.title.textContent = item.title;

    elements.category.textContent = item.category;

    elements.description.textContent = item.description;

}

function openLightbox() {

    if (!elements.lightbox) return;

    elements.lightbox.hidden = false;

    requestAnimationFrame(() => {

        requestAnimationFrame(() => {

            elements.lightbox.classList.add("lightbox--open");

        });

    });

}

function closeLightbox() {

    if (!elements.lightbox) return;

    toggleScrollLock(false);

    elements.lightbox.classList.remove("lightbox--open");

    elements.lightbox.addEventListener(

        "transitionend",
        handleTransitionEnd,
        { once: true }

    );

}

function handleTransitionEnd(event) {

    if (event.target !== elements.lightbox) return;

    if (event.propertyName !== "opacity") return;

    elements.lightbox.hidden = true;

    clearLightbox();

}

function toggleScrollLock(isLocked) {

    document.body.classList.toggle(
        "no-scroll",
        isLocked
    );

}

function clearLightbox() {

    elements.image.removeAttribute("src");

    elements.image.alt = "";

    elements.title.textContent = "";

    elements.category.textContent = "";

    elements.description.textContent = "";

}

export function initLightbox() {

    cacheElements();
    bindEvents();

}