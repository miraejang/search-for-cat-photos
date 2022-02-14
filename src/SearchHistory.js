class SearchHistory {
  data = [];

  constructor({ $target, onClick }) {
    const $searchHistory = document.createElement('ul');
    this.$searchHistory = $searchHistory;
    $searchHistory.className = 'SearcHistory';
    $target.appendChild($searchHistory);

    this.history = this.data;
    this.onClick = onClick;
  }

  searchHistory() {
    const history = this.history;
    if (history && history.length > 5) {
      history = history.slice(-5);
      return history;
    }
  }

  setState(data) {
    this.history.push(data);
    this.render();
  }

  render() {
    if (this.history) {
      const history = this.history;
      const lastHistory = history.slice(-5).reverse();
      this.$searchHistory.innerHTML = lastHistory
        .map(keyword => `<li class="keyword">${keyword}</li>`)
        .join('');

      this.$searchHistory.querySelectorAll('.keyword').forEach($keyword => {
        $keyword.addEventListener('click', e => {
          this.onClick(e.target.innerText);
        });
      });
    }
  }
}
