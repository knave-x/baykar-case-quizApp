import axios from "axios";

export class HttpClient {
  constructor(baseURL) {
    this.instance = axios.create({
      baseURL,
    });

    this._initializeResponseInterceptor();
  }

  _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(
      this._handleResponse,
      this._handleError
    );
  };

  _handleResponse = ({ data }) => data;

  _handleError = (error) => {
    console.error("API error:", error);
    return Promise.reject(error);
  };
}
