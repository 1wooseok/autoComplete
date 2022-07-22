export default function Suggested({ target, initialState, onSelect, onFocusOut }) {
  this.element = document.createElement('div');
  this.element.classList.add("Suggestion");
  target.appendChild(this.element);

  this.state = {
    selectedIndex: 0,
    items: initialState.items,
    userInput: initialState.userInput,
    suggested: initialState.suggested,
  };

  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState
    };
    this.render();
  }

  this.render = () => {
    const { items, userInput, selectedIndex } = this.state;

    if (items.length > 0) {
      this.element.style = "block";
      this.element.innerHTML = `
        <ul>
          ${items.map((item, index) => `
            <li
              class="${index === selectedIndex ? "Suggestion__item--selected" : ""}"
              data-itemIndex=${index}
            >
              ${this.listItem(item, userInput)}
            </li>`
      ).join('')}
        </ul>
      `;
    } else {
      this.element.style.display = "none";
      this.element.innerHTML = '';
    }
  }

  this.listItem = (item, userInput) => {
    if (item.includes(userInput)) {
      const index = item.indexOf(userInput);
      const head = item.substring(0, index);
      const tail = item.substring(index + userInput.length);

      return `${head}<span class="Suggestion__item--matched">${userInput}</span>${tail}`;
    }

    return `${item}`;
  }

  this.render();

  target.addEventListener("keyup", e => {
    const { items, selectedIndex } = this.state;
    const { length } = items;
    const validKey = ["ArrowUp", "ArrowDown", "Enter"];

    if (!items || length === 0) return
    if (validKey.indexOf(e.key) === -1) return

    let result = selectedIndex;
    switch (e.key) {
      case "ArrowUp":
        result = (result - 1 + length) % length;
        break;
      case "ArrowDown":
        result = (result + 1) % length;
        break;
      case "Enter":
        const enteredLanguage = items[result];
        onSelect(enteredLanguage);
        return;
      default:
        break;
    }
    this.setState({ selectedIndex: result });
  })

  target.addEventListener('click', e => {
    const { items } = this.state;
    if (!items || items.length === 0) return;

    if (e.target.className === 'App') {
      onFocusOut();
      return;
    };

    const clickedLanguage = e.target.dataset.itemindex;
    if (!clickedLanguage) return;
    onSelect(items[clickedLanguage]);
  })
}