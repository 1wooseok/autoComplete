export default function SearchInput({ target, initialState, onChange }) {
  this.element = document.createElement('form');
  this.element.classList.add("SearchInput");
  target.appendChild(this.element);

  this.state = initialState;

  this.setState = (newState) => {
    this.state = {
      ...this.tate,
      ...newState
    }
  }

  this.render = () => {
    this.element.innerHTML = (`
    <input
      type="text"
      value="${this.state}"
      class="SearchInput__input"
      placeholder="프로그램 언어를 입력하세요."
      autofocus
    >
  `);
  }

  this.render();

  this.element.addEventListener('input', e => {
    onChange(e.target.value);
  });

  this.element.addEventListener('submit', e => {
    e.preventDefault();
  })

}