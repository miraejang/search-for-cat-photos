const API_ENDPOINT =
  'https://oivhcpn8r9.execute-api.ap-northeast-2.amazonaws.com/dev';

const api = {
  fetchCats: async keyword => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);
    return await res.json();
  },

  fetchDetail: async id => {
    const res = await fetch(`${API_ENDPOINT}/api/cats/${id}`);
    return await res.json();
  },
};
