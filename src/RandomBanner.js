const template = `<div class="view"><ul class="banners"></ul></div><div class="controls"><button class="prevBtn"><i class="icon"></i><span class="text">prev</span></button><button class="nextBtn"><i class="icon"></i><span class="text">next</span></button></div>`;

class RandomBanner {
  constructor({ $target }) {
    const bannerBox = document.createElement('div');
    bannerBox.className = 'RandomBanner';
    $target.appendChild(bannerBox);
    this.$bannerBox = bannerBox;

    this.data = [];
    this.current = 0;
    this.showCount = 5;
    this.slideSpeed = 500;
    this.isPlaying = false;

    this.setRandom();
  }

  setState(data) {
    this.data = data;
    this.render();
  }

  async setRandom() {
    await api.fetchRandom().then(({ data }) => {
      const last = data.length - 1;
      const randomData = [
        ...data.slice(-this.showCount),
        ...data,
        ...data.slice(0, this.showCount),
      ];
      this.setState(randomData);
    });
  }

  slider(current) {
    let n = current;
    const $ul = this.$bannerBox.querySelector('.banners');
    const $li = this.$bannerBox.querySelector('li');
    const width = $li.offsetWidth;
    const start = 0 - this.showCount + 1; // -4
    const end = this.data.length - this.showCount * 2; // 50

    this.isPlaying = true;
    $ul.style = `transition: transform ${this.slideSpeed}ms;
    transform: translateX(${width * -(n + this.showCount)}px)`;
    setTimeout(() => (this.isPlaying = false), this.slideSpeed);
    if (n > end - 1) {
      this.isPlaying = true;
      setTimeout(() => {
        $ul.style = `transform: translateX(${width * -this.showCount}px)`;
        this.current = 0;
        this.isPlaying = false;
      }, this.slideSpeed);
    } else if (n < start) {
      this.isPlaying = true;
      setTimeout(() => {
        $ul.style = `transform: translateX(${width * -end}px)`;
        this.current = end - this.showCount;
        this.isPlaying = false;
      }, this.slideSpeed);
    }
  }

  render() {
    this.$bannerBox.innerHTML = template;
    const $banners = this.$bannerBox.querySelector('.banners');
    const list = this.data
      .map(
        cat =>
          `<li><div class="img"><img src=${cat.url} alt=${cat.name}></div></li>`
      )
      .join('');
    $banners.innerHTML = list;
    this.slider(0);

    const $prevBtn = this.$bannerBox.querySelector('.prevBtn');
    const $nextBtn = this.$bannerBox.querySelector('.nextBtn');
    $prevBtn.addEventListener('click', () => {
      if (this.isPlaying === true) {
        return false;
      }
      this.slider(--this.current);
    });
    $nextBtn.addEventListener('click', () => {
      if (this.isPlaying === true) {
        return false;
      }
      this.slider(++this.current);
    });
  }
}
