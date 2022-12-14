import axios from 'axios';

class BaseService {
  constructor() {
    this.http = axios.create({
      baseURL: 'https://deepcontrol-api.onrender.com',
    });
  }

  async get(url, data) {
    return this.http.get(url, data);
  }

  async post(url, data, config) {
    return this.http.post(url, data, config);
  }

  async put(url, data, config) {
    return this.http.put(url, data, config);
  }

  async delete(url, config) {
    return this.http.delete(url, config);
  }
}

const baseService = new BaseService();

export default baseService;
