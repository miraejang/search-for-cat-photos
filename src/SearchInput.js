const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch, onRandom }) {
    const searchBox = document.createElement('div');
    const $searchBox = searchBox;
    $searchBox.className = 'SearchBox';
    $target.appendChild($searchBox);

    const $searchInput = document.createElement('input');
    $searchInput.className = 'SearchInput';
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.autofocus = true;

    $searchBox.appendChild($searchInput);

    $searchInput.addEventListener('keyup', e => {
      if (e.keyCode === 13) {
        this.searchHistory.setState(e.target.value);
        onSearch(e.target.value);
      }
    });

    $searchInput.addEventListener('click', e => {
      if (e.target.value.length > 0) {
        e.target.value = '';
      }
    });

    this.random = new Random($searchBox, {
      onClick: () => onRandom(),
    });

    this.searchHistory = new SearchHistory({
      $target,
      onClick: keyword => {
        $searchInput.value = keyword;
        onSearch(keyword);
      },
    });
  }

  render() {}
}
