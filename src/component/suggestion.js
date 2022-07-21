export const suggestionList = (targetEL, data, userInput, userKeyDown) => {
  const { length } = data;
  let element = targetEL.cloneNode(true);
  if (length === 0) {
    element.classList.remove("Suggestion"); // class로 식별하기 때문에 삭제하면 안됨.
  } else {
    element.classList.add("Suggestion");
  }
  let ul = element.querySelector('ul');

  ul.innerHTML = data.map(lang => getSuggestionUI(lang, userInput, userKeyDown)).join('');

  element.replaceWith(element);

  return element;
}

const getSuggestionUI = (lang, userInput, userKeyDown) => {
  if (lang.includes(userInput)) {
    const point = lang.indexOf(userInput)
    const left = lang.substring(0, point);
    const right = lang.substring(point + userInput.length);

    return `
          <li  class=${userKeyDown === lang ? "Suggestion__item--selected" : ""}>
            ${left}<span class="Suggestion__item--matched">${userInput}</span>${right}
          </li>
        `;
  }
  return null;
}