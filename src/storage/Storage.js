export default function Storage() {
  this.get = () => {
    return JSON.parse(window.localStorage.getItem("selected"));
  }

  this.set = (item) => {
    // const selected = [...this.get(), item];

    window.localStorage.setItem("selected", JSON.stringify(item));
  }

  this.init = () => {
    const current = this.get();
    if (!current || current.length === 0) {
      window.localStorage.setItem("selected", JSON.stringify([]));
    }
  }

  this.init();
}