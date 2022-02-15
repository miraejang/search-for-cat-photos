class Loading {
  constructor({ $target }) {
    this.loading = false;
    const $loading = document.createElement('div');
    $loading.className = 'loading';
    $target.appendChild($loading);

    this.$loading = $loading;

    this.render();
  }

  setState(loading) {
    this.loading = loading;
    this.render();
  }

  render() {
    if (this.loading) {
      this.$loading.style.display = 'flex';
      this.$loading.innerHTML = `<span class="loadingIcon"></span>`;
    } else {
      this.$loading.style.display = 'none';
    }
  }
}
