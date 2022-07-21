import { selectedList } from "./component/selected.js";
import { suggestionList } from "./component/suggestion.js";
import { queryLang } from "./api/api.js";

let state = {
    userKeyDown: '',
    userInput: '',
    suggested: [],
    selected: []
}

const render = () => {
    const { suggested, selected, userInput, userKeyDown } = state;
    const App = document.querySelector(".App");

    const $Selected = App.querySelector(".SelectedLanguage");
    const $Suggestion = App.querySelector(".Suggestion__wrapper");

    $Selected.replaceWith(selectedList($Selected, selected));
    $Suggestion.replaceWith(suggestionList($Suggestion, suggested, userInput, userKeyDown));
}

const setState = (newState) => {
    state = { ...state, ...newState };
    render();
}

const $SearchInput__input = document.querySelector(".SearchInput__input");

$SearchInput__input.addEventListener('input', async e => {
    const userInput = e.target.value;

    if (!userInput || userInput.length === 0) {
        if (state.userInput.length === 0) return;
        setState({ userKeyDown: '', userInput: '', suggested: [] });
        return
    };
    try {
        const data = await queryLang(userInput);
        setState({
            userInput,
            suggested: data,
        });
    } catch (err) {
        throw new Error(err);
    }
})

let clickCnt = 0;
$SearchInput__input.addEventListener('keydown', e => {
    const { suggested, selected } = state;
    const { length } = suggested;

    if (length === 0) return;

    if (e.key === 'ArrowUp' || e.key === 'ArrowDown' || e.key === 'Enter' || e.key === 'Escape') {
        e.preventDefault();
        if (e.key === 'ArrowUp') {
            clickCnt = (clickCnt - 1 + length) % length;
        } else if (e.key === 'ArrowDown') {
            clickCnt = (clickCnt + 1) % length;
        } else if (e.key === 'Enter') {
            const selectedLang = suggested[clickCnt];
            const newSelected = [...selected];

            if (selected.indexOf(selectedLang) > -1) {
                return;
            }
            if (selected.length === 5) {
                newSelected.shift();
            }
            newSelected.push(selectedLang);
            setState({ selected: newSelected });
            return;
        } else if (e.key === 'Escape') {
            e.target.value = '';
            e.target.blur();
            setState({ userKeyDown: '', userInput: '', suggested: [] });
            return;
        }
        setState({ userKeyDown: suggested[clickCnt] });
    }
})

const $SearchForm = document.querySelector(".SearchInput");
$SearchForm.addEventListener('submit', e => {
    e.preventDefault();
})

window.onload = $SearchInput__input.focus();