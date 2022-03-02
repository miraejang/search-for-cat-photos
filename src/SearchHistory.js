class SearchHistory {
  data = [];

  constructor({ $target, onClick }) {
    const $searchHistory = document.createElement('ul');
    this.$searchHistory = $searchHistory;
    $searchHistory.className = 'SearcHistory';
    $target.appendChild($searchHistory);

    this.history = this.data;
    this.max = 5;
    this.onClick = onClick;

    this.getHistory();
  }

  setState(data) {
    this.history.push(data);
    if (this.history && this.history.length > this.max) {
      this.history = this.history.slice(-this.max);
    }
    localStorage.setItem('history', JSON.stringify(this.history));
    this.render();
  }

  getHistory() {
    this.history = JSON.parse(localStorage.getItem('history'));
    this.render();
  }

  render() {
    if (this.history) {
      const history = [...this.history];
      this.$searchHistory.innerHTML = history
        .reverse()
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
