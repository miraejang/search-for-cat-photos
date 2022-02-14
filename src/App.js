class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => {
        await api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
        });
      },
    });

    this.searchResult = new SearchResult({
      $target,
      initialData: this.data,
      onClick: async image => {
        const catDetail = await api.fetchDetail(image.id);
        this.imageInfo.setState({
          visible: true,
          detail: catDetail.data,
        });
      },
    });

    this.imageInfo = new ImageInfo({
      $target,
      data: {
        visible: false,
        image: null,
      },
    });

    this.darkMode = new DarkMode({ $target });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
