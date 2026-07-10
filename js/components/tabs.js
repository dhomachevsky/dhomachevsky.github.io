let elements = {};

function cacheElements() {

    elements = {

        buttons:

            document.querySelectorAll(
                ".tabs__button"
            ),

        portfolio:

            document.querySelector(
                ".portfolio"
            ),

        resume:

            document.querySelector(
                ".resume"
            )

    };

}

function bindEvents() {

    elements.buttons.forEach(button => {

        button.addEventListener(
            "click",
            handleTabClick
        );

    });

}

function handleTabClick(event) {

    const tab = event.currentTarget.dataset.tab;

    showTab(tab);

}

function showTab(name) {

    elements.portfolio.hidden =
        name !== "portfolio";

    elements.resume.hidden =
        name !== "resume";

    updateButtons(name);

}

function updateButtons(name) {

    elements.buttons.forEach(button => {

        const active =
            button.dataset.tab === name;

        button.classList.toggle(
            "tabs__button--active",
            active
        );

        button.setAttribute(
            "aria-selected",
            active
        );

    });

}

export function initTabs() {

    cacheElements();
    bindEvents();
    showTab("portfolio");

}