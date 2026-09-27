import { PORTFOLIO_OPEN_EVENT } from "../core/events.js";

const categories = [
    {
        id: "drawings",
        title: "Drawings",
        image: "images/categories/drawings.webp"
    },
    {
        id: "vector",
        title: "Vector",
        image: "images/categories/vector.webp"
    },
    {
        id: "pixel-art",
        title: "Pixel Art",
        image: "images/categories/pixel-art.webp"
    },
    {
        id: "design",
        title: "Design",
        image: "images/categories/design.webp"
    }
];

let portfolioItems = [];
let gallery;
let categoryMenu;
let categoryTitle;
let backButton;

function createCategoryCard(category) {

    const card = document.createElement("button");
    card.className = "portfolio-category";
    card.type = "button";
    card.dataset.category = category.id;
    card.setAttribute("aria-label", `Open ${category.title}`);

    const image = document.createElement("img");
    image.className = "portfolio-category__image";
    image.src = category.image;
    image.alt = "";
    image.loading = "lazy";

    const overlay = document.createElement("span");
    overlay.className = "portfolio-category__overlay";

    const title = document.createElement("span");
    title.className = "portfolio-category__title";
    title.textContent = category.title;

    overlay.append(title);
    card.append(image, overlay);

    card.addEventListener("click", () => openCategory(category));

    return card;
}

function renderCategoryMenu() {

    categoryMenu.replaceChildren();

    const fragment = document.createDocumentFragment();

    categories.forEach(category => {
        fragment.append(createCategoryCard(category));
    });

    categoryMenu.append(fragment);
}

function createOverlay(item) {

    const overlay = document.createElement("div");
    overlay.className = "portfolio-card__overlay";

    const title = document.createElement("h3");
    title.className = "portfolio-card__title";
    title.textContent = item.title;

    overlay.append(title);

    return overlay;
}

function createCard(item) {

    const card = document.createElement("article");
    card.className = "portfolio-card";

    const link = document.createElement("a");
    link.className = "portfolio-card__link";
    link.href = "#";
    link.title = item.description;
    link.dataset.id = item.id;

    link.setAttribute("aria-label", item.title);

    const image = document.createElement("img");
    image.className = "portfolio-card__image";
    image.src = item.image;
    image.alt = item.title;
    image.loading = "lazy";

    const overlay = createOverlay(item);

    link.append(image, overlay);

    link.addEventListener("click", event => {

        event.preventDefault();

        document.dispatchEvent(
            new CustomEvent(PORTFOLIO_OPEN_EVENT, {
                detail: item
            })
        );

    });

    card.append(link);

    return card;
}

function renderItems(items) {

    gallery.replaceChildren();

    const fragment = document.createDocumentFragment();

    items.forEach(item => {
        fragment.append(createCard(item));
    });

    gallery.append(fragment);
}

function openCategory(category) {

    categoryMenu.hidden = true;
    backButton.hidden = false;
    categoryTitle.hidden = false;
    categoryTitle.textContent = category.title;
    gallery.hidden = false;

    const items = portfolioItems.filter(
        item => item.type === category.id
    );

    renderItems(items);
}

function closeCategory() {

    categoryMenu.hidden = false;
    backButton.hidden = true;
    categoryTitle.hidden = true;
    gallery.hidden = true;
    gallery.replaceChildren();

}

export async function initGallery() {

    categoryMenu = document.querySelector(".portfolio__categories");
    gallery = document.querySelector(".portfolio__grid");
    categoryTitle = document.querySelector(".portfolio__title");
    backButton = document.querySelector(".portfolio__back");

    if (!categoryMenu || !gallery || !categoryTitle || !backButton) return;

    renderCategoryMenu();
    closeCategory();

    backButton.addEventListener("click", closeCategory);

    try {

        const response = await fetch("data/portfolio.json");

        if (!response.ok) {
            throw new Error("Unable to load portfolio.");
        }

        portfolioItems = await response.json();

    } catch (error) {

        console.error(error);

    }

}
