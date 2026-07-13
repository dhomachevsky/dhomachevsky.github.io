import { PORTFOLIO_OPEN_EVENT } from "../core/events.js";

function createOverlay(item) {

    const overlay = document.createElement("div");
    overlay.className = "portfolio-card__overlay";

    const title = document.createElement("h3");
    title.className = "portfolio-card__title";
    title.textContent = item.title;

    const category = document.createElement("p");
    category.className = "portfolio-card__category";
    category.textContent = item.category;

    overlay.append(title, category);

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

    link.setAttribute(
        "aria-label",
        item.title
    );

    const image = document.createElement("img");
    image.className = "portfolio-card__image";
    image.src = item.image;
    image.alt = item.title;
    image.loading = "lazy";

    const overlay = createOverlay(item);

    link.append(
        image,
        overlay
    );

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

export async function initGallery() {

    try {

        const response = await fetch("data/portfolio.json");

        if (!response.ok) {
            throw new Error("Unable to load portfolio.");
        }

        const items = await response.json();

        const gallery = document.querySelector(".portfolio__grid");

        if (!gallery) return;

        const fragment = document.createDocumentFragment();

        items.forEach(item => {
            fragment.append(createCard(item));
        });

        gallery.append(fragment);

    } catch (error) {

        console.error(error);

    }

}