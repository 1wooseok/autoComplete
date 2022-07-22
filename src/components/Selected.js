export default function Selected({ target, initialState, onRemove }) {
  this.element = document.createElement('div');
  this.element.classList.add("SelectedLanguage");

  target.appendChild(this.element);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { selected } = this.state;

    if (!selected || selected.length === 0) {
      this.element.innerHTML = ``;
      return
    };

    this.element.innerHTML = `
      <ul>
      ${selected
        .map((lang, index) => `
          <li data-languageIndex=${index}>
            ${lang}<span class="delete--language" data-languageIndex=${index}>×</span>
          </li>`)
        .join('')}
      </ul>
    `
  }

  this.render();

  target.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete--language')) {
      const removeIndex = e.target.dataset.languageindex;
      onRemove(removeIndex)
    }
  })
}
