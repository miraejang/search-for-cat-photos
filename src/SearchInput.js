const TEMPLATE = '<input type="text">';

class SearchInput {
  constructor({ $target, onSearch }) {
    const $searchInput = document.createElement('input');
    this.$searchInput = $searchInput;
    this.$searchInput.placeholder = '고양이를 검색해보세요.|';
    this.$searchInput.autofocus = true;

    $searchInput.className = 'SearchInput';
    $target.appendChild($searchInput);

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
