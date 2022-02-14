class SearchResult {
  $searchResult = null;
  data = null;
  onClick = null;

  constructor({ $target, initialData, onClick }) {
    this.$searchResult = document.createElement('div');
    this.$searchResult.className = 'SearchResult';
    $target.appendChild(this.$searchResult);

    this.data = initialData;
    this.onClick = onClick;
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  render() {
    if (this.data && this.data.length) {
      this.$searchResult.classList.remove('empty');
      this.$searchResult.innerHTML = this.data
        .map(
          cat => `
        <div class="item">
          <img src=${cat.url} alt=${cat.name} />
        </div>
      `
        )
        .join('');

      this.$searchResult.querySelectorAll('.item').forEach(($item, index) => {
        $item.addEventListener('click', () => {
          this.onClick(this.data[index]);
        });
      });
    } else {
      this.$searchResult.classList.add('empty');
      this.$searchResult.innerHTML = `<p><span class="icon">━</span> 검색 결과가 없습니다.</p>`;
    }
  }
}
