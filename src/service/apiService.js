import { getBaseUrl } from "../utils";
import { HttpClient } from "./httpClientInterceptor";

class Service extends HttpClient {
  constructor() {
    super(getBaseUrl());
    if (!Service.instance) {
      Service.instance = this;
    }
    return Service.instance;
  }

  getQuestions = () => this.instance.get("posts");
}

const instance = new Service();
Object.freeze(instance);

export default instance;
