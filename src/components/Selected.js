export default function Selected({ target, initialState }) {
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
    if (!selected || selected.length === 0) return;
    this.element.innerHTML = `
      <ul>
        ${selected.map(lang => `<li>${lang}</li>`).join('')}
      </ul>
    `
  }

  this.render();
}
