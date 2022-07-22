import { fetchLanguages } from "./api/api.js";
import SearchInput from "./components/SearchInput.js";
import Selected from "./components/Selected.js";
import Suggested from "./components/Suggested.js";
import Storage from "./storage/Storage.js";

export default function App(target) {
  const storage = new Storage();

  this.state = {
    userInput: '',
    selected: storage.get(),
    suggested: [],
  }

  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState
    };

    storage.set(this.state.selected)

    suggestion.setState({
      selectedIndex: 0,
      items: this.state.suggested,
      userInput: this.state.userInput,
      suggested: this.state.suggested,
    });

    selected.setState({ selected: this.state.selected });
  }


  const selected = new Selected({
    target,
    initialState: this.state.selected,
    onRemove: (removeIndex) => {
      const { selected } = this.state;
      removeIndex = Number(removeIndex);
      this.setState({
        selected: [
          ...selected.slice(0, removeIndex),
          ...selected.slice(removeIndex + 1)
        ]
      });
    }
  });

  const searchInput = new SearchInput({
    target,
    initialState: '',
    onChange: async (keyword) => {
      if (!keyword || keyword.length === 0) {
        this.setState({ userInput: '', suggested: [] });
        return;
      }

      const languages = await fetchLanguages(keyword);
      this.setState({ userInput: keyword, suggested: languages });
    }
  });

  const suggestion = new Suggested({
    target,
    initialState: {
      cursor: 0,
      selected: this.state.selected,
      items: []
    },
    onSelect: (enteredLanguage) => {
      const { selected } = this.state;

      if (selected.indexOf(enteredLanguage) > -1) return;

      const MAX_COUNT = 5;

      const newSelected = selected.length === MAX_COUNT
        ? [...selected.slice(1), enteredLanguage]
        : [...selected, enteredLanguage];

      alert(enteredLanguage)

      this.setState({ selected: newSelected, })
    },
    onFocusOut: () => this.setState({ suggested: [] })
  });

  window.onload = this.setState()
}