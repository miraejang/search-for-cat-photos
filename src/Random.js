class Random {
  constructor($parent, { onClick }) {
    const $randomButton = document.createElement('button');
    $randomButton.className = 'randomButton';
    $randomButton.innerText = 'Random';
    $parent.appendChild($randomButton);

    this.$randomButton = $randomButton;

    $randomButton.addEventListener('click', e => {
      e.preventDefault();
      console.log('random click');
      onClick();
    });
  }

  render() {}
}
