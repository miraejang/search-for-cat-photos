class App {
  $target = null;
  data = [];

  constructor($target) {
    this.$target = $target;

    this.searchInput = new SearchInput({
      $target,
      onSearch: async keyword => {
        this.loading.setState(true);
        await api.fetchCats(keyword).then(({ data }) => {
          this.setState(data);
        });
        this.loading.setState(false);
      },
      onRandom: async () => {
        this.loading.setState(true);
        await api.fetchRandom().then(({ data }) => {
          this.setState(data);
        });
        this.loading.setState(false);
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

    this.loading = new Loading({ $target });
  }

  setState(nextData) {
    this.data = nextData;
    this.searchResult.setState(nextData);
  }
}
