import axios from "axios";

import { ACCESS_KEY, API_URL } from "./../credentials";

export default class ImageService {
  fetchImages(page) {
    return axios.get(
      `${API_URL}/photos/?page=${page}&per_page=20&client_id=${ACCESS_KEY}`
    );
  }

  searchImages(query, page = 1) {
    return axios.get(
      `${API_URL}/search/photos/?query=${query}&page=${page}&per_page=20`,
      {
        headers: { Authorization: `Client-ID ${ACCESS_KEY}` },
      }
    );
  }
}
