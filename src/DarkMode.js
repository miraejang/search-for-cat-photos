class DarkMode {
  $darkModeBox = null;

  constructor({ $target }) {
    const $darkModeBox = document.createElement('div');
    $darkModeBox.className = 'darkModeBox';
    this.$darkModeBox = $darkModeBox;
    this.isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    $target.prepend(this.$darkModeBox);
    this.render();

    this.setThemeMode(this.isDark);
  }

  setThemeMode(isDark) {
    if (isDark) {
      document.documentElement.setAttribute('color-theme', 'dark');
    } else {
      document.documentElement.setAttribute('color-theme', 'light');
    }
  }

  render() {
    const body = document.querySelector('body');
    this.$darkModeBox.innerHTML = `<input type="checkbox" name="darkMode" id="darkMode" value="dark" ${
      this.isDark && 'checked'
    }>
    <label for="darkMode">Dark Mode</label>`;
    const $checkbox = this.$darkModeBox.querySelector('input');
    $checkbox.addEventListener('change', e => {
      this.setThemeMode(e.target.checked);
    });
  }
}
