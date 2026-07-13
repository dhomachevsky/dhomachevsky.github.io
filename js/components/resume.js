let elements = {};

export async function initResume() {

    cacheElements();

    await loadResume();

}

function cacheElements() {

    elements = {

        contact: document.querySelector(".resume-contact"),

        education: document.querySelector(".resume-education"),

        skills: document.querySelector(".resume-skills"),

        software: document.querySelector(".resume-software"),

        summary: document.querySelector(".resume-summary"),

        experience: document.querySelector(".resume-experience")

    };

}

function renderList(container, items) {

    if (!container) return;

    if (!Array.isArray(items)) return;

    const fragment = document.createDocumentFragment();

    items.forEach(text => {

        const item = document.createElement("li");

        item.className = "resume-list__item";

        item.textContent = text;

        fragment.append(item);

    });

    container.append(fragment);

}

async function loadResume() {

    try {

        const response = await fetch("data/resume.json");

        if (!response.ok) {
            throw new Error("Unable to load resume.");
        }

        const data = await response.json();

        renderResume(data);

    } catch (error) {

        console.error(error);

    }

}

function renderResume(data) {

    renderContact(data.contact);

    renderEducation(data.education);

    renderSkills(data.skills);

    renderSoftware(data.software);

    renderSummary(data.summary);

    renderExperience(data.experience);

}

function createIcon(name) {

    const icon = document.createElement("i");

    icon.className = `ph-fill ph-${name} resume-contact__icon`;

    return icon;

}

function createContactItem(href, text, iconName) {

    const item = document.createElement("li");
    item.className =
        "resume-list__item resume-list__item--inline";

    const link = document.createElement("a");

    link.href = href;
    link.textContent = text;

    item.append(
        createIcon(iconName),
        link
    );

    return item;
}



function createEducationItem(education) {

    const item = document.createElement("li");

    item.className = "resume-list__item resume-list__item--stack";

    const degree = document.createElement("strong");
    degree.className = "resume-degree";
    degree.textContent = education.degree;

    const school = document.createElement("span");
    school.className = "resume-school";
    school.textContent = education.school;

    const period = document.createElement("span");
    period.className = "resume-period";
    period.textContent = education.period;

    item.append(
        degree,
        school,
        period
    );

    return item;

}

function renderEducation(education) {

    if (!elements.education) return;

    elements.education.append(

        createEducationItem(education)

    );

}

function createTextItem(text) {

    const item = document.createElement("li");
    item.className =
        "resume-list__item resume-list__item--inline";

    const content = document.createElement("span");
    content.textContent = text;

    item.append(
        createIcon("map-pin"),
        content
    );

    return item;

}

function renderContact(contact) {

    if (!elements.contact) return;

    elements.contact.append(

        createContactItem(
            "mailto:" + contact.email,
            contact.email,
            "envelope"
        ),

        createContactItem(
            contact.telegram,
            contact.telegram,
            "telegram-logo"
        ),

        createTextItem(
            contact.location
        )

    );

}

function renderSkills(skills) {

    renderList(elements.skills, skills);

}

function renderSoftware(software) {

    renderList(elements.software, software);

}

function renderSummary(summary) {

    if (!elements.summary) return;

    const paragraph = document.createElement("p");

    paragraph.className = "resume-text";

    paragraph.textContent = summary;

    elements.summary.append(paragraph);

}

function createExperienceItem(experience) {

    const article = document.createElement("article");
    article.className = "experience";

    const header = document.createElement("header");
    header.className = "experience__header";

    const title = document.createElement("h3");
    title.className = "experience__title";
    title.textContent = experience.position;

    const period = document.createElement("span");
    period.className = "experience__period";
    period.textContent = experience.period;

    header.append(
        title,
        period,
    );

    const company = document.createElement("p");
    company.className = "experience__company";
    company.textContent = experience.company;

    const responsibilities =
        createResponsibilityList(
            experience.responsibilities
        );

    article.append(
        header,
        company,
        responsibilities
    );

    return article;

}

function createResponsibilityList(items = []) {

    const list = document.createElement("ul");
    list.className = "experience__list";

    items.forEach(text => {

        const item = document.createElement("li");

        item.className = "experience__item";

        item.textContent = text;

        list.append(item);

    });

    return list;

}

function renderExperience(experience) {

    if (!elements.experience) return;

    if (!Array.isArray(experience)) return;

    const fragment = document.createDocumentFragment();

    experience.forEach(job => {

        fragment.append(

            createExperienceItem(job)

        );

    });

    elements.experience.append(fragment);

}