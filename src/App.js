import { fetchLanguages } from "./api/api.js";
import SearchInput from "./components/SearchInput.js";
import Selected from "./components/Selected.js";
import Suggested from "./components/Suggested.js";

export default function App(target) {
  this.state = {
    userInput: '',
    selected: [],
    suggested: [],
  }

  this.setState = (newState) => {
    this.state = {
      ...this.state,
      ...newState
    }
    suggestion.setState({
      selectedIndex: 0,
      items: this.state.suggested,
      userInput: this.state.userInput,
      suggested: this.state.suggested,
    })
    selected.setState({
      selected: this.state.selected,
    })
  }

  const selected = new Selected({
    target,
    initialState: this.state.selected
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

      this.setState({
        selected: newSelected,
        suggested: []
      })
    }
  });
}