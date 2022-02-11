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

  fadeIn(duration = 400) {
    this.$imageInfo.style.display = 'block';
    this.$imageInfo.animate([{ opacity: 0 }, { opacity: 1 }], {
      duration: duration,
    });
  }

  fadeOut(duration = 400) {
    setTimeout(() => (this.$imageInfo.style.display = 'none'), duration);
    this.$imageInfo.animate([{ opacity: 1 }, { opacity: 0 }], {
      duration: duration,
    });
  }

  closeModal(e) {
    if (
      e.target.className === 'ImageInfo' ||
      e.target.className === 'close' ||
      e.code === 'Escape'
    ) {
      this.fadeOut(1000);
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
      this.fadeIn(1000);
      document.addEventListener('click', e => this.closeModal(e));
      document.addEventListener('keyup', e => this.closeModal(e));
    } else {
      this.$imageInfo.style.display = 'none';
    }
  }
}
