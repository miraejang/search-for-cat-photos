class ImageInfo {
  $imageInfo = null;
  data = null;

  constructor({ $target, data }) {
    const $imageInfo = document.createElement('div');
    $imageInfo.className = 'ImageInfo';
    this.$imageInfo = $imageInfo;
    $target.appendChild($imageInfo);

    this.data = data;

    this.render();
  }

  setState(nextData) {
    this.data = nextData;
    this.render();
  }

  closeModal(e) {
    if (
      e.target.className === 'ImageInfo' ||
      e.target.className === 'close' ||
      e.code === 'Escape'
    ) {
      this.$imageInfo.style.display = 'none';
    }
  }

  setImageInfoModal(data) {
    const { name, url, temperament, origin } = data.detail;

    this.$imageInfo.innerHTML = `
      <div class="content-wrapper">
        <div class="title">
          <span>${name}</span>
          <button class="close">x</button>
        </div>
        <img src="${url}" alt="${name}"/>        
        <div class="description">
          <p>성격: ${temperament}</p>
          <p>태생: ${origin}</p>
        </div>
      </div>`;
  }

  render() {
    if (this.data.visible) {
      this.setImageInfoModal(this.data);
      this.$imageInfo.style.display = 'block';
      document.addEventListener('click', e => this.closeModal(e));
      document.addEventListener('keyup', e => this.closeModal(e));
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}
