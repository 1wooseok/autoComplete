export const selectedList = (targetEL, data) => {
    const element = targetEL.cloneNode(true);

    const ul = element.querySelector("ul");
    ul.innerHTML = data.map(getSelectedUI).join('');

    element.replaceWith(element);

    return element;
}

const getSelectedUI = (lang) => {
    return `<li>${lang}</li>`;
}
